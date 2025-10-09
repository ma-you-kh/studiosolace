"use client";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";

interface ExpertiseCardProps {
  title: string;
  description: string;
  image: string; // ✅ add image prop
}

const ExpertiseCard: React.FC<ExpertiseCardProps> = ({
  title,
  description,
  image,
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const descRef = useRef<HTMLParagraphElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null); // ✅ new ref for background

  useEffect(() => {
    const card = cardRef.current;
    const title = titleRef.current;
    const desc = descRef.current;
    const overlay = overlayRef.current;
    const bg = bgRef.current;

    if (!card || !title || !desc || !overlay || !bg) return;

    // Initial states
    gsap.set(desc, {
      opacity: 0,
      y: 10,
      display: "none", // fully hidden from layout
    });
    gsap.set(overlay, { backgroundColor: "rgba(0,0,0,0.25)" });
    gsap.set(title, { y: 0 });
    gsap.set(bg, { scale: 1, filter: "brightness(1)" }); // ✅ initial background state

    const onEnter = () => {
      // Ensure desc visible for height measurement
      gsap.set(desc, { display: "block", opacity: 0, y: 10 });
      const descHeight = desc.offsetHeight || 0;
      const shiftAmount = Math.min(descHeight * 0.9, 70); // soft clamp

      const tl = gsap.timeline({
        defaults: { ease: "expo.out", duration: 0.6 },
      });

      // Title up
      tl.to(title, { y: -shiftAmount }, 0);

      // Desc reveal
      tl.to(
        desc,
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
        0.05
      );

      // Overlay darken
      tl.to(overlay, { backgroundColor: "rgba(0,0,0,0.45)", duration: 0.5 }, 0);

      // ✅ Background zoom and brighten
      tl.to(
        bg,
        {
          scale: 1.08,
          filter: "brightness(0.3)",
          duration: 0.6,
          ease: "power3.out",
        },
        0
      );
    };

    const onLeave = () => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.inOut", duration: 0.5 },
      });

      // Hide desc first
      tl.to(desc, {
        opacity: 0,
        y: 10,
        duration: 0.4,
        onComplete: () => {
          gsap.set(desc, { display: "none" });
        },
      });

      // Title return
      tl.to(title, { y: 0, duration: 0.55 }, "-=0.2");

      // Overlay lighten
      tl.to(overlay, { backgroundColor: "rgba(0,0,0,0.25)", duration: 0.4 }, 0);

      // ✅ Background reset
      tl.to(
        bg,
        {
          scale: 1,
          filter: "brightness(1)",
          duration: 0.5,
          ease: "power2.inOut",
        },
        0
      );
    };

    card.addEventListener("mouseenter", onEnter);
    card.addEventListener("mouseleave", onLeave);

    return () => {
      card.removeEventListener("mouseenter", onEnter);
      card.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="expertise-card relative w-[20vw] h-[60vh] border border-gray-500 rounded-md overflow-hidden 
                 shadow-lg bg-white/5 backdrop-blur-sm cursor-pointer transition-transform duration-500 hover:-translate-y-[0.6vh]"
    >
      {/* ✅ Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 bg-cover bg-center z-0 transition-transform duration-500"
        style={{ backgroundImage: `url(${image})` }}
      />

      {/* Overlay */}
      <div ref={overlayRef} className="absolute inset-0 z-[1]" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-[1.8vw] text-left z-[2]">
        <h3
          ref={titleRef}
          className="text-[1.6vw] font-semibold text-white leading-tight mb-[0.4vw]"
        >
          {title}
        </h3>

        <p
          ref={descRef}
          className="text-gray-300 text-[0.9vw] leading-relaxed will-change-transform"
        >
          {description}
        </p>
      </div>
    </div>
  );
};

export default ExpertiseCard;
