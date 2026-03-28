"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import ProjectCard from "../cards/ProjectCard";
import { projects, type Project } from "../../data/projects";
import { useRouter } from "next/navigation";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const deckRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  function isProject(p: Project | undefined): p is Project {
    return Boolean(p);
  }

  // Select visible projects (3 + "more")
  const visibleProjects = (() => {
    const firstThree = projects.slice(0, 3);
    const more = projects.find((x) => x.slug === "more-projects");
    return [...firstThree, more].filter(isProject);
  })();

  // =========================
  // 🖥 DESKTOP CAROUSEL
  // =========================
  useEffect(() => {
    if (window.innerWidth < 1024) return;

    const section = sectionRef.current;
    const deck = deckRef.current;

    if (!section || !deck) return;

    const cards = Array.from(
      deck.querySelectorAll<HTMLDivElement>(".project-card"),
    );

    if (cards.length === 0) return;

    const ctx = gsap.context(() => {
      const radius = window.innerWidth * 0.3;
      const total = cards.length;
      const segment = 360 / total;

      // =========================
      // 🎯 SCENE SETUP
      // =========================

      // Move camera backward (so cards are not "in your face")
      // Enable true 3D transforms
      gsap.set(deck, {
        z: -window.innerWidth * 0.25,
        transformPerspective: 2500,
        transformStyle: "preserve-3d",
        transformOrigin: "50% 50%",
      });

      // =========================
      // 🎯 INITIAL CARD PLACEMENT
      // =========================

      // Arrange cards in a circular (carousel) layout
      // This is purely GEOMETRY (no blur / opacity here)
      for (let i = 0; i < cards.length; i++) {
        const card = cards[i];

        // Distribute evenly in circle, offset so a FACE (not edge) is centered
        const angle = (i / total) * Math.PI * 2 - Math.PI / 2 + Math.PI / total;

        const z = Math.cos(angle) * radius;

        gsap.set(card, {
          x: Math.sin(angle) * radius,
          z,
          rotationY: (angle * 180) / Math.PI,
          transformOrigin: "center center",
        });
      }
      // 🔥 Ensure depth is correct on first paint (no cold-load flat cards)
      requestAnimationFrame(() => {
        updateDepth();
      });

      // =========================
      // 🎯 DEPTH SYSTEM (CRITICAL)
      // =========================

      // This function controls:
      // - blur
      // - opacity
      // - scale
      // based on CURRENT rotation (not static z)
      //
      // IMPORTANT:
      // This is the ONLY source of truth for depth
      // Must be used consistently (no mixing with z-based blur)
      const updateDepth = () => {
        const deckRotation = gsap.getProperty(deck, "rotationY") as number;

        for (let i = 0; i < cards.length; i++) {
          const card = cards[i];

          // Base angle of card in degrees (matches initial placement)
          const baseAngle = (i / total) * 360 - 90 + 360 / total / 2;

          // Current angle after rotation
          const currentAngle = baseAngle + deckRotation;

          // Normalize to 0–360
          const normalized = ((currentAngle % 360) + 360) % 360;

          // Depth using cosine (front = 1, back = -1)
          const depth = Math.cos((normalized * Math.PI) / 180);

          // Visual mapping
          const blur = Math.max(0, (1 - depth) * 2.5);
          const scale = 0.9 + depth * 0.15;

          gsap.set(card, {
            filter: `blur(${blur}px)`,
            // opacity,
            scale,
          });
        }
      };

      // =========================
      // 🎯 SCROLL + TIMELINE
      // =========================

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=450%", // Controls "gear ratio" (scroll → rotation)
          scrub: 2.2, // Smooth interpolation (NOT speed)
          pin: true,
        },
      });

      // =========================
      // 🎬 PHASE 1: TITLE OUT + CARDS IN
      // =========================

      // 🔥 PERFECTLY SYNCHRONIZED REVEAL

      tl.to(
        "h2",
        {
          opacity: 0,
          y: -60,
          duration: 0.6,
          ease: "power2.out",
        },
        0,
      );

      tl.fromTo(
        cards,
        {
          opacity: 0,
          scale: 0.92,
        },
        {
          opacity: 1,
          scale: 1,
          stagger: 0.08,
          duration: 0.6,
          ease: "power2.out",
          onUpdate: updateDepth,
        },
        0,
      );

      // =========================
      // 🎬 PHASE 2: ROTATION
      // =========================

      // Rotate only (total - 1) segments
      // So we go from first card → last card (no loop back)
      //
      // IMPORTANT:
      // onStart ensures no visual jump between reveal and spin
      // onUpdate keeps blur/scale/opacity synced with rotation
      tl.to(
        deck,
        {
          rotationY: `-=${segment * (total - 1)}`,
          ease: "none",
          onStart: () => {
            updateDepth();
          },
          onUpdate: updateDepth,
        },
        0.45,
      );
    }, section);

    return () => ctx.revert();
  }, []);

  // =========================
  // 📱 MOBILE (ALTERNATING CARDS)
  // =========================
  useEffect(() => {
    if (window.innerWidth >= 1024) return;

    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll(".mobile-card");

    gsap.fromTo(
      cards,
      {
        opacity: 0,
        y: 40,
        scale: 0.97,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.12,
      },
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full flex flex-col items-center py-[12vh] px-5"
    >
      <div className="flex flex-col items-center gap-[clamp(3rem,8vh,6rem)] w-full">
        <h2 className="text-[clamp(2.5rem,4.5vw,4rem)] text-white">
          Our Projects
        </h2>

        {/* DESKTOP */}
        <div
          ref={deckRef}
          className="hidden lg:flex relative w-full max-w-[1200px] h-[70vh] items-start justify-center"
        >
          {visibleProjects.map((p, i) => {
            const img = p.gallery?.[0] ?? p.image ?? "/images/placeholder.png";

            return (
              <div
                key={p.slug}
                className="project-card absolute 
w-[min(11vw,14vh)] 
h-[min(26vh,34vw)]
cursor-pointer"
                onClick={() =>
                  router.push(
                    p.slug === "more-projects"
                      ? "/projects"
                      : `/projects/${p.slug}`,
                  )
                }
              >
                <ProjectCard
                  title={p.title}
                  image={img}
                  index={i}
                  descriptionLine1={p.category ?? ""}
                  descriptionLine2={[p.location, p.year]
                    .filter(Boolean)
                    .join(" • ")}
                />
              </div>
            );
          })}
        </div>

        {/* MOBILE */}
        <div className="w-full lg:hidden flex flex-col gap-5 sm:gap-6">
          {visibleProjects.map((p) => {
            const img = p.gallery?.[0] ?? p.image ?? "/images/placeholder.png";

            return (
              <div
                key={p.slug}
                onClick={() =>
                  router.push(
                    p.slug === "more-projects"
                      ? "/projects"
                      : `/projects/${p.slug}`,
                  )
                }
                className="
mobile-card
w-full 
rounded-xl 
border border-white/10 
bg-white/5 
backdrop-blur-sm 
px-1 py-1 
transition-all duration-300 
active:scale-[0.98]
cursor-pointer
"
              >
                {/* IMAGE */}
                <div className="w-full aspect-[3/2] relative overflow-hidden rounded-lg">
                  <Image
                    src={img}
                    alt={p.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover"
                  />
                </div>

                {/* TEXT */}
                <div className="px-4 py-3 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-white text-lg font-medium">
                      {p.title}
                    </span>
                    <span className="text-white/50 text-sm">
                      {[p.location, p.year].filter(Boolean).join(" • ")}
                    </span>
                  </div>

                  <span className="text-white/40 text-xl">→</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}