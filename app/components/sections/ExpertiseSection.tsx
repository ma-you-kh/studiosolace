//Expertise

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
  const [activeCard, setActiveCard] = React.useState<number | null>(null);
  const popupRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    // no cards.length check — let GSAP handle empty array
    if (!section) return;
    if (window.innerWidth < 1024) return;

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

  useEffect(() => {
  if (window.innerWidth >= 1024) return;

  if (activeCard !== null) {
    if (!overlayRef.current || !popupRef.current) return;

    // Overlay fade in
    gsap.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: "power2.out" }
    );

    // Popup animation
    gsap.fromTo(
      popupRef.current,
      { scale: 0.92, y: 40, opacity: 0 },
      {
        scale: 1,
        y: 0,
        opacity: 1,
        duration: 0.4,
        ease: "power3.out",
      }
    );

    // Parallax
    const img = popupRef.current.querySelector("img");

    let tween: gsap.core.Tween | null = null;

    if (img) {
      tween = gsap.to(img, {
        scale: 1.1,
        duration: 6,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    }

    return () => {
      tween?.kill();
    };
  } else {
    // ✅ SAFE EXIT
    if (!overlayRef.current) return;

    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.2,
      ease: "power2.in",
    });
  }
}, [activeCard]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen flex flex-col items-center justify-center py-[10vh] sm:py-[12vh] px-5 sm:px-8 bg-transparent overflow-visible"
    >
      <div className="flex flex-col items-stretch justify-center space-y-[clamp(2rem,6vh,4rem)] w-full">
        <h2
          ref={titleRef}
          className="text-[clamp(3.0rem,4.5vw,3.8rem)] font-light text-center text-white tracking-tight leading-[1.2]"
        >
          Our Expertise
        </h2>

        {/* MOBILE GRID */}
        <div className="grid grid-cols-2 gap-5 sm:gap-6 w-full lg:hidden">
          {expertise.map((item, i) => {
            const isActive = activeCard === i;

            return (
              <div
                key={item.id}
                className={`rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden transition-all duration-300 ${
                  isActive ? "bg-white/10 border-white/20" : ""
                }`}
              >
                {/* HEADER */}
                <button
                  onClick={() => setActiveCard(i)}
                  className="w-full text-left"
                >
                  {/* IMAGE */}
                  <div className="w-full aspect-square relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* TITLE */}
                  <div className="px-4 py-3 flex items-center justify-between">
                    <span className="text-white text-lg">{item.title}</span>
                    <span
                      className={`text-white/50 transition-transform ${
                        isActive ? "rotate-180" : ""
                      }`}
                    >
                      ⌄
                    </span>
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* DESKTOP (UNCHANGED) */}
      <div className="hidden lg:flex justify-center items-center gap-[2.5vw] w-full max-w-[90vw]">
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
      {activeCard !== null && (
        <div
          ref={overlayRef}
          onClick={() => setActiveCard(null)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-md lg:hidden"
        >
          <div
            ref={popupRef}
            onClick={(e) => e.stopPropagation()}
            className="w-[90%] max-w-md rounded-2xl overflow-hidden border border-white/10 bg-white/10 backdrop-blur-lg shadow-xl"
          >
            {/* Image */}
            <div className="w-full aspect-[4/3] relative">
              <img
                style={{ transform: "scale(1.05)" }}
                src={expertise[activeCard].image}
                alt={expertise[activeCard].title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="px-5 py-5">
              <h3 className="text-white text-xl mb-3">
                {expertise[activeCard].title}
              </h3>

              <p className="text-white/70 text-sm leading-relaxed">
                {expertise[activeCard].description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
