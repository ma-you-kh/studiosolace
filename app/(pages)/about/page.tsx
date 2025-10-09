"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /** 🌿 Generic Fade + Rise Reveal */
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 80 },
          {
            opacity: 1,
            y: 0,
            duration: 1.4,
            ease: "power3.out",
            delay: i * 0.05,
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      /** 🌫 Parallax Drift for Titles and Quotes */
      gsap.utils.toArray<HTMLElement>(".parallax").forEach((el) => {
        gsap.to(el, {
          yPercent: -15,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            scrub: 1.2,
          },
        });
      });

      /** 🎞 Section Fade-In Rhythm */
      gsap.utils.toArray<HTMLElement>("section").forEach((section, i) => {
        gsap.from(section, {
          opacity: 0,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 90%",
          },
          delay: i * 0.1,
        });
      });

      /** 🧍‍♂️ Team Grid Staggered Entrance */
      const teamGrid = document.querySelector(".team-grid");
      if (teamGrid) {
        const cards = teamGrid.querySelectorAll(".team-card");

        gsap.from(cards, {
          opacity: 0,
          y: 60,
          duration: 1.2,
          stagger: 0.25, // delay between each card
          ease: "power3.out",
          scrollTrigger: {
            trigger: teamGrid,
            start: "top 80%",
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative z-10 flex flex-col items-center justify-center text-center text-white px-6 md:px-24 lg:px-48 pb-32 space-y-40"
      style={{
        paddingTop: "calc(55vh - 15%)",
      }}
    >
      {/* Section 1 — Intro */}
      <section className="max-w-4xl space-y-6">
        <h1 className="reveal parallax text-5xl md:text-7xl font-light tracking-tight leading-[1.1]">
          We design spaces that connect people, nature, and purpose.
        </h1>

        <p className="reveal text-lg md:text-xl text-gray-300 leading-relaxed">
          Our studio approaches architecture with a focus on simplicity,
          material honesty, and the human experience. Every project is crafted
          to engage with light, landscape, and emotion — creating spaces that
          are timeless, functional, and deeply personal.
        </p>
      </section>

      {/* Section 2 — Philosophy */}
      <section className="max-w-5xl space-y-6">
        <h2 className="reveal parallax text-3xl md:text-4xl font-light">
          Our Philosophy
        </h2>

        <p className="reveal text-lg md:text-xl text-gray-300 leading-relaxed">
          We believe that architecture should inspire calm, curiosity, and
          connection. Each design begins with listening — to people, place, and
          purpose — then evolves into spaces that breathe and belong.
        </p>
      </section>

      {/* Section 3 — Team */}
      <section className="max-w-6xl w-full">
        <h2 className="reveal parallax text-3xl md:text-4xl font-light mb-16">
          Our Team
        </h2>

        <div className="team-grid grid grid-cols-1 md:grid-cols-4 gap-16">
          {[
            {
              name: "Akash Thakran",
              role: "Principal Architect",
              img: "/images/profile/Akash.jpg",
            },
            {
              name: "Sakshi Chauhan",
              role: "Partner Architect",
              img: "/images/profile/Sakshi.jpg",
            },
            {
              name: "Anjali Thakran",
              role: "Operations Head",
              img: "/images/profile/Anjali.jpg",
            },
            {
              name: "Mayukh Biswas",
              role: "Web Design",
              img: "/images/profile/Mayukh.jpg",
            },
          ].map((member, i) => (
            <div
              key={i}
              className="team-card flex flex-col items-center text-center space-y-4"
            >
              <div className="w-48 h-48 overflow-hidden rounded-full bg-gray-800/50 relative">
                <Image
                  src={member.img}
                  alt={member.name}
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  sizes="(max-width: 768px) 150px, 192px"
                  priority={i < 2} // optionally prioritize top images
                />
              </div>
              <h3 className="text-2xl font-light">{member.name}</h3>
              <p className="text-gray-400">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4 — Closing */}
      <section className="max-w-4xl space-y-6">
        <p className="reveal parallax text-xl text-gray-300 italic">
          “Architecture should evoke emotion and create dialogue between people
          and place.”
        </p>
      </section>
    </div>
  );
}