import type { ErrorCode } from "./code";
import type { ErrorDetails } from "./schema";

export type ErrorArgs<C extends ErrorCode> = {
  code: C;
  details: ErrorDetails[C];
  message?: string;
  cause?: unknown;
};

export class DomainError<C extends ErrorCode = ErrorCode> extends Error {
  public readonly code: C;
  public readonly details: ErrorDetails[C];
  public readonly cause?: unknown;

  constructor(args: ErrorArgs<C>) {
    super(args.message ?? args.code);
    this.name = "DomainError";
    this.code = args.code;
    this.details = args.details;
    this.cause = args.cause;
  }
}

export const isDomainError = <C extends ErrorCode>(
  e: unknown,
  code?: C
): e is DomainError<C> =>
  e instanceof DomainError && (!code || e.code === code);
