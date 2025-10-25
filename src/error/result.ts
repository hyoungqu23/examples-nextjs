import type { DomainError } from "./domain-error";

export type Success<T> = { ok: true; data: T };
export type Failure = { ok: false; error: DomainError };
export type Result<T> = Success<T> | Failure;

export const actionFailure = (error: DomainError): Failure => ({
  ok: false,
  error,
});
export const actionSuccess = <T>(data: T): Success<T> => ({ ok: true, data });
