import { UpiIntentData, UpiIntentOptions } from "./types";
import { validateUpiId } from "./validator";

const UPI_SCHEME_PREFIX = "upi://pay";

/**
 * Formats and validates a numerical amount into a standardized 2-decimal string.
 *
 * @param amount - Number or string representation of the amount
 * @param paramName - Name of the parameter for descriptive error messages
 * @returns Formatted amount string (e.g. "150.00")
 */
function formatAmount(amount: number | string, paramName = "am"): string {
  const num = typeof amount === "string" ? parseFloat(amount.trim()) : amount;

  if (typeof num !== "number" || isNaN(num) || !isFinite(num)) {
    throw new Error(`Invalid '${paramName}': amount must be a valid finite number`);
  }

  if (num <= 0) {
    throw new Error(`Invalid '${paramName}': amount must be greater than 0`);
  }

  return num.toFixed(2);
}

/**
 * Builds an official NPCI `upi://pay` deep link intent URI.
 *
 * @param options - Configuration options for the UPI intent
 * @returns Standardized `upi://pay?...` deep link URI
 *
 * @throws {Error} if `pa` is an invalid UPI ID, `pn` is missing, or amount is invalid
 *
 * @example
 * ```ts
 * const uri = buildUpiIntentUri({
 *   pa: "merchant@okaxis",
 *   pn: "Acme Store",
 *   am: 499.50,
 *   tn: "Order #9823",
 *   tr: "TXN12345678"
 * });
 * // uri === "upi://pay?pa=merchant%40okaxis&pn=Acme%20Store&am=499.50&cu=INR&tn=Order%20%239823&tr=TXN12345678"
 * ```
 */
export function buildUpiIntentUri(options: UpiIntentOptions): string {
  if (!options || typeof options !== "object") {
    throw new Error("Options object must be provided to build UPI Intent URI");
  }

  const {
    pa,
    pn,
    mc,
    tr,
    tid,
    tn,
    am,
    cu = "INR",
    url,
    mam,
    mode,
    orgid,
    sign,
  } = options;

  // Validate payee address (pa)
  if (!pa || typeof pa !== "string") {
    throw new Error("Payee address ('pa') is required and must be a string");
  }

  const vpaValidation = validateUpiId(pa);
  if (!vpaValidation.isValid) {
    throw new Error(`Invalid payee address ('pa'): ${vpaValidation.error}`);
  }

  // Validate payee name (pn)
  if (!pn || typeof pn !== "string" || pn.trim().length === 0) {
    throw new Error("Payee name ('pn') is required and cannot be empty");
  }

  const queryParams: [string, string][] = [];

  // 1. pa (Payee VPA)
  queryParams.push(["pa", vpaValidation.vpa]);

  // 2. pn (Payee Name)
  queryParams.push(["pn", pn.trim()]);

  // 3. mc (Merchant Code)
  if (mc !== undefined && mc !== null) {
    const trimmedMc = String(mc).trim();
    if (trimmedMc.length > 0) {
      queryParams.push(["mc", trimmedMc]);
    }
  }

  // 4. tr (Transaction Ref ID)
  if (tr !== undefined && tr !== null) {
    const trimmedTr = String(tr).trim();
    if (trimmedTr.length > 0) {
      queryParams.push(["tr", trimmedTr]);
    }
  }

  // 5. tid (Transaction ID)
  if (tid !== undefined && tid !== null) {
    const trimmedTid = String(tid).trim();
    if (trimmedTid.length > 0) {
      queryParams.push(["tid", trimmedTid]);
    }
  }

  // 6. am (Amount)
  if (am !== undefined && am !== null && am !== "") {
    const formattedAm = formatAmount(am, "am");
    queryParams.push(["am", formattedAm]);
  }

  // 7. mam (Minimum Amount)
  if (mam !== undefined && mam !== null && mam !== "") {
    const formattedMam = formatAmount(mam, "mam");
    queryParams.push(["mam", formattedMam]);
  }

  // 8. cu (Currency)
  const currency = (cu || "INR").trim().toUpperCase();
  queryParams.push(["cu", currency]);

  // 9. tn (Transaction Note)
  if (tn !== undefined && tn !== null) {
    const trimmedTn = String(tn).trim();
    if (trimmedTn.length > 0) {
      queryParams.push(["tn", trimmedTn]);
    }
  }

  // 10. url (Reference URL)
  if (url !== undefined && url !== null) {
    const trimmedUrl = String(url).trim();
    if (trimmedUrl.length > 0) {
      queryParams.push(["url", trimmedUrl]);
    }
  }

  // 11. mode (Transaction Mode)
  if (mode !== undefined && mode !== null) {
    const trimmedMode = String(mode).trim();
    if (trimmedMode.length > 0) {
      queryParams.push(["mode", trimmedMode]);
    }
  }

  // 12. orgid (NPCI Org ID)
  if (orgid !== undefined && orgid !== null) {
    const trimmedOrgid = String(orgid).trim();
    if (trimmedOrgid.length > 0) {
      queryParams.push(["orgid", trimmedOrgid]);
    }
  }

  // 13. sign (Digital Signature)
  if (sign !== undefined && sign !== null) {
    const trimmedSign = String(sign).trim();
    if (trimmedSign.length > 0) {
      queryParams.push(["sign", trimmedSign]);
    }
  }

  // Build query string using strict encodeURIComponent
  const queryString = queryParams
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join("&");

  return `${UPI_SCHEME_PREFIX}?${queryString}`;
}

/**
 * Parses and validates an official `upi://pay` URI, extracting parameters and validating the payee VPA.
 *
 * @param uri - The `upi://pay?...` deep link string
 * @returns Structured `UpiIntentData`
 *
 * @throws {Error} if URI is not a valid `upi://pay` deep link or missing mandatory parameters
 *
 * @example
 * ```ts
 * const data = parseUpiIntentUri("upi://pay?pa=merchant@okaxis&pn=Store&am=150.00&cu=INR");
 * console.log(data.pa); // "merchant@okaxis"
 * console.log(data.am); // 150
 * console.log(data.validationResult.isValid); // true
 * ```
 */
export function parseUpiIntentUri(uri: string): UpiIntentData {
  if (typeof uri !== "string" || uri.trim().length === 0) {
    throw new Error("UPI Intent URI must be a non-empty string");
  }

  const trimmed = uri.trim();

  // Validate scheme prefix
  const qIndex = trimmed.indexOf("?");
  const schemePart = qIndex === -1 ? trimmed : trimmed.substring(0, qIndex);

  if (!schemePart.toLowerCase().startsWith("upi://pay")) {
    throw new Error(`Invalid URI scheme: Expected 'upi://pay...', got '${schemePart}'`);
  }

  if (qIndex === -1 || qIndex === trimmed.length - 1) {
    throw new Error("UPI Intent URI must contain query parameters");
  }

  const queryString = trimmed.substring(qIndex + 1);
  const paramPairs = queryString.split("&");
  const params: Record<string, string> = {};

  for (const pair of paramPairs) {
    if (!pair) continue;
    const eqIndex = pair.indexOf("=");
    if (eqIndex === -1) {
      const key = decodeURIComponent(pair);
      params[key] = "";
    } else {
      const key = decodeURIComponent(pair.substring(0, eqIndex));
      const value = decodeURIComponent(pair.substring(eqIndex + 1));
      params[key] = value;
    }
  }

  const pa = params["pa"] || "";
  const pn = params["pn"] || "";

  if (!pa) {
    throw new Error("Mandatory parameter 'pa' (payee address) is missing from UPI URI");
  }

  if (!pn) {
    throw new Error("Mandatory parameter 'pn' (payee name) is missing from UPI URI");
  }

  const validationResult = validateUpiId(pa);

  // Parse amount
  let am: number | undefined;
  let amString: string | undefined;
  if (params["am"] !== undefined && params["am"] !== "") {
    const parsed = parseFloat(params["am"]);
    if (!isNaN(parsed) && isFinite(parsed)) {
      am = parsed;
      amString = params["am"];
    }
  }

  // Parse minimum amount
  let mam: number | undefined;
  let mamString: string | undefined;
  if (params["mam"] !== undefined && params["mam"] !== "") {
    const parsed = parseFloat(params["mam"]);
    if (!isNaN(parsed) && isFinite(parsed)) {
      mam = parsed;
      mamString = params["mam"];
    }
  }

  // Collect other parameters not in standard fields
  const standardFields = new Set([
    "pa",
    "pn",
    "mc",
    "tr",
    "tid",
    "am",
    "mam",
    "cu",
    "tn",
    "url",
    "mode",
    "orgid",
    "sign",
  ]);

  const otherParams: Record<string, string> = {};
  for (const [k, v] of Object.entries(params)) {
    if (!standardFields.has(k)) {
      otherParams[k] = v;
    }
  }

  return {
    rawUri: trimmed,
    pa,
    pn,
    mc: params["mc"],
    tr: params["tr"],
    tid: params["tid"],
    tn: params["tn"],
    am,
    amString,
    cu: params["cu"] || "INR",
    url: params["url"],
    mam,
    mamString,
    mode: params["mode"],
    orgid: params["orgid"],
    sign: params["sign"],
    otherParams,
    validationResult,
  };
}

/**
 * Checks if a string is a valid NPCI UPI intent URI.
 *
 * @param uri - The URI string to inspect
 * @returns `true` if valid `upi://pay` URI with valid parameters, `false` otherwise
 */
export function isValidUpiIntentUri(uri: string): boolean {
  try {
    const result = parseUpiIntentUri(uri);
    return result.validationResult.isValid;
  } catch {
    return false;
  }
}
