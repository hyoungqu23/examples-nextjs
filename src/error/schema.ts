import { z } from "zod";
import { ERROR_CODE, type ErrorCode } from "./code";

export const ErrorDetailsSchema = {
  [ERROR_CODE.VALIDATION]: z.object({
    fieldErrors: z.record(z.array(z.string()).optional()),
  }),
  [ERROR_CODE.RATE_LIMITED]: z.object({ retryAfter: z.number().positive() }),
  [ERROR_CODE.AUTH_REQUIRED]: z.void(),
  [ERROR_CODE.FORBIDDEN]: z.void(),
  [ERROR_CODE.NOT_FOUND]: z.void(),
  [ERROR_CODE.NETWORK_ERROR]: z.void(),
  [ERROR_CODE.TIMEOUT_ERROR]: z.void(),
  [ERROR_CODE.INTERNAL_SERVER_ERROR]: z.void(),
  [ERROR_CODE.UNKNOWN_CLIENT_ERROR]: z.void(),
} as const satisfies Record<ErrorCode, z.ZodTypeAny>;

export type ErrorDetails = {
  [K in ErrorCode]: z.infer<(typeof ErrorDetailsSchema)[K]>;
};
