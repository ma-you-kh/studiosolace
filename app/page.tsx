"use client";

import React, { useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";

export default function RootEntryPage() {
  const router = useRouter();
  const buttonRef = useRef<HTMLDivElement>(null);
  const hoverTween = useRef<gsap.core.Tween | null>(null);

  const initMarquee = (wrapper: HTMLDivElement) => {
    const inner = wrapper.querySelector(".marquee-inner");
    if (!inner) return;

    const clone = inner.cloneNode(true);
    wrapper.appendChild(clone);

    const totalWidth = inner.scrollWidth;
    const startSpeed = 50;
    const endSpeed = 2;
    const transitionDuration = 2;
    const state = { speed: startSpeed };

    let x = 0;
    let rafId: number;

    const animate = () => {
      x -= state.speed;
      wrapper.style.transform = `translate3d(${x % -totalWidth}px, 0, 0)`;
      rafId = requestAnimationFrame(animate);
    };

    animate();

    gsap.to(state, {
      speed: endSpeed,
      duration: transitionDuration,
      ease: "power3.out",
    });

    return () => cancelAnimationFrame(rafId);
  };

  useEffect(() => {
    gsap.fromTo(
      buttonRef.current,
      { scale: 0, opacity: 0, rotate: -180 },
      { scale: 1, opacity: 1, rotate: 0, duration: 1.2, ease: "power4.out" }
    );

    const wrappers = document.querySelectorAll<HTMLDivElement>(".marquee-wrapper");
    const cleanups = Array.from(wrappers).map((wrapper) => initMarquee(wrapper));

    return () => {
      cleanups.forEach((cleanup) => cleanup && cleanup());
    };
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
    hoverTween.current = gsap.to(buttonRef.current, {
      rotation: "+=10",
      duration: 0.6,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1,
    });
  };

  const handleMouseLeave = () => {
    hoverTween.current?.kill();
    gsap.to(buttonRef.current, { rotation: 0, duration: 0.4, ease: "power2.out" });
  };

  return (
    <main className="relative flex items-center justify-center min-h-screen bg-black overflow-hidden text-white">
      {/* === Visible fading edges (separate left + right overlays) === */}
      <div className="pointer-events-none absolute inset-0 z-10">
        {/* Left fade */}
        <div className="absolute left-0 top-0 h-full w-[10vw] bg-gradient-to-r from-black to-transparent" />
        {/* Right fade */}
        <div className="absolute right-0 top-0 h-full w-[10vw] bg-gradient-to-l from-black to-transparent" />
      </div>

      {/* === 4 Rows of Scrolling Text === */}
      <div className="absolute inset-0 flex flex-col justify-between z-0">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="w-full border-t border-white/20 overflow-hidden">
            <div className="marquee-wrapper flex whitespace-nowrap w-max will-change-transform">
              <div className="marquee-inner flex text-[10vw] font-light tracking-widest opacity-40">
                {Array.from({ length: 10 }).map((_, j) => (
                  <span key={j} className="px-[3vw]">
                    STUDIO SOLACE
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* === Center Circle Button === */}
      <div
        ref={buttonRef}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative w-[140px] h-[140px] cursor-pointer flex items-center justify-center rounded-full bg-white text-black shadow-[0_0_25px_rgba(255,255,255,0.2)] z-20"
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
