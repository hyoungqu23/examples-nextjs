import { handleError } from "./handler";

export const guarded = <T extends unknown[]>(
  fn: (...args: T) => Promise<unknown>
) => {
  return async (...args: T): Promise<void> => {
    try {
      await fn(...args);
    } catch (error) {
      handleError(error);
    }
  };
};
