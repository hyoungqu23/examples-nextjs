import { Sentry } from "@/services/sentry";
import { NextResponse } from "next/server";
import { ERROR_CODE, type ErrorCode } from "./code";
import { isDomainError } from "./domain-error";
import { makeError } from "./make-error";

const getHTTPStatusCodeFromErrorCode = (code: ErrorCode): number => {
  switch (code) {
    case "NOT_FOUND":
      return 404;
    case "AUTH_REQUIRED":
      return 401;
    case "FORBIDDEN":
      return 403;
    case "RATE_LIMITED":
      return 429;
    default:
      return 500;
  }
};

export const safeRouteHandler = <T extends Record<string, unknown>>(
  handler: (request: Request, context: { params: T }) => Promise<NextResponse>
) => {
  return async (
    request: Request,
    context: { params: T }
  ): Promise<NextResponse> => {
    try {
      return await handler(request, context);
    } catch (error) {
      const domainError = isDomainError(error)
        ? error
        : makeError({
            code: ERROR_CODE.INTERNAL_SERVER_ERROR,
            details: undefined,
            message: "Route Handler의 API에서 에러가 발생했습니다.",
            cause: error,
          });

      if (domainError.code === ERROR_CODE.INTERNAL_SERVER_ERROR) {
        // eslint-disable-next-line no-console
        console.error("API Error:", domainError.cause);
        Sentry.captureException(domainError);
      }

      const status = getHTTPStatusCodeFromErrorCode(domainError.code);
      return NextResponse.json(
        {
          code: domainError.code,
          message: domainError.message,
          details: domainError.details,
        },
        { status }
      );
    }
  };
};
