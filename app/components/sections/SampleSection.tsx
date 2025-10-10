"use client";
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Draggable } from "gsap/dist/Draggable";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger, Draggable);

const samples = [
  {
    id: 1,
    title: "Electrical Drawing",
    image: "/images/samples/sample1_electrical.jpg",
  },
  {
    id: 2,
    title: "Presentation Drawing",
    image: "/images/samples/sample2_presentation.jpg",
  },
  {
    id: 3,
    title: "Elevation Drawing",
    image: "/images/samples/sample3_elevation.jpg",
  },
];

export default function SampleSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  // --- All existing GSAP logic unchanged ---
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=120%",
          pin: true,
          scrub: 0.4,
          anticipatePin: 1,
        },
      });
    }, section);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    cardsRef.current.forEach((card) => {
      if (!card) return;
      const overlay = card.querySelector(".overlay") as HTMLDivElement;
      const title = card.querySelector(".title") as HTMLHeadingElement;
      const bg = card.querySelector(".bg") as HTMLDivElement;

      gsap.set(overlay, { backgroundColor: "rgba(0,0,0,0.25)" });

      card.addEventListener("mouseenter", () => {
        gsap.to(card, {
          scale: 1.04,
          boxShadow: "0 0 1.5vw rgba(255,255,255,0.15)",
          filter: "brightness(1.08)",
          duration: 0.25,
          ease: "power3.out",
        });
        gsap.to(bg, { scale: 1.08, duration: 0.3, ease: "power3.out" });
        gsap.to(overlay, {
          backgroundColor: "rgba(0,0,0,0.55)",
          duration: 0.25,
          ease: "power3.out",
        });
        gsap.to(title, { y: "-0.6vw", duration: 0.25, ease: "power3.out" });
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
        gsap.to(overlay, {
          backgroundColor: "rgba(0,0,0,0.25)",
          duration: 0.3,
          ease: "power3.inOut",
        });
        gsap.to(title, { y: 0, duration: 0.3, ease: "power3.inOut" });
      });
    });
  }, []);

  useEffect(() => {
    if (!imgRef.current) return;
    const img = imgRef.current;
    let zoom = 1;

    const zoomImage = (e: WheelEvent) => {
      e.preventDefault();
      zoom += e.deltaY * -0.0015;
      zoom = Math.min(Math.max(zoom, 1), 4);
      gsap.to(img, { scale: zoom, duration: 0.3, ease: "power2.out" });
    };

    img.addEventListener("wheel", zoomImage, { passive: false });
    Draggable.create(img, { type: "x,y" });

    return () => {
      img.removeEventListener("wheel", zoomImage);
      Draggable.get(img)?.kill();
    };
  }, [selectedImage]);

  useEffect(() => {
    const preventTouch = (e: TouchEvent) => e.preventDefault();
    if (selectedImage) {
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      if (scrollbarWidth > 0)
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      document.addEventListener("touchmove", preventTouch, { passive: false });
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      document.removeEventListener("touchmove", preventTouch);
    }
    return () => document.removeEventListener("touchmove", preventTouch);
  }, [selectedImage]);

  const Popup = ({ src }: { src: string }) => {
    if (typeof window === "undefined") return null;
    const handleResetZoom = (e: React.MouseEvent<HTMLDivElement>) => {
      const target = e.target as HTMLElement;
      if (target.closest("button")) return;
      if (imgRef.current) {
        gsap.to(imgRef.current, {
          scale: 1,
          x: 0,
          y: 0,
          duration: 0.4,
          ease: "power2.out",
        });
      }
    };
    return createPortal(
      <div
        onClick={handleResetZoom}
        className="fixed inset-0 flex items-center justify-center bg-black/85 backdrop-blur-sm z-[100] p-[4vw]"
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSelectedImage(null);
          }}
          className="absolute top-[2vh] right-[3vw] text-white text-[clamp(1.5rem,3vw,2.5rem)] font-light hover:scale-110 transition-transform z-[10000]"
        >
          ✕
        </button>

        <Image
          ref={imgRef}
          src={src}
          alt="Sample"
          width={1200}
          height={800}
          className="shadow-xl object-contain cursor-grab active:cursor-grabbing max-h-[92vh] max-w-[92vw] select-none"
          draggable={false}
          onClick={(e) => e.stopPropagation()}
          priority={false}
        />
      </div>,
      document.body
    );
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen flex flex-col items-center justify-center py-[12vh] bg-transparent overflow-visible"
    >
      {/* Title */}
      <div className="flex flex-col items-center justify-center space-y-[clamp(2rem,6vh,4rem)]">
        <h2 className="text-[clamp(2.2rem,4.5vw,3.8rem)] font-light text-center text-white tracking-tight leading-[1.2]">
          Our Samples
        </h2>

        {/* Grid centered and uniform */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[2rem] md:gap-[2.5rem] w-full max-w-[90vw] px-[4vw] justify-items-center place-items-center">
          {samples.map((item, i) => (
            <div
              key={item.id}
              ref={(el) => {
                if (el) cardsRef.current[i] = el;
              }}
              onClick={() => setSelectedImage(item.image)}
              className="relative w-[25vw] h-[60vh] min-w-[250px] min-h-[350px] border border-gray-500 overflow-hidden shadow-lg bg-white/5 backdrop-blur-sm cursor-pointer transition-all duration-300"
            >
              <div
                className="bg absolute inset-0 bg-cover bg-center transition-transform duration-500"
                style={{ backgroundImage: `url(${item.image})` }}
              />
              <div className="overlay absolute inset-0 z-[1] transition-all duration-500" />
              <div className="absolute bottom-[4%] left-[6%] z-[2]">
                <h3 className="title text-[clamp(1.1rem,1.8vw,1.5rem)] font-semibold text-white transition-transform duration-500 ease-out">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedImage && <Popup src={selectedImage} />}
    </section>
  );
}
