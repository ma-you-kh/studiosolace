"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function HomeLogoPreloader({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const svgEl = svgRef.current;
    const container = containerRef.current;
    if (!svgEl || !container) return;

    const paths = svgEl.querySelectorAll<SVGPathElement>("path");

    // --- Step 1: Hide strokes before animation ---
    paths.forEach((path) => {
      const length = path.getTotalLength();
      path.style.strokeDasharray = `${length}`;
      path.style.strokeDashoffset = `${length}`;
      path.style.visibility = "visible";
    });

    // --- Step 2: Build timeline ---
    const tl = gsap.timeline({ defaults: { ease: "power1.inOut" } });

    // Small delay to prevent "flash" while preparing DOM
    tl.set(svgEl, { opacity: 1 });

    // --- Step 3: Animate path drawing ---
    paths.forEach((path, i) => {
      tl.to(
        path,
        {
          strokeDashoffset: 0,
          duration: 1.4,
        },
        i * 0.4 // slight stagger
      );
    });

    // --- Step 4: Move SVG to navbar logo position ---
    tl.add(() => {
      const navbarLogo =
        document.querySelector<HTMLImageElement>("#navbarLogo");
      if (!navbarLogo || !svgEl) return;

      const svgBox = svgEl.getBoundingClientRect();
      const logoBox = navbarLogo.getBoundingClientRect();

      // Calculate translation and scale
      const dx =
        logoBox.left + logoBox.width / 2 - (svgBox.left + svgBox.width / 2);
      const dy =
        logoBox.top + logoBox.height / 2 - (svgBox.top + svgBox.height / 2);
      const scale = logoBox.width / svgBox.width;

      gsap.to(svgEl, {
        x: dx,
        y: dy,
        scale,
        transformOrigin: "center center",
        duration: 1.2,
        ease: "power4.inOut",
        onStart: () => {
          navbarLogo.style.opacity = "0";
        },
        onComplete: () => {
          navbarLogo.style.opacity = "1";
          gsap.to(container, {
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
            onComplete,
          });
        },
      });
    });
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 flex items-center justify-center bg-black z-[9999]"
      style={{ pointerEvents: "none" }}
    >
      <svg
        ref={svgRef}
        width="420"
        height="420"
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        stroke="white"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        // Hide by default until JS animates
        style={{ opacity: 0, visibility: "visible" }}
      >
        <path d="M370.311 156.661c-2.4209.7413-77.5507 22.382-80.1003 23.1627.1114 49.902.2633 117.969.3736 167.377-2.1516-.6017-41.9955-11.7445-44.0859-12.3291-.1107-54.6625-1.0152-126.369-1.1269-181.555-2.4404-.6441-97.3726-25.8579-99.7476-26.4847h0v251.752H57.4523h88.1717" />
        <path d="M189.71 211.581v165.191c0 1.0007.8112 1.8119 1.8119 1.8119h174.531v-.0047s2.2162-220.139 2.2162-220.139c.0125-1.2406 1.24-2.102 2.4109-1.6918l87.2659 30.5705c.7302.2558 1.2174.947 1.2128 1.7207l-1.1132 189.58" />
        <path d="M77.5056 375.8399L77.5056 299.6752L112.8122 295.655L112.8122 377.3785M407.1504 277.336L407.3372 221.2898L424.6511 227.3643L424.6511 277.336M143.0935 125.6771L67.3795 147.3209" />
      </svg>
    </div>
  );
}
