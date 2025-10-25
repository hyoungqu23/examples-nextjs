export const toast = {
  error: (message: string) => {
    // Demo toast fallback. Replace with your UI lib.
    if (typeof window !== "undefined") {
      alert(message);
    } else {
      console.error("[toast.error]", message);
    }
  },
};
