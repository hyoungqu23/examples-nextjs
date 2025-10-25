import { ERROR_CODE, type ErrorCode } from "./code";
import { DomainError } from "./domain-error";
import { ErrorDetailsSchema, type ErrorDetails } from "./schema";

export type MakeErrorArgs = {
  [C in ErrorCode]: {
    code: C;
    details: ErrorDetails[C];
    message?: string;
    cause?: unknown;
  };
}[ErrorCode];

export const makeError = ({
  code,
  details,
  message,
  cause,
}: MakeErrorArgs): DomainError => {
  const validation = ErrorDetailsSchema[code].safeParse(details);

  if (!validation.success) {
    console.error(`Invalid details for error code ${code}:`, validation.error);

    return new DomainError({
      code: ERROR_CODE.UNKNOWN_CLIENT_ERROR,
      message: "잘못된 에러 details 정보로 에러 객체가 생성되었습니다.",
      details: undefined,
      cause: { validationError: validation.error, originalCause: cause },
    });
  }

  return new DomainError({
    code,
    details: validation.data,
    message,
    cause,
  });
};
