"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import ExpertiseCard from "../cards/ExpertiseCard";

gsap.registerPlugin(ScrollTrigger);

const expertise = [
  {
    id: 1,
    title: "Architecture",
    description:
      "Our architectural design process blends creativity, strategy, and collaboration to bring your vision to life. We deeply understand your goals, lifestyle, and brand before shaping concepts that unite form and function. Through innovative thinking and precise execution, we craft architecture that is visually compelling, efficient, and harmoniously connected to its context.",
    image: "/images/expertise/arch.jpg",
  },
  {
    id: 2,
    title: "3D Visualization",
    description:
      "At Solace Studio, 3D visualization transforms ideas into immersive, lifelike experiences. It allows spaces to be explored before execution, ensuring clarity, accuracy, and emotional connection. Through refined visuals, we communicate design intent, materiality, and atmosphere—supporting confident decisions and seamless collaboration.",
    image: "/images/expertise/3Dvz.jpg",
  },
  {
    id: 3,
    title: "Project Management & Coordination",
    description:
      "At Solace Studio, we manage every project with precision and professionalism—from concept to completion. Our team handles scheduling, budgeting, coordination, and on-site supervision, ensuring seamless execution and design integrity. With clear communication and attentive oversight, we make the entire process effortless, transparent, and rewarding for our clients.",
    image: "/images/expertise/pmc.jpg",
  },
  {
    id: 4,
    title: "Interior Design",
    description:
      "Interiors are where architecture meets everyday life—spaces that balance beauty with purpose. We design environments that are visually captivating yet effortlessly functional, from spatial flow to curated materials, textures, and lighting. Every detail is crafted to tell a story, evoke emotion, and leave a lasting impression through thoughtful, human-centered design.",
    image: "/images/expertise/intd.jpg",
  },
];

export default function ExpertiseSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const titleRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    // no cards.length check — let GSAP handle empty array
    if (!section) return;

    const ctx = gsap.context(() => {
      const cards = cardsRef.current;

      gsap.set(cards, { opacity: 0, y: 100 });

      if (titleRef.current) {
        gsap.from(titleRef.current, {
          opacity: 0,
          y: 80,
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            invalidateOnRefresh: true,
          },
        });

        gsap.to(titleRef.current, {
          yPercent: -20,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
            invalidateOnRefresh: true,
          },
        });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=180%",
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(cards, {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out",
      })
        .to({}, { duration: 0.15 })
        .to(cards, {
          y: -100,
          opacity: 0,
          stagger: { each: 0.2, from: "end" },
          duration: 1,
          ease: "power3.in",
        });
    }, section);

    return () => ctx.revert();
  }, []); // same deps (run once)

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen flex flex-col items-center justify-center py-28 bg-transparent overflow-visible"
    >
      <h2
        ref={titleRef}
        className="text-5xl md:text-6xl font-light text-center mb-[5vh] text-white tracking-tight leading-[1.2]"
      >
        Our Expertise
      </h2>

      <div className="flex justify-center items-center gap-[2.5vw] w-full max-w-[90vw]">
        {expertise.map((item, i) => (
          <div
            key={item.id}
            ref={(el) => {
              if (el) cardsRef.current[i] = el;
            }}
            className="flex-shrink-0"
          >
            <ExpertiseCard
              title={item.title}
              description={item.description}
              image={item.image}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
