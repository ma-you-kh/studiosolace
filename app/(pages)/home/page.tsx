"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

import HeroSection from "../../components/sections/HeroSection";
import ProjectsSection from "../../components/sections/ProjectsSection";
import ExpertiseSection from "../../components/sections/ExpertiseSection";
import OutroSection from "../../components/sections/OutroSection";
import SampleSection from "../../components/sections/SampleSection";
import HomeLogoPreloader from "../../components/animations/HomeLogoPreloader";

gsap.registerPlugin(ScrollTrigger);

export default function Page() {
  const [showPreloader, setShowPreloader] = useState(true);
  const [startAnimation, setStartAnimation] = useState(false);

  // Record mount time so we can schedule an absolute start at TARGET_MS
  const mountTs = useRef<number | null>(null);
  const startTimeout = useRef<number | null>(null);

  useEffect(() => {
    mountTs.current = performance.now();

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);
    window.addEventListener("load", () => ScrollTrigger.refresh());

    return () => {
      window.removeEventListener("resize", onResize);
      if (startTimeout.current) {
        window.clearTimeout(startTimeout.current);
      }
    };
  }, []);

  // TARGET: start appearance animation at this many milliseconds from mount
  const TARGET_START_MS = 2000;

  const handlePreloaderComplete = () => {
    // compute elapsed time since mount
    const now = performance.now();
    const elapsed = mountTs.current ? now - mountTs.current : 0;
    // how much time remaining until TARGET_START_MS
    const delayAfterPreloader = Math.max(0, TARGET_START_MS - elapsed); // ms
    const delaySeconds = delayAfterPreloader / 1000;

    // hide preloader immediately
    setShowPreloader(false);

    // Fade the overall content in starting at the target time
    gsap.to("#home-content", {
      opacity: 1,
      duration: 1,
      ease: "power2.out",
      delay: delaySeconds, // seconds
    });

    // Start the hero animations at the target time
    startTimeout.current = window.setTimeout(() => {
      setStartAnimation(true);
    }, delayAfterPreloader);
  };

  return (
    <main className="relative w-full overflow-visible bg-transparent">
      {showPreloader && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black">
          <HomeLogoPreloader onComplete={handlePreloaderComplete} />
        </div>
      )}

      {/* content starts hidden (opacity-0) and will fade in at TARGET_START_MS */}
      <div id="home-content" className="opacity-0">
        <HeroSection startAnimation={startAnimation} />

        {/* 👇 add these IDs */}
        <section id="projects">
          <ProjectsSection />
        </section>

        <section id="expertise">
          <ExpertiseSection />
        </section>

        <SampleSection />
        <OutroSection />
      </div>
    </main>
  );
}
