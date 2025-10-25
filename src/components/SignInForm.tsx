"use client";

import { signIn } from "@/app/actions/auth";
import { isDomainError } from "@/error/domain-error";
import { handleError } from "@/error/handler";
import { useState } from "react";

export const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<
    Record<string, string | undefined>
  >({});
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFieldErrors({});
    const result = await signIn({ email, password });
    setLoading(false);

    if (!result.ok) {
      handleError(result.error, {
        ux: (error) => {
          if (
            isDomainError(error, "VALIDATION") &&
            error.details?.fieldErrors
          ) {
            const fe = Object.fromEntries(
              Object.entries(error.details.fieldErrors).map(([k, v]) => [
                k,
                v?.[0],
              ])
            );
            setFieldErrors(fe);
          } else {
            alert(error.message);
          }
        },
        log: "none",
      });
      return;
    }

    alert(`환영합니다, ${result.data.name}! (userId: ${result.data.userId})`);
  };

  return (
    <form onSubmit={onSubmit} className="flex w-full max-w-sm flex-col gap-3">
      <label className="text-sm font-medium">Email</label>
      <input
        className="rounded border p-2"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
      />
      {fieldErrors.email && (
        <p className="text-xs text-red-600">{fieldErrors.email}</p>
      )}

      <label className="text-sm font-medium">Password</label>
      <input
        className="rounded border p-2"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="••••••••"
      />
      {fieldErrors.password && (
        <p className="text-xs text-red-600">{fieldErrors.password}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="mt-2 rounded bg-black px-4 py-2 text-white disabled:opacity-60 dark:bg-white dark:text-black"
      >
        {loading ? "Signing in…" : "Sign In"}
      </button>
    </form>
  );
};
