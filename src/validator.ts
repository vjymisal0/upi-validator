import { getHandleInfo } from "./handles";
import { UpiValidationResult } from "./types";

const MIN_VPA_LENGTH = 3;
const MAX_VPA_LENGTH = 255;
const MIN_USERNAME_LENGTH = 1;
const MAX_USERNAME_LENGTH = 100;
const MIN_HANDLE_LENGTH = 2;
const MAX_HANDLE_LENGTH = 64;

// Username allows alphanumeric, dot (.), hyphen (-), and underscore (_)
const USERNAME_ALLOWED_CHARS_REGEX = /^[a-zA-Z0-9._-]+$/;
// Handle allows alphanumeric and single dot/hyphen for sub-routing (e.g. bank sub-handles)
const HANDLE_ALLOWED_CHARS_REGEX = /^[a-zA-Z0-9.-]+$/;
const PURELY_NUMERIC_REGEX = /^\d+$/;
const CONSECUTIVE_SPECIAL_REGEX = /[._-]{2,}/;
const STARTS_OR_ENDS_WITH_SPECIAL_REGEX = /^[._-]|[._-]$/;

/**
 * Validates an Indian UPI Virtual Payment Address (VPA / UPI ID) according to
 * NPCI format specifications, validates structural constraints, and checks against
 * known registered bank/PSP handles.
 *
 * @param vpa - The UPI ID to validate (e.g. "user@okhdfcbank", "9876543210@paytm")
 * @returns A structured `UpiValidationResult`
 *
 * @example
 * ```ts
 * const result = validateUpiId("rahul@okaxis");
 * // result.isValid === true
 * // result.provider === "Google Pay"
 * // result.isKnownHandle === true
 * ```
 */
export function validateUpiId(vpa: unknown): UpiValidationResult {
  if (typeof vpa !== "string") {
    return {
      isValid: false,
      vpa: String(vpa ?? ""),
      username: "",
      handle: "",
      isKnownHandle: false,
      error: "UPI ID must be a string",
    };
  }

  const trimmed = vpa.trim();

  if (trimmed.length === 0) {
    return {
      isValid: false,
      vpa: "",
      username: "",
      handle: "",
      isKnownHandle: false,
      error: "UPI ID cannot be empty",
    };
  }

  if (trimmed.length < MIN_VPA_LENGTH || trimmed.length > MAX_VPA_LENGTH) {
    return {
      isValid: false,
      vpa: trimmed,
      username: "",
      handle: "",
      isKnownHandle: false,
      error: `UPI ID length must be between ${MIN_VPA_LENGTH} and ${MAX_VPA_LENGTH} characters`,
    };
  }

  const atCount = (trimmed.match(/@/g) || []).length;
  if (atCount === 0) {
    return {
      isValid: false,
      vpa: trimmed,
      username: trimmed,
      handle: "",
      isKnownHandle: false,
      error: "UPI ID must contain an '@' separator",
    };
  }

  if (atCount > 1) {
    return {
      isValid: false,
      vpa: trimmed,
      username: "",
      handle: "",
      isKnownHandle: false,
      error: "UPI ID cannot contain multiple '@' symbols",
    };
  }

  const [rawUsername, rawHandle] = trimmed.split("@");
  const username = rawUsername.toLowerCase();
  const handle = rawHandle.toLowerCase();

  // Validate Username
  if (username.length < MIN_USERNAME_LENGTH || username.length > MAX_USERNAME_LENGTH) {
    return {
      isValid: false,
      vpa: trimmed,
      username,
      handle,
      isKnownHandle: false,
      error: `Username length must be between ${MIN_USERNAME_LENGTH} and ${MAX_USERNAME_LENGTH} characters`,
    };
  }

  if (!USERNAME_ALLOWED_CHARS_REGEX.test(username)) {
    return {
      isValid: false,
      vpa: trimmed,
      username,
      handle,
      isKnownHandle: false,
      error: "Username contains invalid characters. Only alphanumeric, dot (.), hyphen (-), and underscore (_) are allowed",
    };
  }

  if (STARTS_OR_ENDS_WITH_SPECIAL_REGEX.test(username)) {
    return {
      isValid: false,
      vpa: trimmed,
      username,
      handle,
      isKnownHandle: false,
      error: "Username cannot start or end with a special character (., -, _)",
    };
  }

  if (CONSECUTIVE_SPECIAL_REGEX.test(username)) {
    return {
      isValid: false,
      vpa: trimmed,
      username,
      handle,
      isKnownHandle: false,
      error: "Username cannot contain consecutive special characters",
    };
  }

  // Validate Handle
  if (handle.length < MIN_HANDLE_LENGTH || handle.length > MAX_HANDLE_LENGTH) {
    return {
      isValid: false,
      vpa: trimmed,
      username,
      handle,
      isKnownHandle: false,
      error: `Handle length must be between ${MIN_HANDLE_LENGTH} and ${MAX_HANDLE_LENGTH} characters`,
    };
  }

  if (!HANDLE_ALLOWED_CHARS_REGEX.test(handle)) {
    return {
      isValid: false,
      vpa: trimmed,
      username,
      handle,
      isKnownHandle: false,
      error: "Handle contains invalid characters. Only alphanumeric characters and dots are allowed",
    };
  }

  if (PURELY_NUMERIC_REGEX.test(handle)) {
    return {
      isValid: false,
      vpa: trimmed,
      username,
      handle,
      isKnownHandle: false,
      error: "Handle cannot be purely numeric",
    };
  }

  if (/^[.-]|[.-]$/.test(handle)) {
    return {
      isValid: false,
      vpa: trimmed,
      username,
      handle,
      isKnownHandle: false,
      error: "Handle cannot start or end with a dot or hyphen",
    };
  }

  const normalizedVpa = `${username}@${handle}`;
  const handleInfo = getHandleInfo(handle);
  const isKnownHandle = handleInfo !== undefined;
  const provider = handleInfo?.provider;

  return {
    isValid: true,
    vpa: normalizedVpa,
    username,
    handle,
    provider,
    isKnownHandle,
  };
}

/**
 * Returns a boolean indicating whether the given string is a valid UPI ID (VPA).
 *
 * @param vpa - The UPI ID to check
 * @returns `true` if valid, `false` otherwise
 */
export function isValidUpiId(vpa: unknown): boolean {
  return validateUpiId(vpa).isValid;
}

/**
 * Extracts and normalizes the handle part of a UPI ID, or returns `null` if invalid.
 *
 * @param vpa - The UPI ID string
 * @returns Normalized handle string (without '@') or `null`
 */
export function getUpiHandle(vpa: string): string | null {
  const result = validateUpiId(vpa);
  return result.isValid ? result.handle : null;
}

/**
 * Normalizes a UPI ID to lowercase and trims surrounding whitespace.
 * Throws an error if the UPI ID is invalid.
 *
 * @param vpa - The UPI ID string
 * @returns Normalized lowercase UPI ID
 */
export function normalizeUpiId(vpa: string): string {
  const result = validateUpiId(vpa);
  if (!result.isValid) {
    throw new Error(`Cannot normalize invalid UPI ID: ${result.error}`);
  }
  return result.vpa;
}
