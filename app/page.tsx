"use client";

import React, { useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";

export default function RootEntryPage() {
  const router = useRouter();
  const buttonRef = useRef<HTMLDivElement>(null);
  const hoverTween = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    gsap.fromTo(
      buttonRef.current,
      { scale: 0, opacity: 0, rotate: -180 },
      { scale: 1, opacity: 1, rotate: 0, duration: 1.2, ease: "power4.out" }
    );
  }, []);

  const handleClick = () => {
    gsap.to(buttonRef.current, {
      rotate: 360,
      scale: 0,
      opacity: 0,
      duration: 1.2,
      ease: "power4.inOut",
      onComplete: () => router.push("/home"),
    });
  };

  const handleMouseEnter = () => {
    // Hover rotation effect (gentle oscillation)
    hoverTween.current = gsap.to(buttonRef.current, {
      rotation: "+=10",
      duration: 0.6,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1,
    });
  };

  const handleMouseLeave = () => {
    // Stop rotation and reset
    hoverTween.current?.kill();
    gsap.to(buttonRef.current, {
      rotation: 0,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  return (
    <main className="relative flex items-center justify-center min-h-screen text-white bg-black z-40">
      <div
        ref={buttonRef}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative w-[140px] h-[140px] cursor-pointer flex items-center justify-center rounded-full bg-white text-black shadow-[0_0_25px_rgba(255,255,255,0.2)]"
      >
        <div className="absolute w-4 h-4 bg-black rounded-full"></div>

        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
          <defs>
            <path
              id="circlePath"
              d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0"
            />
          </defs>
          <text fontSize="10" fontWeight="500" letterSpacing="3px" fill="black">
            <textPath href="#circlePath" startOffset="10" textLength="240">
              ENTER SOLACE ENTER SOLACE
            </textPath>
          </text>
        </svg>
      </div>
    </main>
  );
}
