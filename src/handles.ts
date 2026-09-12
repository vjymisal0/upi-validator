import { UpiHandleInfo } from "./types";

/**
 * NPCI-approved bank and PSP handles database.
 * Normalised to lowercase without leading '@'.
 */
export const NPCI_HANDLES_LIST: readonly UpiHandleInfo[] = [
  // ----------------------------------------------------
  // Popular Payment Apps & PSPs
  // ----------------------------------------------------
  { handle: "okhdfcbank", provider: "Google Pay", bank: "HDFC Bank", category: "app" },
  { handle: "okaxis", provider: "Google Pay", bank: "Axis Bank", category: "app" },
  { handle: "okicici", provider: "Google Pay", bank: "ICICI Bank", category: "app" },
  { handle: "oksbi", provider: "Google Pay", bank: "State Bank of India", category: "app" },
  { handle: "okbizaxis", provider: "Google Pay for Business", bank: "Axis Bank", category: "app" },

  { handle: "ybl", provider: "PhonePe", bank: "YES Bank", category: "app" },
  { handle: "ibl", provider: "PhonePe", bank: "IndusInd Bank", category: "app" },
  { handle: "axl", provider: "PhonePe", bank: "Axis Bank", category: "app" },

  { handle: "paytm", provider: "Paytm", bank: "Paytm Payments Bank / Partner Banks", category: "app" },
  { handle: "ptsbi", provider: "Paytm", bank: "State Bank of India", category: "app" },
  { handle: "pthdfc", provider: "Paytm", bank: "HDFC Bank", category: "app" },
  { handle: "ptaxis", provider: "Paytm", bank: "Axis Bank", category: "app" },
  { handle: "pticici", provider: "Paytm", bank: "ICICI Bank", category: "app" },

  { handle: "upi", provider: "BHIM UPI", bank: "NPCI", category: "app" },
  { handle: "bhim", provider: "BHIM UPI", bank: "NPCI", category: "app" },

  { handle: "apl", provider: "Amazon Pay", bank: "Axis Bank", category: "app" },
  { handle: "rapl", provider: "Amazon Pay", bank: "RBL Bank", category: "app" },

  { handle: "waaxis", provider: "WhatsApp Pay", bank: "Axis Bank", category: "app" },
  { handle: "wahdfcbank", provider: "WhatsApp Pay", bank: "HDFC Bank", category: "app" },
  { handle: "waicici", provider: "WhatsApp Pay", bank: "ICICI Bank", category: "app" },
  { handle: "wasbi", provider: "WhatsApp Pay", bank: "State Bank of India", category: "app" },

  { handle: "ckers", provider: "CRED", bank: "IDFC FIRST Bank", category: "fintech" },
  { handle: "cbaxis", provider: "CRED", bank: "Axis Bank", category: "fintech" },
  { handle: "cbsbi", provider: "CRED", bank: "State Bank of India", category: "fintech" },
  { handle: "cbicici", provider: "CRED", bank: "ICICI Bank", category: "fintech" },
  { handle: "cbhdfc", provider: "CRED", bank: "HDFC Bank", category: "fintech" },

  { handle: "ikwik", provider: "MobiKwik", bank: "ICICI Bank", category: "fintech" },
  { handle: "mbk", provider: "MobiKwik", category: "fintech" },
  { handle: "slice", provider: "Slice", bank: "North East Small Finance Bank", category: "fintech" },
  { handle: "jupiteraxis", provider: "Jupiter Money", bank: "Axis Bank", category: "fintech" },
  { handle: "freecharge", provider: "Freecharge", bank: "Axis Bank", category: "fintech" },
  { handle: "navi", provider: "Navi", bank: "Karnataka Bank", category: "fintech" },
  { handle: "postpe", provider: "BharatPe / postpe", bank: "YES Bank", category: "fintech" },
  { handle: "bharatpe", provider: "BharatPe", bank: "YES Bank", category: "fintech" },
  { handle: "fam", provider: "FamPay", bank: "IDFC FIRST Bank", category: "fintech" },
  { handle: "super", provider: "super.money", bank: "Utkarsh Small Finance Bank", category: "fintech" },
  { handle: "groww", provider: "Groww", bank: "YES Bank", category: "fintech" },
  { handle: "zerodha", provider: "Zerodha", category: "fintech" },
  { handle: "coindcx", provider: "CoinDCX", category: "fintech" },
  { handle: "cheq", provider: "Cheq", category: "fintech" },
  { handle: "kiwi", provider: "Kiwi", bank: "Axis Bank", category: "fintech" },
  { handle: "pop", provider: "POP Club", bank: "YES Bank", category: "fintech" },
  { handle: "uni", provider: "Uni Cards", bank: "YES Bank", category: "fintech" },
  { handle: "twid", provider: "Twid Pay", bank: "YES Bank", category: "fintech" },
  { handle: "tataneu", provider: "Tata Neu", bank: "HDFC Bank", category: "fintech" },
  { handle: "abfspay", provider: "Aditya Birla Capital", bank: "YES Bank", category: "fintech" },
  { handle: "bpay", provider: "Bajaj Pay", bank: "RBL Bank", category: "fintech" },
  { handle: "bajaj", provider: "Bajaj Pay", bank: "RBL Bank", category: "fintech" },
  { handle: "mi", provider: "Mi Pay", bank: "ICICI Bank", category: "fintech" },
  { handle: "realme", provider: "Realme PaySa", category: "fintech" },
  { handle: "samsung", provider: "Samsung Pay", bank: "Axis Bank", category: "fintech" },
  { handle: "timepay", provider: "TimePay", category: "fintech" },

  // ----------------------------------------------------
  // Payments Banks
  // ----------------------------------------------------
  { handle: "airtel", provider: "Airtel Payments Bank", bank: "Airtel Payments Bank", category: "payments-bank" },
  { handle: "myairtel", provider: "Airtel Payments Bank", bank: "Airtel Payments Bank", category: "payments-bank" },
  { handle: "ippb", provider: "India Post Payments Bank", bank: "India Post Payments Bank", category: "payments-bank" },
  { handle: "postbank", provider: "India Post Payments Bank", bank: "India Post Payments Bank", category: "payments-bank" },
  { handle: "jio", provider: "Jio Payments Bank", bank: "Jio Payments Bank", category: "payments-bank" },
  { handle: "fino", provider: "Fino Payments Bank", bank: "Fino Payments Bank", category: "payments-bank" },
  { handle: "finobank", provider: "Fino Payments Bank", bank: "Fino Payments Bank", category: "payments-bank" },
  { handle: "nsdl", provider: "NSDL Payments Bank", bank: "NSDL Payments Bank", category: "payments-bank" },

  // ----------------------------------------------------
  // Public Sector Banks
  // ----------------------------------------------------
  { handle: "sbi", provider: "State Bank of India", bank: "State Bank of India", category: "bank" },
  { handle: "statebankofindia", provider: "State Bank of India", bank: "State Bank of India", category: "bank" },
  { handle: "pnb", provider: "Punjab National Bank", bank: "Punjab National Bank", category: "bank" },
  { handle: "bob", provider: "Bank of Baroda", bank: "Bank of Baroda", category: "bank" },
  { handle: "barodampay", provider: "Bank of Baroda", bank: "Bank of Baroda", category: "bank" },
  { handle: "barodapay", provider: "Bank of Baroda", bank: "Bank of Baroda", category: "bank" },
  { handle: "canbank", provider: "Canara Bank", bank: "Canara Bank", category: "bank" },
  { handle: "cnrb", provider: "Canara Bank", bank: "Canara Bank", category: "bank" },
  { handle: "uboi", provider: "Union Bank of India", bank: "Union Bank of India", category: "bank" },
  { handle: "unionbank", provider: "Union Bank of India", bank: "Union Bank of India", category: "bank" },
  { handle: "unionbankofindia", provider: "Union Bank of India", bank: "Union Bank of India", category: "bank" },
  { handle: "boi", provider: "Bank of India", bank: "Bank of India", category: "bank" },
  { handle: "indianbank", provider: "Indian Bank", bank: "Indian Bank", category: "bank" },
  { handle: "indbank", provider: "Indian Bank", bank: "Indian Bank", category: "bank" },
  { handle: "cbi", provider: "Central Bank of India", bank: "Central Bank of India", category: "bank" },
  { handle: "centralbank", provider: "Central Bank of India", bank: "Central Bank of India", category: "bank" },
  { handle: "iob", provider: "Indian Overseas Bank", bank: "Indian Overseas Bank", category: "bank" },
  { handle: "uco", provider: "UCO Bank", bank: "UCO Bank", category: "bank" },
  { handle: "mahb", provider: "Bank of Maharashtra", bank: "Bank of Maharashtra", category: "bank" },
  { handle: "bom", provider: "Bank of Maharashtra", bank: "Bank of Maharashtra", category: "bank" },
  { handle: "psb", provider: "Punjab & Sind Bank", bank: "Punjab & Sind Bank", category: "bank" },
  { handle: "idbi", provider: "IDBI Bank", bank: "IDBI Bank", category: "bank" },
  { handle: "idbibank", provider: "IDBI Bank", bank: "IDBI Bank", category: "bank" },
  { handle: "ibkl", provider: "IDBI Bank", bank: "IDBI Bank", category: "bank" },

  // ----------------------------------------------------
  // Private Sector Banks & Bank Apps
  // ----------------------------------------------------
  { handle: "hdfcbank", provider: "HDFC Bank", bank: "HDFC Bank", category: "bank" },
  { handle: "hdfc", provider: "HDFC Bank", bank: "HDFC Bank", category: "bank" },
  { handle: "payzapp", provider: "HDFC PayZapp", bank: "HDFC Bank", category: "app" },
  { handle: "chillr", provider: "HDFC Chillr", bank: "HDFC Bank", category: "app" },
  { handle: "icici", provider: "ICICI Bank", bank: "ICICI Bank", category: "bank" },
  { handle: "pockets", provider: "ICICI Pockets", bank: "ICICI Bank", category: "app" },
  { handle: "tapicici", provider: "ICICI TapPay", bank: "ICICI Bank", category: "app" },
  { handle: "axisbank", provider: "Axis Bank", bank: "Axis Bank", category: "bank" },
  { handle: "axis", provider: "Axis Bank", bank: "Axis Bank", category: "bank" },
  { handle: "lime", provider: "Axis Lime", bank: "Axis Bank", category: "app" },
  { handle: "pingpay", provider: "Axis Pingpay", bank: "Axis Bank", category: "app" },
  { handle: "kotak", provider: "Kotak Mahindra Bank", bank: "Kotak Mahindra Bank", category: "bank" },
  { handle: "kmbl", provider: "Kotak Mahindra Bank", bank: "Kotak Mahindra Bank", category: "bank" },
  { handle: "kaypay", provider: "Kotak Kaypay", bank: "Kotak Mahindra Bank", category: "app" },
  { handle: "indus", provider: "IndusInd Bank", bank: "IndusInd Bank", category: "bank" },
  { handle: "indusind", provider: "IndusInd Bank", bank: "IndusInd Bank", category: "bank" },
  { handle: "federal", provider: "Federal Bank", bank: "Federal Bank", category: "bank" },
  { handle: "yesbank", provider: "YES Bank", bank: "YES Bank", category: "bank" },
  { handle: "yesbankltd", provider: "YES Bank", bank: "YES Bank", category: "bank" },
  { handle: "rbl", provider: "RBL Bank", bank: "RBL Bank", category: "bank" },
  { handle: "idfc", provider: "IDFC FIRST Bank", bank: "IDFC FIRST Bank", category: "bank" },
  { handle: "idfcbank", provider: "IDFC FIRST Bank", bank: "IDFC FIRST Bank", category: "bank" },
  { handle: "idfcfirst", provider: "IDFC FIRST Bank", bank: "IDFC FIRST Bank", category: "bank" },
  { handle: "sc", provider: "Standard Chartered Bank", bank: "Standard Chartered Bank", category: "bank" },
  { handle: "scb", provider: "Standard Chartered Bank", bank: "Standard Chartered Bank", category: "bank" },
  { handle: "hsbc", provider: "HSBC Bank", bank: "HSBC Bank", category: "bank" },
  { handle: "citi", provider: "CitiBank India", bank: "CitiBank", category: "bank" },
  { handle: "citigold", provider: "CitiBank India", bank: "CitiBank", category: "bank" },
  { handle: "sib", provider: "South Indian Bank", bank: "South Indian Bank", category: "bank" },
  { handle: "kvb", provider: "Karur Vysya Bank", bank: "Karur Vysya Bank", category: "bank" },
  { handle: "cub", provider: "City Union Bank", bank: "City Union Bank", category: "bank" },
  { handle: "tmb", provider: "Tamilnad Mercantile Bank", bank: "Tamilnad Mercantile Bank", category: "bank" },
  { handle: "kbl", provider: "Karnataka Bank", bank: "Karnataka Bank", category: "bank" },
  { handle: "karnatakabank", provider: "Karnataka Bank", bank: "Karnataka Bank", category: "bank" },
  { handle: "dlb", provider: "Dhanlaxmi Bank", bank: "Dhanlaxmi Bank", category: "bank" },
  { handle: "bandhan", provider: "Bandhan Bank", bank: "Bandhan Bank", category: "bank" },
  { handle: "dbs", provider: "DBS Bank", bank: "DBS Bank", category: "bank" },
  { handle: "digibank", provider: "DBS Digibank", bank: "DBS Bank", category: "bank" },
  { handle: "db", provider: "Deutsche Bank", bank: "Deutsche Bank", category: "bank" },
  { handle: "barclays", provider: "Barclays Bank", bank: "Barclays Bank", category: "bank" },
  { handle: "bnpparibas", provider: "BNP Paribas", bank: "BNP Paribas", category: "bank" },
  { handle: "sbm", provider: "SBM Bank India", bank: "SBM Bank", category: "bank" },
  { handle: "csb", provider: "CSB Bank", bank: "CSB Bank", category: "bank" },
  { handle: "jandkbank", provider: "Jammu & Kashmir Bank", bank: "Jammu & Kashmir Bank", category: "bank" },
  { handle: "jkbank", provider: "Jammu & Kashmir Bank", bank: "Jammu & Kashmir Bank", category: "bank" },
  { handle: "nainital", provider: "Nainital Bank", bank: "Nainital Bank", category: "bank" },

  // ----------------------------------------------------
  // Small Finance Banks
  // ----------------------------------------------------
  { handle: "aubank", provider: "AU Small Finance Bank", bank: "AU Small Finance Bank", category: "small-finance-bank" },
  { handle: "equitas", provider: "Equitas Small Finance Bank", bank: "Equitas Small Finance Bank", category: "small-finance-bank" },
  { handle: "ujjivan", provider: "Ujjivan Small Finance Bank", bank: "Ujjivan Small Finance Bank", category: "small-finance-bank" },
  { handle: "suryoday", provider: "Suryoday Small Finance Bank", bank: "Suryoday Small Finance Bank", category: "small-finance-bank" },
  { handle: "jana", provider: "Jana Small Finance Bank", bank: "Jana Small Finance Bank", category: "small-finance-bank" },
  { handle: "utkarsh", provider: "Utkarsh Small Finance Bank", bank: "Utkarsh Small Finance Bank", category: "small-finance-bank" },
  { handle: "csfb", provider: "Capital Small Finance Bank", bank: "Capital Small Finance Bank", category: "small-finance-bank" },
  { handle: "esaf", provider: "ESAF Small Finance Bank", bank: "ESAF Small Finance Bank", category: "small-finance-bank" },
  { handle: "fincare", provider: "Fincare Small Finance Bank", bank: "Fincare Small Finance Bank", category: "small-finance-bank" },
  { handle: "shivalik", provider: "Shivalik Small Finance Bank", bank: "Shivalik Small Finance Bank", category: "small-finance-bank" },
  { handle: "unity", provider: "Unity Small Finance Bank", bank: "Unity Small Finance Bank", category: "small-finance-bank" },
  { handle: "nesfb", provider: "North East Small Finance Bank", bank: "North East Small Finance Bank", category: "small-finance-bank" },

  // ----------------------------------------------------
  // Co-operative & State Apex Banks
  // ----------------------------------------------------
  { handle: "saraswatbank", provider: "Saraswat Co-operative Bank", bank: "Saraswat Bank", category: "cooperative-bank" },
  { handle: "cosmos", provider: "Cosmos Co-operative Bank", bank: "Cosmos Bank", category: "cooperative-bank" },
  { handle: "cosmosbank", provider: "Cosmos Co-operative Bank", bank: "Cosmos Bank", category: "cooperative-bank" },
  { handle: "svc", provider: "SVC Co-operative Bank", bank: "SVC Bank", category: "cooperative-bank" },
  { handle: "svcbank", provider: "SVC Co-operative Bank", bank: "SVC Bank", category: "cooperative-bank" },
  { handle: "tjsb", provider: "TJSB Sahakari Bank", bank: "TJSB Bank", category: "cooperative-bank" },
  { handle: "nkgsb", provider: "NKGSB Co-operative Bank", bank: "NKGSB Bank", category: "cooperative-bank" },
  { handle: "shamrao", provider: "Shamrao Vithal Co-operative Bank", bank: "SVC Bank", category: "cooperative-bank" },
  { handle: "abhyudaya", provider: "Abhyudaya Co-operative Bank", bank: "Abhyudaya Bank", category: "cooperative-bank" },
  { handle: "apna", provider: "Apna Sahakari Bank", bank: "Apna Sahakari Bank", category: "cooperative-bank" },
  { handle: "kalupurbank", provider: "Kalupur Commercial Co-op Bank", bank: "Kalupur Bank", category: "cooperative-bank" },
  { handle: "rnsb", provider: "Rajkot Nagarik Sahakari Bank", bank: "RNSB", category: "cooperative-bank" },
  { handle: "spcb", provider: "Surat People's Co-operative Bank", bank: "SPCB", category: "cooperative-bank" },
  { handle: "tbsc", provider: "Thane Bharat Sahakari Bank", bank: "TBSB", category: "cooperative-bank" },
  { handle: "gscb", provider: "Gujarat State Co-operative Bank", bank: "GSCB", category: "cooperative-bank" },
  { handle: "mscb", provider: "Maharashtra State Co-operative Bank", bank: "MSCB", category: "cooperative-bank" },
  { handle: "kscb", provider: "Karnataka State Apex Co-op Bank", bank: "KSCB", category: "cooperative-bank" },
  { handle: "akola", provider: "Akola Urban Co-operative Bank", bank: "Akola Urban Bank", category: "cooperative-bank" },
  { handle: "citizen", provider: "Citizen Credit Co-operative Bank", bank: "Citizen Credit Bank", category: "cooperative-bank" },
  { handle: "janata", provider: "Janata Sahakari Bank", bank: "Janata Sahakari Bank", category: "cooperative-bank" },

  // ----------------------------------------------------
  // Regional Rural Banks (RRBs)
  // ----------------------------------------------------
  { handle: "bggb", provider: "Baroda Gujarat Gramin Bank", bank: "Bank of Baroda", category: "regional-rural-bank" },
  { handle: "kgb", provider: "Kerala Gramin Bank", bank: "Canara Bank", category: "regional-rural-bank" },
  { handle: "kgrb", provider: "Karnataka Gramin Bank", bank: "Canara Bank", category: "regional-rural-bank" },
  { handle: "apgb", provider: "Andhra Pragathi Grameena Bank", bank: "Canara Bank", category: "regional-rural-bank" },
  { handle: "aryavart", provider: "Aryavart Bank", bank: "Bank of India", category: "regional-rural-bank" },
  { handle: "prathama", provider: "Prathama UP Gramin Bank", bank: "Punjab National Bank", category: "regional-rural-bank" },
  { handle: "pbgb", provider: "Paschim Banga Gramin Bank", bank: "UCO Bank", category: "regional-rural-bank" },
  { handle: "sgb", provider: "Saurashtra Gramin Bank", bank: "State Bank of India", category: "regional-rural-bank" },
  { handle: "tgb", provider: "Telangana Grameena Bank", bank: "State Bank of India", category: "regional-rural-bank" },
  { handle: "agvb", provider: "Assam Gramin Vikash Bank", bank: "Punjab National Bank", category: "regional-rural-bank" },
  { handle: "mrb", provider: "Meghalaya Rural Bank", bank: "State Bank of India", category: "regional-rural-bank" },
  { handle: "mzrb", provider: "Mizoram Rural Bank", bank: "State Bank of India", category: "regional-rural-bank" },
  { handle: "manipur", provider: "Manipur Rural Bank", bank: "Punjab National Bank", category: "regional-rural-bank" },
  { handle: "nrb", provider: "Nagaland Rural Bank", bank: "State Bank of India", category: "regional-rural-bank" },
  { handle: "apr", provider: "Arunachal Pradesh Rural Bank", bank: "State Bank of India", category: "regional-rural-bank" },
  { handle: "hpgb", provider: "Himachal Pradesh Gramin Bank", bank: "Punjab National Bank", category: "regional-rural-bank" },
  { handle: "jkgb", provider: "J&K Grameen Bank", bank: "J&K Bank", category: "regional-rural-bank" },
  { handle: "pgb", provider: "Punjab Gramin Bank", bank: "Punjab National Bank", category: "regional-rural-bank" },
  { handle: "shgb", provider: "Sarva Haryana Gramin Bank", bank: "Punjab National Bank", category: "regional-rural-bank" },
  { handle: "rmgb", provider: "Rajasthan Marudhara Gramin Bank", bank: "State Bank of India", category: "regional-rural-bank" },
  { handle: "brkgb", provider: "Baroda Rajasthan Kshetriya Gramin Bank", bank: "Bank of Baroda", category: "regional-rural-bank" },
  { handle: "mpgb", provider: "Madhya Pradesh Gramin Bank", bank: "Bank of India", category: "regional-rural-bank" },
  { handle: "mgb", provider: "Maharashtra Gramin Bank", bank: "Bank of Maharashtra", category: "regional-rural-bank" },
  { handle: "crgb", provider: "Chhattisgarh Rajya Gramin Bank", bank: "State Bank of India", category: "regional-rural-bank" },
  { handle: "jrgb", provider: "Jharkhand Rajya Gramin Bank", bank: "State Bank of India", category: "regional-rural-bank" },
  { handle: "dbgb", provider: "Dakshin Bihar Gramin Bank", bank: "Punjab National Bank", category: "regional-rural-bank" },
  { handle: "ubgb", provider: "Uttar Bihar Gramin Bank", bank: "Central Bank of India", category: "regional-rural-bank" },
  { handle: "ogb", provider: "Odisha Gramya Bank", bank: "Indian Overseas Bank", category: "regional-rural-bank" },
  { handle: "ukgb", provider: "Utkal Grameen Bank", bank: "State Bank of India", category: "regional-rural-bank" },
  { handle: "bgvb", provider: "Bangiya Gramin Vikash Bank", bank: "Punjab National Bank", category: "regional-rural-bank" },
  { handle: "vkgb", provider: "Vidharbha Konkan Gramin Bank", bank: "Bank of India", category: "regional-rural-bank" },
  { handle: "cggb", provider: "Chaitanya Godavari Grameena Bank", bank: "Union Bank of India", category: "regional-rural-bank" },
  { handle: "tngb", provider: "Tamil Nadu Grama Bank", bank: "Indian Bank", category: "regional-rural-bank" },
] as const;

/**
 * Fast lookup map for O(1) handle validation and provider retrieval.
 */
export const NPCI_HANDLES_MAP: ReadonlyMap<string, UpiHandleInfo> = new Map(
  NPCI_HANDLES_LIST.map((item) => [item.handle.toLowerCase(), item])
);

/**
 * Total count of registered NPCI handles.
 */
export const TOTAL_KNOWN_HANDLES = NPCI_HANDLES_MAP.size;

/**
 * Checks whether a given handle is recognized in the NPCI handles registry.
 * Accepts handle with or without leading '@' and is case-insensitive.
 *
 * @param handle - UPI handle (e.g. "okhdfcbank" or "@okhdfcbank")
 * @returns `true` if handle is registered, `false` otherwise
 */
export function isKnownUpiHandle(handle: string): boolean {
  if (!handle || typeof handle !== "string") return false;
  const cleaned = handle.startsWith("@") ? handle.slice(1).trim().toLowerCase() : handle.trim().toLowerCase();
  return NPCI_HANDLES_MAP.has(cleaned);
}

/**
 * Retrieves metadata for a known UPI handle.
 *
 * @param handle - UPI handle (e.g. "okhdfcbank" or "@okhdfcbank")
 * @returns Handle metadata or `undefined` if not recognized
 */
export function getHandleInfo(handle: string): UpiHandleInfo | undefined {
  if (!handle || typeof handle !== "string") return undefined;
  const cleaned = handle.startsWith("@") ? handle.slice(1).trim().toLowerCase() : handle.trim().toLowerCase();
  return NPCI_HANDLES_MAP.get(cleaned);
}

/**
 * Returns the provider/app name for a handle or full VPA.
 *
 * @param handleOrVpa - UPI handle or full VPA (e.g. "user@okhdfcbank" or "okhdfcbank")
 * @returns Provider name (e.g. "Google Pay") or `undefined`
 */
export function getUpiProvider(handleOrVpa: string): string | undefined {
  if (!handleOrVpa || typeof handleOrVpa !== "string") return undefined;
  const parts = handleOrVpa.split("@");
  const handle = parts.length > 1 ? parts[1] : parts[0];
  return getHandleInfo(handle)?.provider;
}

/**
 * Returns a list of all registered NPCI UPI handles.
 */
export function getAllHandles(): readonly UpiHandleInfo[] {
  return NPCI_HANDLES_LIST;
}
