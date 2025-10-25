"use server";

import { ERROR_CODE } from "@/error/code";
import { makeError } from "@/error/make-error";
import { safeServerAction } from "@/error/safe-server-action";
import { db } from "@/lib/db";
import { z } from "zod";

const signInSchema = z.object({
  email: z.string().email("올바른 이메일을 입력해주세요."),
  password: z.string().min(8, "비밀번호는 8자 이상이어야 합니다."),
});

export const signIn = safeServerAction(signInSchema, async (data) => {
  const user = await db.users.findByEmail(data.email);
  const isPasswordValid = (input: string, actual: string) => input === actual;

  if (!user || !isPasswordValid(data.password, user.password)) {
    throw makeError({
      code: ERROR_CODE.AUTH_REQUIRED,
      details: undefined,
      message: "이메일 또는 비밀번호가 일치하지 않습니다.",
    });
  }

  return { userId: user.id, name: user.name };
});
