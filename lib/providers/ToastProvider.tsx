"use client";

import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          padding: "12px 16px",
          borderRadius: "8px",
          fontSize: "14px",
        },
        success: {
          style: {
            background: "#d1fae5",
            color: "#065f46",
          },
        },
        error: {
          style: {
            background: "#fee2e2",
            color: "#991b1b",
          },
        },
      }}
    />
  );
}
