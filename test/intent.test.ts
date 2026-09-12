import { describe, expect, it } from "vitest";
import {
  buildUpiIntentUri,
  isValidUpiIntentUri,
  parseUpiIntentUri,
} from "../src/intent";

describe("UPI Intent URI Builder & Parser", () => {
  describe("buildUpiIntentUri", () => {
    it("builds a basic intent URI with required fields", () => {
      const uri = buildUpiIntentUri({
        pa: "merchant@okhdfcbank",
        pn: "Store Name",
      });

      expect(uri).toContain("upi://pay?");
      expect(uri).toContain("pa=merchant%40okhdfcbank");
      expect(uri).toContain("pn=Store%20Name");
      expect(uri).toContain("cu=INR");
    });

    it("formats numerical amount to 2 decimal places", () => {
      const uri = buildUpiIntentUri({
        pa: "user@okaxis",
        pn: "Rahul",
        am: 150,
      });

      expect(uri).toContain("am=150.00");
    });

    it("formats string amount to 2 decimal places", () => {
      const uri = buildUpiIntentUri({
        pa: "user@okaxis",
        pn: "Rahul",
        am: "99.9",
      });

      expect(uri).toContain("am=99.90");
    });

    it("properly encodes all optional parameters", () => {
      const uri = buildUpiIntentUri({
        pa: "store@paytm",
        pn: "Super Mart",
        mc: "5411",
        tr: "REF998822",
        tid: "TID001",
        am: 1250.75,
        mam: 100.0,
        cu: "INR",
        tn: "Grocery & essentials #42",
        url: "https://store.example.com/order/42",
        mode: "01",
        orgid: "180001",
        sign: "MEYCIQ...",
      });

      expect(uri).toContain("pa=store%40paytm");
      expect(uri).toContain("pn=Super%20Mart");
      expect(uri).toContain("mc=5411");
      expect(uri).toContain("tr=REF998822");
      expect(uri).toContain("tid=TID001");
      expect(uri).toContain("am=1250.75");
      expect(uri).toContain("mam=100.00");
      expect(uri).toContain("cu=INR");
      expect(uri).toContain("tn=Grocery%20%26%20essentials%20%2342");
      expect(uri).toContain("url=https%3A%2F%2Fstore.example.com%2Forder%2F42");
      expect(uri).toContain("mode=01");
      expect(uri).toContain("orgid=180001");
      expect(uri).toContain("sign=MEYCIQ...");
    });

    it("throws error when 'pa' is missing or invalid", () => {
      expect(() => {
        // @ts-expect-error test missing pa
        buildUpiIntentUri({ pn: "Store" });
      }).toThrow("Payee address ('pa') is required");

      expect(() => {
        buildUpiIntentUri({ pa: "invalid@@vpa", pn: "Store" });
      }).toThrow("Invalid payee address ('pa')");
    });

    it("throws error when 'pn' is missing or empty", () => {
      expect(() => {
        // @ts-expect-error test missing pn
        buildUpiIntentUri({ pa: "user@okhdfcbank" });
      }).toThrow("Payee name ('pn') is required");

      expect(() => {
        buildUpiIntentUri({ pa: "user@okhdfcbank", pn: "   " });
      }).toThrow("Payee name ('pn') is required and cannot be empty");
    });

    it("throws error when amount is <= 0 or invalid", () => {
      expect(() => {
        buildUpiIntentUri({ pa: "user@okaxis", pn: "Store", am: 0 });
      }).toThrow("amount must be greater than 0");

      expect(() => {
        buildUpiIntentUri({ pa: "user@okaxis", pn: "Store", am: -50 });
      }).toThrow("amount must be greater than 0");

      expect(() => {
        buildUpiIntentUri({ pa: "user@okaxis", pn: "Store", am: "not-a-number" });
      }).toThrow("must be a valid finite number");
    });
  });

  describe("parseUpiIntentUri", () => {
    it("parses valid upi://pay URI into typed object", () => {
      const uri = "upi://pay?pa=merchant%40okaxis&pn=Store%20Owner&am=250.50&cu=INR&tn=Invoice%20123";
      const result = parseUpiIntentUri(uri);

      expect(result.pa).toBe("merchant@okaxis");
      expect(result.pn).toBe("Store Owner");
      expect(result.am).toBe(250.5);
      expect(result.amString).toBe("250.50");
      expect(result.cu).toBe("INR");
      expect(result.tn).toBe("Invoice 123");
      expect(result.validationResult.isValid).toBe(true);
      expect(result.validationResult.provider).toBe("Google Pay");
    });

    it("parses custom vendor parameters into otherParams", () => {
      const uri = "upi://pay?pa=user@ybl&pn=PhonePeUser&am=10&cu=INR&custom_track=abc987&mid=XYZ";
      const result = parseUpiIntentUri(uri);

      expect(result.pa).toBe("user@ybl");
      expect(result.otherParams["custom_track"]).toBe("abc987");
      expect(result.otherParams["mid"]).toBe("XYZ");
    });

    it("throws error if not a upi://pay URI", () => {
      expect(() => parseUpiIntentUri("https://example.com/pay")).toThrow(
        "Invalid URI scheme"
      );
      expect(() => parseUpiIntentUri("upi://collect?pa=test@okaxis")).toThrow(
        "Invalid URI scheme"
      );
    });

    it("throws error if URI has no query parameters", () => {
      expect(() => parseUpiIntentUri("upi://pay")).toThrow(
        "must contain query parameters"
      );
    });

    it("throws error if mandatory parameter 'pa' or 'pn' is missing", () => {
      expect(() => parseUpiIntentUri("upi://pay?pn=Store")).toThrow(
        "Mandatory parameter 'pa'"
      );
      expect(() => parseUpiIntentUri("upi://pay?pa=user@okaxis")).toThrow(
        "Mandatory parameter 'pn'"
      );
    });
  });

  describe("Roundtrip Builder and Parser", () => {
    it("preserves all data in build -> parse roundtrip", () => {
      const options = {
        pa: "vijay@okhdfcbank",
        pn: "Vijay Misal",
        am: 999.0,
        tn: "Subscription Renewal",
        tr: "SUB-88231",
        cu: "INR",
      };

      const uri = buildUpiIntentUri(options);
      const parsed = parseUpiIntentUri(uri);

      expect(parsed.pa).toBe(options.pa);
      expect(parsed.pn).toBe(options.pn);
      expect(parsed.am).toBe(options.am);
      expect(parsed.amString).toBe("999.00");
      expect(parsed.tn).toBe(options.tn);
      expect(parsed.tr).toBe(options.tr);
      expect(parsed.cu).toBe("INR");
      expect(parsed.validationResult.isValid).toBe(true);
      expect(parsed.validationResult.provider).toBe("Google Pay");
    });
  });

  describe("isValidUpiIntentUri helper", () => {
    it("returns true for valid UPI intent URI", () => {
      const uri = buildUpiIntentUri({ pa: "payee@apl", pn: "Amazon Payee" });
      expect(isValidUpiIntentUri(uri)).toBe(true);
    });

    it("returns false for invalid URI", () => {
      expect(isValidUpiIntentUri("not-a-uri")).toBe(false);
      expect(isValidUpiIntentUri("upi://pay?pa=invalid@@vpa&pn=Test")).toBe(false);
    });
  });
});
