import { ERROR_CODE, type ErrorCode } from "./code";

export type BaseUxAction = "toast" | "alert" | "none";
export type ErrorPolicy<UxAction = BaseUxAction> = {
  ux: UxAction;
  log: "info" | "error" | "warning" | "none";
};

export const ERROR_POLICIES: Record<ErrorCode, ErrorPolicy> = {
  [ERROR_CODE.VALIDATION]: { ux: "none", log: "warning" },
  [ERROR_CODE.AUTH_REQUIRED]: { ux: "alert", log: "error" },
  [ERROR_CODE.FORBIDDEN]: { ux: "alert", log: "warning" },
  [ERROR_CODE.NOT_FOUND]: { ux: "toast", log: "info" },
  [ERROR_CODE.RATE_LIMITED]: { ux: "toast", log: "warning" },

  [ERROR_CODE.NETWORK_ERROR]: { ux: "toast", log: "error" },
  [ERROR_CODE.TIMEOUT_ERROR]: { ux: "toast", log: "error" },

  [ERROR_CODE.INTERNAL_SERVER_ERROR]: { ux: "toast", log: "error" },
  [ERROR_CODE.UNKNOWN_CLIENT_ERROR]: { ux: "toast", log: "error" },
};

export const DEFAULT_ERROR_POLICY: ErrorPolicy = { ux: "toast", log: "info" };
