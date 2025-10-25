import { safeRouteHandler } from "@/error/safe-route-handler";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = safeRouteHandler(async () => {
  const users = await db.users.list();
  return NextResponse.json(users);
});
