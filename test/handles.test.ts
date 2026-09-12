import { describe, expect, it } from "vitest";
import {
  getAllHandles,
  getHandleInfo,
  getUpiProvider,
  isKnownUpiHandle,
  NPCI_HANDLES_LIST,
  NPCI_HANDLES_MAP,
  TOTAL_KNOWN_HANDLES,
} from "../src/handles";

describe("NPCI Handles Database & Recognition", () => {
  it("contains more than 130 registered handles (requirement check)", () => {
    expect(TOTAL_KNOWN_HANDLES).toBeGreaterThanOrEqual(130);
    expect(NPCI_HANDLES_LIST.length).toBeGreaterThanOrEqual(130);
  });

  it("ensures all handles in NPCI_HANDLES_LIST are unique", () => {
    const handleSet = new Set<string>();
    for (const item of NPCI_HANDLES_LIST) {
      expect(handleSet.has(item.handle)).toBe(false);
      handleSet.add(item.handle);
    }
    expect(handleSet.size).toBe(NPCI_HANDLES_LIST.length);
  });

  it("ensures all handles are lowercase and without leading @", () => {
    for (const item of NPCI_HANDLES_LIST) {
      expect(item.handle).toBe(item.handle.toLowerCase());
      expect(item.handle.startsWith("@")).toBe(false);
      expect(item.provider.length).toBeGreaterThan(0);
      expect(item.category).toBeDefined();
    }
  });

  it("isKnownUpiHandle works with and without @ symbol", () => {
    expect(isKnownUpiHandle("okhdfcbank")).toBe(true);
    expect(isKnownUpiHandle("@okhdfcbank")).toBe(true);
    expect(isKnownUpiHandle("@OKAXIS")).toBe(true);
    expect(isKnownUpiHandle("ybl")).toBe(true);
    expect(isKnownUpiHandle("@paytm")).toBe(true);
    expect(isKnownUpiHandle("@upi")).toBe(true);
    expect(isKnownUpiHandle("apl")).toBe(true);
    expect(isKnownUpiHandle("nonexistentbank")).toBe(false);
  });

  it("getHandleInfo returns correct handle metadata", () => {
    const gpay = getHandleInfo("@okaxis");
    expect(gpay).toBeDefined();
    expect(gpay?.provider).toBe("Google Pay");
    expect(gpay?.bank).toBe("Axis Bank");
    expect(gpay?.category).toBe("app");

    const phonepe = getHandleInfo("ybl");
    expect(phonepe?.provider).toBe("PhonePe");
    expect(phonepe?.bank).toBe("YES Bank");

    const bhim = getHandleInfo("upi");
    expect(bhim?.provider).toBe("BHIM UPI");

    const cred = getHandleInfo("cbaxis");
    expect(cred?.provider).toBe("CRED");
  });

  it("getUpiProvider returns provider name from handle or full VPA", () => {
    expect(getUpiProvider("user@okhdfcbank")).toBe("Google Pay");
    expect(getUpiProvider("okhdfcbank")).toBe("Google Pay");
    expect(getUpiProvider("9876543210@paytm")).toBe("Paytm");
    expect(getUpiProvider("shop@ybl")).toBe("PhonePe");
    expect(getUpiProvider("seller@apl")).toBe("Amazon Pay");
    expect(getUpiProvider("unknown@fakebankxyz")).toBeUndefined();
  });

  it("getAllHandles returns the full list of handles", () => {
    const handles = getAllHandles();
    expect(handles.length).toBe(NPCI_HANDLES_LIST.length);
    expect(handles.length).toBe(TOTAL_KNOWN_HANDLES);
  });

  it("handles empty or invalid inputs gracefully", () => {
    expect(isKnownUpiHandle("")).toBe(false);
    // @ts-expect-error test invalid input
    expect(isKnownUpiHandle(null)).toBe(false);
    // @ts-expect-error test invalid input
    expect(getHandleInfo(undefined)).toBeUndefined();
    // @ts-expect-error test invalid input
    expect(getUpiProvider(123)).toBeUndefined();
  });
});
