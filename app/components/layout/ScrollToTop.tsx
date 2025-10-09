"use client";

declare global {
  interface Window {
    lenis?: import("@studio-freight/lenis").default;
  }
}

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // Wait a bit for Lenis to initialize
    const timeout = setTimeout(() => {
      const lenis = window.lenis;
      if (lenis && typeof lenis.scrollTo === "function") {
        // Smoothly scroll to top (using Lenis)
        lenis.scrollTo(0, { immediate: false });
      } else {
        // fallback
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, 300); // slight delay for route transition

    return () => clearTimeout(timeout);
  }, [pathname]);

  return null;
}