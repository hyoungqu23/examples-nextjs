"use server";

import { z } from "zod";
import { ERROR_CODE } from "./code";
import { isDomainError } from "./domain-error";
import { makeError } from "./make-error";
import { actionFailure, actionSuccess, type Result } from "./result";

export const safeServerAction = <S extends z.ZodSchema, R>(
  schema: S,
  action: (data: z.infer<S>) => Promise<R>
) => {
  return async (data: z.infer<S>): Promise<Result<R>> => {
    try {
      const validation = schema.safeParse(data);

      if (!validation.success) {
        throw makeError({
          code: ERROR_CODE.VALIDATION,
          details: { fieldErrors: validation.error.flatten().fieldErrors },
          message: "입력 값이 올바르지 않습니다.",
        });
      }

      const result = await action(validation.data);
      return actionSuccess(result);
    } catch (error) {
      if (isDomainError(error)) return actionFailure(error);

      console.error("Unhandled error in safeServerAction", error);
      const unknown = makeError({
        code: ERROR_CODE.INTERNAL_SERVER_ERROR,
        details: undefined,
        message: "서버에서 알 수 없는 에러가 발생했습니다.",
        cause: error,
      });
      return actionFailure(unknown);
    }
  };
};
