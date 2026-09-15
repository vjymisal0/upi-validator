# upi-validator

[![npm version](https://img.shields.io/npm/v/upi-validator.svg?style=flat-square&color=cb3837)](https://www.npmjs.com/package/upi-validator)
[![CI](https://github.com/vjymisal0/upi-validator/actions/workflows/ci.yml/badge.svg)](https://github.com/vjymisal0/upi-validator/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Zero Dependencies](https://img.shields.io/badge/Dependencies-0-success.svg?style=flat-square)](https://www.npmjs.com/package/upi-validator)
[![Tests Passing](https://img.shields.io/badge/Tests-47%20Passed-brightgreen.svg?style=flat-square)](https://github.com/vjymisal0/upi-validator)
[![ESM + CommonJS](https://img.shields.io/badge/Module-ESM%20%2B%20CJS-informational.svg?style=flat-square)](https://github.com/vjymisal0/upi-validator)

Zero-dependency, ultra-fast Indian UPI ID (VPA) validator, bank handle recognizer, and NPCI `upi://pay` deep link intent URL builder & parser for Node.js, browsers, and Edge runtimes.

---

## 🚀 Features

- ⚡ **Zero Dependencies**: Pure TypeScript implementation with zero external runtime packages.
- 🎯 **NPCI Compliance**: Full validation of Indian Unified Payments Interface (UPI) VPA specifications (length limits, character sets, separators).
- 🏦 **170+ Official Handles**: Extensive registry of NPCI-approved bank and PSP handles (Google Pay, PhonePe, Paytm, BHIM, CRED, Amazon Pay, SBI, HDFC, ICICI, Axis, Kotak, RRBs, SFBs).
- 🔗 **NPCI Intent Deep Links**: Create and parse official `upi://pay` deep links with query parameters (`pa`, `pn`, `am`, `cu`, `tn`, `tr`, `mc`, `url`, `sign`).
- 📦 **Dual ESM & CommonJS**: Ships with complete ES module and CommonJS distributions with `.d.ts` declaration maps.
- 🛡️ **Type-Safe**: 100% strict TypeScript typing out of the box.

---

## 📦 Installation

```bash
# npm
npm install upi-validator

# yarn
yarn add upi-validator

# pnpm
pnpm add upi-validator
```

---

## ⚡ Quick Start

### 1. Validate UPI ID (VPA) & Recognize Bank / PSP

```ts
import { validateUpiId, isValidUpiId } from "upi-validator";

// Comprehensive validation result
const result = validateUpiId("rahul.sharma@okaxis");
console.log(result);
/*
{
  isValid: true,
  vpa: "rahul.sharma@okaxis",
  username: "rahul.sharma",
  handle: "okaxis",
  provider: "Google Pay",
  isKnownHandle: true
}
*/

// Fast boolean check
if (isValidUpiId("9876543210@paytm")) {
  console.log("Valid UPI ID!");
}
```

### 2. Generate NPCI Intent URL (`upi://pay`)

Generate standard deep links for QR codes, payment buttons, and mobile app intents:

```ts
import { buildUpiIntentUri } from "upi-validator";

const intentUri = buildUpiIntentUri({
  pa: "merchant@okhdfcbank",
  pn: "Acme Retail Store",
  am: 1249.50,
  tn: "Order #84920",
  tr: "TXN84920",
  cu: "INR",
});

console.log(intentUri);
// upi://pay?pa=merchant%40okhdfcbank&pn=Acme%20Retail%20Store&am=1249.50&cu=INR&tn=Order%20%2384920&tr=TXN84920
```

### 3. Parse and Validate UPI Deep Links

Extract payment parameters from incoming deep links or scanned QR strings:

```ts
import { parseUpiIntentUri } from "upi-validator";

const data = parseUpiIntentUri("upi://pay?pa=seller@ybl&pn=Coffee%20House&am=150.00&cu=INR");

console.log(data.pa); // "seller@ybl"
console.log(data.pn); // "Coffee House"
console.log(data.am); // 150
console.log(data.validationResult.provider); // "PhonePe"
```

---

## 📖 API Reference

### `validateUpiId(vpa: unknown): UpiValidationResult`

Validates structure, characters, length, and checks against the registry of registered NPCI bank and PSP handles.

```ts
interface UpiValidationResult {
  isValid: boolean;
  vpa: string;
  username: string;
  handle: string;
  provider?: string;
  isKnownHandle: boolean;
  error?: string;
}
```

#### Validation Rules:
- **Length**: 3 to 255 total characters.
- **Separator**: Exactly one `@` symbol.
- **Username** (`username@...`):
  - 1 to 100 characters.
  - Allowed characters: alphanumeric (`a-z`, `0-9`), dot (`.`), hyphen (`-`), underscore (`_`).
  - Cannot begin or end with a special character.
  - Cannot contain consecutive special characters (`..`, `--`, `__`, `.-`).
- **Handle** (`...@handle`):
  - 2 to 64 characters.
  - Allowed characters: alphanumeric (`a-z`, `0-9`) and dot (`.`).
  - Cannot be purely numeric.

---

### `buildUpiIntentUri(options: UpiIntentOptions): string`

Constructs an NPCI-compliant `upi://pay` URI with validated parameters.

```ts
interface UpiIntentOptions {
  /** Payee VPA / UPI ID (Required) */
  pa: string;
  /** Payee Name (Required) */
  pn: string;
  /** Merchant Category Code (4 digits, e.g. "5411") */
  mc?: string;
  /** Transaction Reference ID */
  tr?: string;
  /** Transaction ID */
  tid?: string;
  /** Transaction Note / Description */
  tn?: string;
  /** Transaction Amount in INR (auto-formatted to 2 decimal places) */
  am?: number | string;
  /** Currency code (Defaults to "INR") */
  cu?: string;
  /** Reference URL */
  url?: string;
  /** Minimum Amount to be paid */
  mam?: number | string;
  /** Transaction Initiation Mode */
  mode?: string;
  /** Organization ID / NPCI Org ID */
  orgid?: string;
  /** Digital Signature for signed intent */
  sign?: string;
}
```

---

### `parseUpiIntentUri(uri: string): UpiIntentData`

Parses query parameters from a `upi://pay` string and validates payee address `pa`.

```ts
interface UpiIntentData {
  rawUri: string;
  pa: string;
  pn: string;
  mc?: string;
  tr?: string;
  tid?: string;
  tn?: string;
  am?: number;
  amString?: string;
  cu: string;
  url?: string;
  mam?: number;
  mamString?: string;
  mode?: string;
  orgid?: string;
  sign?: string;
  otherParams: Record<string, string>;
  validationResult: UpiValidationResult;
}
```

---

### Helper Functions

- `isValidUpiId(vpa: unknown): boolean`: Fast boolean check for UPI ID validity.
- `getUpiHandle(vpa: string): string | null`: Extracts and normalizes handle string, or returns `null` if invalid.
- `normalizeUpiId(vpa: string): string`: Normalizes valid UPI ID to lowercase string, throws if invalid.
- `isKnownUpiHandle(handle: string): boolean`: Checks whether a handle exists in the NPCI registry.
- `getUpiProvider(handleOrVpa: string): string | undefined`: Looks up provider name from handle or full VPA.
- `getHandleInfo(handle: string): UpiHandleInfo | undefined`: Retrieves detailed metadata for a handle.
- `getAllHandles(): readonly UpiHandleInfo[]`: Returns the complete registry of 170+ approved handles.
- `isValidUpiIntentUri(uri: string): boolean`: Validates whether a URI is a correct `upi://pay` intent link.

---

## 🏦 Supported UPI Handles (170+ Handles)

| Category | Popular Handles | Provider / Sponsor |
| :--- | :--- | :--- |
| **Google Pay** | `@okhdfcbank`, `@okaxis`, `@okicici`, `@oksbi`, `@okbizaxis` | Google Pay (HDFC, Axis, ICICI, SBI) |
| **PhonePe** | `@ybl`, `@ibl`, `@axl` | PhonePe (YES Bank, IndusInd, Axis) |
| **Paytm** | `@paytm`, `@ptsbi`, `@pthdfc`, `@ptaxis`, `@pticici` | Paytm (PPBL, SBI, HDFC, Axis, ICICI) |
| **BHIM / NPCI** | `@upi`, `@bhim` | BHIM UPI (NPCI) |
| **Amazon Pay** | `@apl`, `@rapl` | Amazon Pay (Axis Bank, RBL Bank) |
| **WhatsApp Pay** | `@waaxis`, `@wahdfcbank`, `@waicici`, `@wasbi` | WhatsApp Pay |
| **CRED** | `@ckers`, `@cbaxis`, `@cbsbi`, `@cbicici`, `@cbhdfc` | CRED |
| **FinTechs** | `@ikwik`, `@mbk`, `@slice`, `@jupiteraxis`, `@navi`, `@super`, `@postpe`, `@fam`, `@kiwi` | MobiKwik, Jupiter, Slice, Navi, BharatPe |
| **Payments Banks** | `@airtel`, `@ippb`, `@postbank`, `@jio`, `@fino`, `@nsdl` | Airtel, India Post, Jio, Fino, NSDL |
| **Public Sector Banks** | `@sbi`, `@pnb`, `@bob`, `@canbank`, `@cnrb`, `@uboi`, `@boi`, `@indianbank`, `@cbi`, `@iob`, `@uco`, `@mahb`, `@psb`, `@idbi` | SBI, PNB, BOB, Canara, Union, BOI, etc. |
| **Private Sector Banks** | `@hdfcbank`, `@icici`, `@axisbank`, `@kotak`, `@indus`, `@federal`, `@yesbank`, `@rbl`, `@idfcbank`, `@sc`, `@hsbc`, `@dbs` | HDFC, ICICI, Axis, Kotak, Federal, etc. |
| **Small Finance Banks** | `@aubank`, `@equitas`, `@ujjivan`, `@suryoday`, `@jana`, `@utkarsh`, `@csfb`, `@esaf` | AU SFB, Equitas, Ujjivan, Utkarsh, etc. |
| **Co-operative Banks** | `@saraswatbank`, `@cosmos`, `@svc`, `@tjsb`, `@nkgsb`, `@abhyudaya`, `@apna`, `@kalupurbank` | Saraswat, Cosmos, SVC, TJSB, etc. |
| **Gramin / RRB Banks** | `@bggb`, `@kgb`, `@kgrb`, `@apgb`, `@aryavart`, `@prathama`, `@sgb`, `@tgb`, `@agvb` | Kerala Gramin, Aryavart, Prathama, etc. |

---

## ⚡ Performance

- **O(1) Handle Lookups**: Internal registry utilizes a pre-computed hash `Map` for instant O(1) handle validation.
- **Zero Allocations for Simple Checks**: Regular expressions are compiled once at module load.
- Validation benchmarks easily exceed **1,000,000+ operations/second** on modern hardware.

---

## 🧪 Testing

```bash
# Run tests with vitest
npm test

# Run tests with coverage
npm run test:coverage
```

---

## 📄 License

[MIT](LICENSE) © [Vijay Misal](mailto:misalvijay153@gmail.com)
