"use client";

import "react-toastify/dist/ReactToastify.css";
import Toast from "./toast";

interface ToastProviderProps {
  children: React.ReactNode;
}

export default function ToastProvider({ children }: ToastProviderProps) {
  return (
    <>
      {children}
      <Toast />
    </>
  );
}
