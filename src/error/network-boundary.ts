import { z } from "zod";
import { ERROR_CODE } from "./code";
import { isDomainError } from "./domain-error";
import { makeError } from "./make-error";

const ProblemDetailsSchema = z.object({
  code: z.nativeEnum(ERROR_CODE),
  message: z.string().optional(),
  details: z.unknown(),
});

type Params<S extends z.ZodSchema> = {
  schema: S;
  input: RequestInfo | URL;
  init?: RequestInit;
};

export const networkBoundary = async <S extends z.ZodSchema>({
  schema,
  input,
  init,
}: Params<S>): Promise<z.infer<S>> => {
  try {
    const response = await fetch(input, init);

    if (!response.ok) {
      const body = await response.json().catch(() => ({}));
      const validation = ProblemDetailsSchema.safeParse(body);

      if (validation.success) {
        // 서버가 약속된 형식의 에러를 보낸 경우
        throw makeError({
          code: validation.data.code,
          details: validation.data.details,
          message: validation.data.message,
        } as never);
      }

      // 서버가 약속된 형식의 에러를 보내지 않은 경우
      throw makeError({
        code: ERROR_CODE.UNKNOWN_CLIENT_ERROR,
        details: undefined,
        message: `서버로부터 잘못된 형식의 에러 응답을 받았습니다. (status: ${response.status})`,
      });
    }

    const body = await response.json();
    const validation = schema.safeParse(body);

    if (!validation.success) {
      throw makeError({
        code: ERROR_CODE.UNKNOWN_CLIENT_ERROR,
        details: undefined,
        message: "서버로부터 잘못된 형식의 데이터를 받았습니다.",
        cause: { validationError: validation.error },
      });
    }

    return validation.data;
  } catch (error) {
    if (isDomainError(error)) throw error;

    // 네트워크 에러
    throw makeError({
      code: ERROR_CODE.NETWORK_ERROR,
      details: undefined,
      message: "네트워크 연결을 확인해주세요.",
      cause: error,
    });
  }
};
