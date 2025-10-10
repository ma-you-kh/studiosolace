"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import ProjectCard from "../cards/ProjectCard";
import { projects, type Project } from "../../data/projects";
import { useRouter } from "next/navigation";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const deckRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const router = useRouter();

  function isProject(p: Project | undefined): p is Project {
    return Boolean(p);
  }

  const visibleProjects = (() => {
    const firstThree = projects.slice(0, 3);
    const more = projects.find((x) => x.slug === "more-projects");
    return [...firstThree, more].filter(isProject);
  })();

  useEffect(() => {
    const section = sectionRef.current;
    const deck = deckRef.current;
    const title = titleRef.current;
    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];

    if (!section || !deck || !title || cards.length === 0) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      /* 🪄 Title fade-in */
      gsap.from(title, {
        opacity: 0,
        y: 80,
        duration: 1.4,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
        },
      });

      gsap.to(title, {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      /* 🃏 Deck setup */
      const overlap = 50;
      const baseZ = cards.length;
      gsap.set(deck, { transformPerspective: 1000 });
      gsap.set(cards, {
        position: "absolute",
        top: "50%",
        left: "50%",
        xPercent: -50,
        yPercent: -50,
        rotateY: 0,
        transformOrigin: "center center",
        willChange: "transform, opacity, filter",
      });

      cards.forEach((card, i) => {
        gsap.set(card, {
          x: (cards.length - i - 1) * overlap,
          zIndex: baseZ - i,
          scale: 1,
          opacity: 1,
          filter: "brightness(1)",
        });
      });

      /* 🧮 Measurements */
      const baseCardRect = cards[0].getBoundingClientRect();
      const baseCardW = baseCardRect.width;
      const gap = Math.max(120, window.innerWidth * 0.2);
      const n = cards.length;

      // --- helper functions ---
      const computeTotalTravel = (): number => {
        const currCardW = cards[0].getBoundingClientRect().width;
        return Math.round((n - 1) * (currCardW + gap));
      };

      // Compute exact deck translation needed in pixels
      const computeDeckFinalX = (multiplier = 1.5): number => {
  const totalTravel = computeTotalTravel();
  const viewportWidth = window.innerWidth;

  // Shift left just enough to move deck by (totalTravel × multiplier)
  // and keep the last card nicely exiting the viewport.
  const requiredX = -(totalTravel * multiplier - viewportWidth / 2);
  return Math.round(requiredX);
};

      /* --- Phase 1: Fan Out --- */
      const fanOutTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "center center",
          scrub: 1.5,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      cards.forEach((card, i) => {
        const targetX = i * (baseCardW + gap);
        const scale = 1 - i * 0.05;
        const brightness = 1 - i * 0.1;

        fanOutTl.to(
          card,
          {
            x: targetX,
            scale,
            filter: `brightness(${brightness})`,
            ease: "power2.out",
            duration: 1.2,
          },
          0
        );
      });

      /* --- Phase 2: Horizontal Scroll --- */
      const horizontalTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${Math.abs(computeDeckFinalX())}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onRefresh: () => {
            const total = computeTotalTravel();
            const finalX = computeDeckFinalX();
            console.log("totalTravel:", total, "finalX:", finalX);
          },
          onUpdate: () => {
            const viewportCenterX = window.innerWidth / 2;
            const info = cards.map((cardEl, idx) => {
              const r = cardEl.getBoundingClientRect();
              const centerX = r.left + r.width / 2;
              const dist = Math.abs(centerX - viewportCenterX);
              return { idx, dist };
            });

            info.sort((a, b) => a.dist - b.dist);
            const ZBASE = 2000;
            info.forEach((item, sortIndex) => {
              cards[item.idx].style.zIndex = String(ZBASE - sortIndex * 10);
            });

            cards.forEach((cardEl, index) => {
              const r = cardEl.getBoundingClientRect();
              const centerX = r.left + r.width / 2;
              const distFromCenter = Math.abs(centerX - viewportCenterX);
              const norm = gsap.utils.clamp(
                0,
                1,
                distFromCenter / (window.innerWidth * 0.6)
              );

              const scale = 1.15 - norm * 0.45;
              const zDepth = (1 - norm) * 800 - 400;
              const relativeDepth = info.findIndex((i) => i.idx === index);
              const DEPTH_DIM = 0.16;
              const NORM_DIM = 0.4;

              let finalBrightness =
                1 - relativeDepth * DEPTH_DIM - norm * NORM_DIM;
              finalBrightness = Math.max(0.28, Math.min(1, finalBrightness));

              const shadowIntensity = 0.6 - norm * 0.5;
              const boxShadow = `0 10px ${
                30 * Math.max(0.08, shadowIntensity)
              }px rgba(0,0,0,${0.35 + 0.25 * norm})`;

              gsap.to(cardEl, {
                scale,
                z: zDepth,
                filter: `brightness(${finalBrightness})`,
                boxShadow,
                duration: 0.12,
                overwrite: true,
                ease: "power4.out",
              });
            });
          },
        },
      });

      // 🧭 Translate deck left exactly by measured distance
      horizontalTl.to(deck, {
        x: () => computeDeckFinalX(),
        ease: "none",
      });

      // Title exits
      horizontalTl.to(
        title,
        {
          x: () => -window.innerWidth * 0.5,
          opacity: 0,
          ease: "power3.inOut",
        },
        ">-0.4"
      );
    }, section);

    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full flex flex-col items-center justify-center py-[15vh] px-6 bg-transparent overflow-hidden relative"
    >
      <h2
        ref={titleRef}
        className="text-5xl md:text-6xl font-light text-white text-center mb-10 tracking-tight leading-[1.2]"
      >
        Our Projects
      </h2>

      <div
        ref={deckRef}
        className="relative w-full max-w-[200vw] h-[60vh] flex items-center justify-center"
      >
        {visibleProjects.map((p, i) => {
          const cardImage =
            p.gallery && p.gallery.length > 0
              ? p.gallery[0]
              : (p.image ?? "/images/placeholder.png");
          const desc1 = p.category ?? "";
          const desc2 = [p.location, p.year].filter(Boolean).join(" • ");

          return (
            <div
              key={p.id ?? p.slug}
              ref={(el) => {
                if (el) cardRefs.current[i] = el;
              }}
              className="w-[340px] md:w-[420px] cursor-pointer transition-transform"
              onClick={() => {
                if (p.slug === "more-projects") {
                  router.push("/projects");
                } else {
                  window.location.href = `/projects/${encodeURIComponent(
                    p.slug
                  )}`;
                }
              }}
            >
              <ProjectCard
                title={p.title}
                image={cardImage}
                index={i}
                descriptionLine1={desc1}
                descriptionLine2={desc2}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
