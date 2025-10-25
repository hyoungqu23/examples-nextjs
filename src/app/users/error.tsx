"use client";

import { handleError } from "@/error/handler";
import { useEffect } from "react";

export default function UsersPageError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    handleError(error, { ux: "none" });
  }, [error]);

  return (
    <div className="mx-auto max-w-2xl p-8">
      <h2 className="mb-2 text-xl font-semibold">
        사용자 목록을 불러올 수 없습니다.
      </h2>
      <p className="mb-4 text-zinc-600">
        데이터를 가져오는 중 문제가 발생했습니다. 네트워크 연결을 확인하고 다시
        시도해주세요.
      </p>
      <button
        className="rounded bg-black px-4 py-2 text-white dark:bg-white dark:text-black"
        onClick={() => reset()}
      >
        다시 시도
      </button>
    </div>
  );
}
