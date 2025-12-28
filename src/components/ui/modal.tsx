"use client";

import { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/helpers";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  className?: string;
};

export function Modal({
  open,
  onClose,
  title,
  children,
  className,
}: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50">
      {/* backdrop */}
      <button
        aria-label="Close modal"
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      {/* sheet */}
      <div
        role="dialog"
        aria-modal="true"
        className={cn(
          "absolute left-1/2 top-1/2 w-[95vw] max-w-md -translate-x-1/2 -translate-y-1/2",
          "rounded-2xl bg-white shadow-xl border border-[#E4E6EF] overflow-hidden",
          className
        )}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <div className="text-base font-medium">{title ?? "Filters"}</div>
          <button
            onClick={onClose}
            className="h-9 w-9 grid place-items-center rounded-md hover:bg-black/5"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="max-h-[80vh] overflow-auto p-4">{children}</div>
      </div>
    </div>,
    document.body
  );
}
