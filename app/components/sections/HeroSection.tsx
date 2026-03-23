"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  startAnimation: boolean;
};

export default function HeroSection({ startAnimation }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!startAnimation) return;

    const section = sectionRef.current;
    const image = imageRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.set(".hero-line", { opacity: 0, y: 80 });

      gsap.to(".hero-line", {
        opacity: 1,
        y: 0,
        duration: 1.4,
        ease: "power3.out",
        stagger: 0.25,
      });

      gsap.to(".hero-headline", {
        yPercent: -15,
        ease: "none",
        scrollTrigger: {
          trigger: ".panel-1",
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      gsap.to(".flow-gradient", {
        backgroundPosition: "200% center",
        duration: 6,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      if (image) {
        gsap.to(image, {
          rotateZ: -15,
          rotateX: -5,
          scale: 3,
          ease: "none",
          scrollTrigger: {
            trigger: ".panel-2",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      gsap.from(".panel-2 h2, .panel-2 p", {
        opacity: 0,
        y: 60,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: ".panel-2",
          start: "top 80%",
        },
      });
    }, section);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [startAnimation]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-visible text-white select-none px-5 sm:px-8 lg:px-0"
    >
      {/* PANEL 1 — Hero */}
      <div className="panel-1 relative flex items-start justify-center h-[100svh] lg:h-screen">
        <div
          className="hero-headline text-center font-light leading-[1.1] lg:translate-y-[calc(55vh-70%)]"
          style={{ transform: "translateY(calc(55vh - 70%))" }}
        >
          <h1 className="hero-line opacity-0 translate-y-10 text-5xl md:text-7xl lg:text-8xl tracking-tight">
            Designing{" "}
            <span
              className="flow-gradient inline-block bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(270deg, #6ee7b7, #3b82f6, #a78bfa, #ec4899, #f59e0b, #6ee7b7)",
                backgroundSize: "200% auto",
                backgroundPosition: "0% center",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                lineHeight: "1.1em",
                filter: "brightness(1.1) saturate(1.0)",
              }}
            >
              Spaces
            </span>
            ,
          </h1>

          <h1 className="hero-line opacity-0 translate-y-10 text-5xl md:text-7xl lg:text-8xl tracking-tight mt-4">
            Creating{" "}
            <span
              className="flow-gradient inline-block bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(270deg, #fcd34d, #f472b6, #60a5fa, #34d399, #a78bfa, #fcd34d)",
                backgroundSize: "200% auto",
                backgroundPosition: "0% center",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                lineHeight: "1.1em",
                filter: "brightness(1.1) saturate(1.0)",
              }}
            >
              Joy!
            </span>
          </h1>
        </div>
      </div>

      {/* PANEL 2 — Background image with black fade */}
      <div className="panel-2 relative flex flex-col items-center justify-center h-[100svh] lg:h-screen text-center overflow-hidden">
        {/* Background image */}
        <Image
          ref={imageRef}
          src="/images/bgimgx.png"
          alt="Architecture"
          fill
          className="absolute inset-0 object-cover z-[1] opacity-90"
          priority // ✅ ensures background loads fast (important for hero sections)
          sizes="100vw" // ✅ helps Next.js serve correct image size
        />

        {/* Black fade overlay */}
        <div className="absolute bottom-0 left-0 w-full h-[40%] bg-gradient-to-b from-transparent to-black z-[2] pointer-events-none" />

        {/* Content */}
        <div className="relative z-[3] max-w-4xl px-4 sm:px-0">
          <h2 className="text-5xl md:text-6xl font-light mb-6">
            Welcome to Solace Studio
          </h2>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
            At Solace Studio, architecture and interiors come together with
            quiet precision. We design spaces that embody character, balance,
            and timeless sophistication. <br />
            <br />
            Every project reflects a seamless dialogue between form and feeling
            — environments crafted to inspire, comfort, and endure.
          </p>
        </div>
      </div>
    </section>
  );
}