"use client";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";

interface SampleCardProps {
  title: string;
  image: string;
  onClick: () => void;
}

const SampleCard: React.FC<SampleCardProps> = ({ title, image, onClick }) => {
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const overlay = card.querySelector(".overlay") as HTMLDivElement;
    const titleEl = card.querySelector(".title") as HTMLHeadingElement;
    const bg = card.querySelector(".bg") as HTMLDivElement;

    gsap.set(overlay, { backgroundColor: "rgba(0,0,0,0.25)" });

    const ctx = gsap.context(() => {
      card.addEventListener("mouseenter", () => {
        gsap.to(card, {
          scale: 1.04,
          boxShadow: "0 0 1.5vw rgba(255,255,255,0.15)",
          filter: "brightness(1.08)",
          duration: 0.25,
          ease: "power3.out",
        });
        gsap.to(bg, { scale: 1.08, duration: 0.3, ease: "power3.out" });
        gsap.to(overlay, { backgroundColor: "rgba(0,0,0,0.55)", duration: 0.25 });
        gsap.to(titleEl, { y: "-0.6vw", duration: 0.25, ease: "power3.out" });
      });

      card.addEventListener("mouseleave", () => {
        gsap.to(card, {
          scale: 1,
          boxShadow: "0 0 0 rgba(255,255,255,0)",
          filter: "brightness(1)",
          duration: 0.3,
          ease: "power3.inOut",
        });
        gsap.to(bg, { scale: 1, duration: 0.3, ease: "power3.inOut" });
        gsap.to(overlay, { backgroundColor: "rgba(0,0,0,0.25)", duration: 0.3 });
        gsap.to(titleEl, { y: 0, duration: 0.3, ease: "power3.inOut" });
      });
    }, card);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      className="relative w-full aspect-[3/4] border border-gray-500 rounded-md overflow-hidden 
                 shadow-lg bg-white/5 backdrop-blur-sm cursor-pointer transition-all duration-300"
    >
      <div
        className="bg absolute inset-0 bg-cover bg-center transition-transform duration-500"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className="overlay absolute inset-0 z-[1] transition-all duration-500" />
      <div className="absolute bottom-[4%] left-[5%] z-[2]">
        <h3 className="title text-[clamp(1.2rem,2vw,1.75rem)] font-semibold text-white transition-transform duration-500 ease-out">
          {title}
        </h3>
      </div>
    </div>
  );
};

export default SampleCard;
