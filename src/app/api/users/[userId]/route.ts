import { ERROR_CODE } from "@/error/code";
import { makeError } from "@/error/make-error";
import { safeRouteHandler } from "@/error/safe-route-handler";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = safeRouteHandler(
  async (_req, { params }: { params: { userId: string } }) => {
    try {
      const user = await db.users.find(params.userId);
      if (!user) {
        throw makeError({
          code: ERROR_CODE.NOT_FOUND,
          details: undefined,
          message: "사용자를 찾을 수 없습니다.",
        });
      }

      return NextResponse.json(user);
    } catch (error) {
      throw error;
    }
  }
);
