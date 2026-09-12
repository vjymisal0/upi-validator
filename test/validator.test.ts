import { describe, expect, it } from "vitest";
import {
  getUpiHandle,
  isValidUpiId,
  normalizeUpiId,
  validateUpiId,
} from "../src/validator";

describe("validateUpiId", () => {
  describe("Valid UPI IDs", () => {
    it("validates standard Google Pay VPA", () => {
      const res = validateUpiId("rahul.sharma@okaxis");
      expect(res.isValid).toBe(true);
      expect(res.username).toBe("rahul.sharma");
      expect(res.handle).toBe("okaxis");
      expect(res.provider).toBe("Google Pay");
      expect(res.isKnownHandle).toBe(true);
      expect(res.error).toBeUndefined();
    });

    it("validates PhonePe VPA with phone number", () => {
      const res = validateUpiId("9876543210@ybl");
      expect(res.isValid).toBe(true);
      expect(res.username).toBe("9876543210");
      expect(res.handle).toBe("ybl");
      expect(res.provider).toBe("PhonePe");
      expect(res.isKnownHandle).toBe(true);
    });

    it("validates Paytm VPA", () => {
      const res = validateUpiId("store.merchant@paytm");
      expect(res.isValid).toBe(true);
      expect(res.handle).toBe("paytm");
      expect(res.provider).toBe("Paytm");
      expect(res.isKnownHandle).toBe(true);
    });

    it("validates BHIM NPCI VPA", () => {
      const res = validateUpiId("citizen@upi");
      expect(res.isValid).toBe(true);
      expect(res.handle).toBe("upi");
      expect(res.provider).toBe("BHIM UPI");
      expect(res.isKnownHandle).toBe(true);
    });

    it("validates Bank VPA (e.g. HDFC)", () => {
      const res = validateUpiId("user@hdfcbank");
      expect(res.isValid).toBe(true);
      expect(res.handle).toBe("hdfcbank");
      expect(res.provider).toBe("HDFC Bank");
      expect(res.isKnownHandle).toBe(true);
    });

    it("handles uppercase input and normalizes to lowercase", () => {
      const res = validateUpiId("VIJAY.MISAL@OKHDFCBANK");
      expect(res.isValid).toBe(true);
      expect(res.vpa).toBe("vijay.misal@okhdfcbank");
      expect(res.username).toBe("vijay.misal");
      expect(res.handle).toBe("okhdfcbank");
      expect(res.provider).toBe("Google Pay");
    });

    it("trims surrounding whitespace correctly", () => {
      const res = validateUpiId("   user@axl   ");
      expect(res.isValid).toBe(true);
      expect(res.vpa).toBe("user@axl");
      expect(res.handle).toBe("axl");
      expect(res.provider).toBe("PhonePe");
    });

    it("supports alphanumeric with dots, hyphens, and underscores in username", () => {
      const res = validateUpiId("john_doe-123.test@icici");
      expect(res.isValid).toBe(true);
      expect(res.username).toBe("john_doe-123.test");
      expect(res.handle).toBe("icici");
      expect(res.provider).toBe("ICICI Bank");
    });

    it("recognizes valid structure with an unknown handle", () => {
      const res = validateUpiId("alice@customnewbank");
      expect(res.isValid).toBe(true);
      expect(res.username).toBe("alice");
      expect(res.handle).toBe("customnewbank");
      expect(res.isKnownHandle).toBe(false);
      expect(res.provider).toBeUndefined();
    });
  });

  describe("Invalid UPI IDs", () => {
    it("rejects non-string inputs", () => {
      // @ts-expect-error test non-string
      const res = validateUpiId(null);
      expect(res.isValid).toBe(false);
      expect(res.error).toContain("must be a string");

      // @ts-expect-error test number
      const res2 = validateUpiId(12345);
      expect(res2.isValid).toBe(false);
      expect(res2.error).toContain("must be a string");
    });

    it("rejects empty string", () => {
      const res = validateUpiId("");
      expect(res.isValid).toBe(false);
      expect(res.error).toBe("UPI ID cannot be empty");
    });

    it("rejects string with only whitespace", () => {
      const res = validateUpiId("    ");
      expect(res.isValid).toBe(false);
      expect(res.error).toBe("UPI ID cannot be empty");
    });

    it("rejects string without @ symbol", () => {
      const res = validateUpiId("invalidvpa");
      expect(res.isValid).toBe(false);
      expect(res.error).toContain("must contain an '@' separator");
    });

    it("rejects multiple @ symbols", () => {
      const res = validateUpiId("user@bank@extra");
      expect(res.isValid).toBe(false);
      expect(res.error).toContain("cannot contain multiple '@'");
    });

    it("rejects username starting with dot or hyphen or underscore", () => {
      expect(validateUpiId(".user@okhdfcbank").isValid).toBe(false);
      expect(validateUpiId("-user@okhdfcbank").isValid).toBe(false);
      expect(validateUpiId("_user@okhdfcbank").isValid).toBe(false);
    });

    it("rejects username ending with dot or hyphen or underscore", () => {
      expect(validateUpiId("user.@okhdfcbank").isValid).toBe(false);
      expect(validateUpiId("user-@okhdfcbank").isValid).toBe(false);
      expect(validateUpiId("user_@okhdfcbank").isValid).toBe(false);
    });

    it("rejects username with consecutive special characters", () => {
      expect(validateUpiId("user..name@okaxis").isValid).toBe(false);
      expect(validateUpiId("user--name@okaxis").isValid).toBe(false);
      expect(validateUpiId("user__name@okaxis").isValid).toBe(false);
      expect(validateUpiId("user.-name@okaxis").isValid).toBe(false);
    });

    it("rejects username with illegal characters", () => {
      expect(validateUpiId("user#name@okhdfcbank").isValid).toBe(false);
      expect(validateUpiId("user$name@okhdfcbank").isValid).toBe(false);
      expect(validateUpiId("user!@okhdfcbank").isValid).toBe(false);
      expect(validateUpiId("user name@okhdfcbank").isValid).toBe(false);
    });

    it("rejects purely numeric handles", () => {
      const res = validateUpiId("user@12345");
      expect(res.isValid).toBe(false);
      expect(res.error).toContain("cannot be purely numeric");
    });

    it("rejects handle starting or ending with dot", () => {
      expect(validateUpiId("user@.bank").isValid).toBe(false);
      expect(validateUpiId("user@bank.").isValid).toBe(false);
    });

    it("rejects handles with length < 2", () => {
      expect(validateUpiId("user@a").isValid).toBe(false);
    });
  });

  describe("Helper functions", () => {
    it("isValidUpiId returns boolean", () => {
      expect(isValidUpiId("user@okhdfcbank")).toBe(true);
      expect(isValidUpiId("invalid@@vpa")).toBe(false);
    });

    it("getUpiHandle extracts handle", () => {
      expect(getUpiHandle("test@ybl")).toBe("ybl");
      expect(getUpiHandle("invalid")).toBeNull();
    });

    it("normalizeUpiId returns normalized lowercase string", () => {
      expect(normalizeUpiId("USER@OKAXIS")).toBe("user@okaxis");
      expect(() => normalizeUpiId("invalid")).toThrow("Cannot normalize invalid UPI ID");
    });
  });
});
