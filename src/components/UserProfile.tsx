"use client";

import { handleError } from "@/error/handler";
import { networkBoundary } from "@/error/network-boundary";
import { zUser } from "@/lib/schemas";
import { useEffect, useState } from "react";

export const UserProfile = ({ userId }: { userId: string }) => {
  const [user, setUser] = useState<ReturnType<typeof zUser.parse> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true);
        const data = await networkBoundary({
          schema: zUser,
          input: `/api/users/${userId}`,
        });
        setUser(data);
      } catch (error) {
        handleError(error);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [userId]);

  if (loading) return <div>로딩 중…</div>;
  if (!user) return <div>사용자 정보가 없습니다.</div>;

  return (
    <div className="flex items-center gap-4">
      <img
        src={user.profile!.avatarUrl as string}
        alt={user.name}
        width={24}
        height={24}
      />
      <div>
        <div className="text-lg font-semibold">{user.name}</div>
        <div className="text-sm text-zinc-600">{user.email}</div>
      </div>
    </div>
  );
};
