"use client";

import { usePathname } from "next/navigation";
import Navbar from "./NavigationBar";

export default function NavbarClient() {
  const pathname = usePathname();
  if (!pathname) return null;
  return pathname !== "/" ? <Navbar /> : null;
}
