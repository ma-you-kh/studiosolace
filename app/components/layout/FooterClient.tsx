"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";

export default function FooterClient() {
  const pathname = usePathname();
  if (!pathname) return null;
  return pathname !== "/" ? <Footer /> : null;
}
