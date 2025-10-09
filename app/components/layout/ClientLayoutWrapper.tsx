"use client";

import { useEffect, useState } from "react";
import Navbar from "./NavigationBar";

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [navHeight, setNavHeight] = useState(0);

  useEffect(() => {
    const updateHeight = () => {
      const navbar = document.getElementById("main-navbar");
      if (navbar) setNavHeight(navbar.offsetHeight);
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* Navbar fixed at top */}
      <Navbar />

      {/* Page content with dynamic top padding */}
      <div style={{ paddingTop: navHeight }}>
        {children}
      </div>
    </>
  );
}
