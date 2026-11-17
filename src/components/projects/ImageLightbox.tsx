"use client";
// ──────────────────────────────────────────────────────────────
// src/components/projects/ImageLightbox.tsx
// A case-study image that opens full size on click.
//   • click the image → it enlarges over a dark backdrop
//   • click outside it, press Esc, or press the close button → it returns
//   • while open, page scrolling is locked and focus returns to the image
// ──────────────────────────────────────────────────────────────
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

export function ImageLightbox({
  src,
  alt,
  width,
  height,
  sizes,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes?: string;
}) {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const remote = src.startsWith("http");

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    closeBtn.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = () => {
    setOpen(false);
    trigger.current?.focus();
  };

  return (
    <>
      <button
        ref={trigger}
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Enlarge image: ${alt}`}
        className="group block w-full cursor-zoom-in rounded-sm text-left focus-visible:outline-offset-4"
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes ?? "(min-width: 1024px) 900px, 100vw"}
          unoptimized={remote}
          className="h-auto w-full rounded-sm transition-[opacity] duration-150 group-hover:opacity-90"
        />
        <span className="pointer-events-none mt-2 block font-mono text-micro text-fg-3 group-hover:text-accent">
          Click to enlarge
        </span>
      </button>

      <AnimatePresence>
        {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          className="fixed inset-0 z-[90] flex cursor-zoom-out items-center justify-center bg-bg/90 p-4 backdrop-blur-sm sm:p-8"
          onClick={close}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22, ease: EASE }}
        >
          <button
            ref={closeBtn}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              close();
            }}
            aria-label="Close enlarged image"
            className="absolute top-4 right-4 grid size-10 place-items-center rounded-[var(--radius-control)] border border-line-2 bg-bg text-fg-2 transition-colors duration-150 hover:border-accent hover:text-accent"
          >
            <X className="size-4" aria-hidden="true" />
          </button>
          {/* the picture itself: clicks here do not close the dialog */}
          <motion.div
            className="cursor-default"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 4 }}
            transition={{ duration: 0.32, ease: EASE }}
          >
            <Image
              src={src}
              alt={alt}
              width={width}
              height={height}
              sizes="95vw"
              unoptimized={remote}
              className="h-auto max-h-[88vh] w-auto max-w-[94vw] rounded-sm border border-line-2 bg-surface object-contain"
            />
          </motion.div>
        </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
