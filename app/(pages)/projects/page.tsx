"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { projects } from "../../data/projects";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function OurProjectsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const actualProjects = projects.filter((p) => p.slug !== "more-projects");

  useEffect(() => {
    const ctx = gsap.context(() => {
      /** 🌿 Soft reveal for text sections */
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: "power2.out",
            delay: i * 0.05,
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      /** 🎞 Optimized zig-zag tile animations */
      gsap.utils.toArray<HTMLElement>(".project-row").forEach((row, i) => {
        const imageWrap = row.querySelector(".image-wrap");
        const textWrap = row.querySelector(".text-wrap");

        const imageFrom = i % 2 === 0 ? "-200px" : "200px";
        const textFrom = i % 2 === 0 ? "200px" : "-200px";

        // Animate wrapper DIVS only — not heavy image layers
        gsap.fromTo(
          imageWrap,
          { x: imageFrom, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power4.out",
            force3D: true,
            autoRound: false,
            scrollTrigger: {
              trigger: row,
              start: "top 80%",
              end: "bottom 60%",
              toggleActions: "play reverse play reverse",
            },
          }
        );

        gsap.fromTo(
          textWrap,
          { x: textFrom, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.9,
            delay: 0.1,
            ease: "power4.out",
            force3D: true,
            autoRound: false,
            scrollTrigger: {
              trigger: row,
              start: "top 80%",
              end: "bottom 60%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      });

      ScrollTrigger.refresh();
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative z-10 flex flex-col items-center justify-center text-center text-white px-6 md:px-24 lg:px-48 pb-32 space-y-40"
      style={{ paddingTop: "calc(55vh - 15%)" }}
    >
      {/* Section 1 — Intro */}
      <section className="max-w-4xl space-y-6">
        <h1 className="reveal text-5xl md:text-7xl font-light tracking-tight leading-[1.1]">
          Our work shapes experiences that unite form, feeling, and function.
        </h1>
        <p className="reveal text-lg md:text-xl text-gray-300 leading-relaxed">
          From concept to completion, every project tells a story of context,
          craft, and collaboration. Here’s a glimpse into how we turn ideas into
          spaces that inspire.
        </p>
      </section>

      {/* Section 2 — Projects */}
      <section className="max-w-6xl w-full space-y-24">
        <h2 className="reveal text-3xl md:text-4xl font-light mb-[10vh]">
          Our Projects
        </h2>

        <div className="flex flex-col space-y-32">
          {actualProjects.map((p, i) => {
            const imageRight = i % 2 !== 0;
            const cardImage =
              p.gallery?.[0] ?? p.image ?? "/images/placeholder.png";
            const desc1 = p.category ?? "";
            const desc2 = [p.location, p.year].filter(Boolean).join(" • ");

            return (
              <div
                key={p.id}
                className={`project-row grid grid-cols-1 md:grid-cols-2 gap-10 items-center ${
                  imageRight ? "md:[direction:rtl]" : ""
                } cursor-pointer`}
                onClick={() =>
                  (window.location.href = `/projects/${encodeURIComponent(
                    p.slug
                  )}`)
                }
              >
                {/* Image Wrapper (Animated) */}
                <div
                  className={`image-wrap ${
                    imageRight ? "md:[direction:ltr]" : ""
                  } will-change-transform transform-gpu`}
                >
                  <div className="rounded-2xl overflow-hidden shadow-lg transform-gpu">
                    <Image
                      src={cardImage}
                      alt={p.title}
                      width={800} // ✅ specify width
                      height={600} // ✅ specify height
                      className="w-full h-96 object-cover select-none"
                      draggable={false}
                      priority={i < 2} // ✅ replaces loading="eager"
                      loading={i < 2 ? "eager" : "lazy"} // optional, Image handles this
                    />
                  </div>
                </div>

                {/* Text Wrapper (Animated) */}
                <div
                  className={`text-wrap text-left space-y-4 md:pl-8 ${
                    imageRight ? "md:text-right md:pl-0 md:pr-8" : ""
                  } will-change-transform transform-gpu`}
                >
                  <h3 className="text-2xl font-light">{p.title}</h3>
                  <p className="text-gray-400 text-lg">
                    {desc1 && <span>{desc1}</span>}
                    {desc1 && desc2 && <span> • </span>}
                    {desc2 && <span>{desc2}</span>}
                  </p>
                  {p.description && (
                    <p className="text-gray-500 leading-relaxed">
                      {p.description}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Section 3 — Closing Quote */}
      <section className="max-w-4xl space-y-6">
        <p className="reveal parallax text-xl text-gray-300 italic">
          “Design is the bridge between imagination and experience.”
        </p>
      </section>
    </div>
  );
}
