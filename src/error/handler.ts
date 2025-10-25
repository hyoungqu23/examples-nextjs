import { Sentry } from "@/services/sentry";
import { toast } from "@/services/toast";
import { ERROR_CODE } from "./code";
import { DomainError, isDomainError } from "./domain-error";
import { makeError } from "./make-error";
import {
  DEFAULT_ERROR_POLICY,
  ERROR_POLICIES,
  type BaseUxAction,
  type ErrorPolicy,
} from "./policies";

type ErrorPolicyWithCustomOptions = Partial<
  ErrorPolicy<BaseUxAction | ((error: DomainError) => void)>
>;

export const handleError = (
  error: unknown,
  options: ErrorPolicyWithCustomOptions = {}
) => {
  const domainError = isDomainError(error)
    ? error
    : makeError({
        code: ERROR_CODE.UNKNOWN_CLIENT_ERROR,
        details: undefined,
        message: "알 수 없는 에러가 발생했습니다.",
        cause: error,
      });

  const policy: ErrorPolicy =
    ERROR_POLICIES[domainError.code] || DEFAULT_ERROR_POLICY;
  const finalUx = options.ux ?? policy.ux;
  const finalLog = options.log ?? policy.log;

  // UX handling
  if (typeof finalUx === "function") {
    finalUx(domainError);
  } else if (finalUx === "toast") {
    toast.error(domainError.message);
  } else if (finalUx === "alert") {
    alert(domainError.message);
  }

  // Logging
  if (finalLog === "info") {
    console.info(domainError);
  } else if (finalLog === "warning") {
    console.warn(domainError);
  } else if (finalLog === "error") {
    console.error(domainError);
    Sentry.captureException(domainError);
  }
};
