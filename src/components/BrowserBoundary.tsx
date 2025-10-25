"use client";

import { handleError } from "@/error/handler";
import { useEffect } from "react";

export const BrowserBoundary = () => {
  useEffect(() => {
    const errorHandler = (event: ErrorEvent) =>
      handleError(event.error, { ux: "none" });
    const rejectionHandler = (event: PromiseRejectionEvent) =>
      handleError(event.reason, { ux: "none" });

    window.addEventListener("error", errorHandler);
    window.addEventListener("unhandledrejection", rejectionHandler);

    return () => {
      window.removeEventListener("error", errorHandler);
      window.removeEventListener("unhandledrejection", rejectionHandler);
    };
  }, []);

  return null;
};
