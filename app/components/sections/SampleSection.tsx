//Samples

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
  const [zoom, setZoom] = useState(1);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  // --- All existing GSAP logic unchanged ---
  useEffect(() => {
  // ✅ Disable GSAP scroll lock on mobile
  if (window.innerWidth < 1024) return;

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

    // Apply zoom
    gsap.set(img, { scale: zoom });

    // Enable drag only if zoomed
    if (zoom > 1) {
      Draggable.create(img, {
        type: "x,y",
        onDrag: function () {
          const rect = img.getBoundingClientRect();

          const overflowX = Math.max(0, rect.width - window.innerWidth);
          const overflowY = Math.max(0, rect.height - window.innerHeight);

          this.x = Math.min(Math.max(this.x, -overflowX / 2), overflowX / 2);
          this.y = Math.min(Math.max(this.y, -overflowY / 2), overflowY / 2);
        },
      });
    } else {
      Draggable.get(img)?.kill();
      gsap.to(img, { x: 0, y: 0 });
    }

    return () => {
      Draggable.get(img)?.kill();
    };
  }, [zoom]);

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

  useEffect(() => {
    if (!selectedImage) {
      setZoom(1);
      if (imgRef.current) {
        gsap.set(imgRef.current, { scale: 1, x: 0, y: 0 });
      }
    }
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
        onClick={(e) => {
          const target = e.target as Node;

          if (wrapperRef.current && !wrapperRef.current.contains(target)) {
            setSelectedImage(null);
          }
        }}
        className="fixed inset-0 flex items-center justify-center bg-black/85 backdrop-blur-sm z-[100]"
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSelectedImage(null);
          }}
          className="fixed top-6 right-6 md:top-8 md:right-8 
            flex items-center justify-center
            w-10 h-10 md:w-12 md:h-12
            text-white text-xl 
            bg-black/80 
            rounded-full 
            hover:scale-110 active:scale-95 
            transition-all duration-200 
            z-[10000]"
        >
          ✕
        </button>

        <div
          ref={wrapperRef}
          className="relative flex items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            ref={imgRef}
            src={src}
            alt="Sample"
            width={1200}
            height={800}
            className="shadow-xl object-contain cursor-grab active:cursor-grabbing max-h-[85vh] max-w-[85vw] select-none"
            draggable={false}
            priority={false}
          />
        </div>
        <div className="absolute bottom-[4vh] left-1/2 -translate-x-1/2 flex items-center gap-3 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full z-[10000]">
          {/* Minus */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              const newZoom = Math.max(1, zoom - 0.2);
              setZoom(newZoom);
            }}
            className="text-white text-lg hover:scale-125 transition"
          >
            −
          </button>

          {/* Slider */}
          <input
            type="range"
            min={1}
            max={4}
            step={0.01}
            value={zoom}
            onChange={(e) => {
              e.stopPropagation();
              setZoom(Number(e.target.value));
            }}
            className="w-[120px] accent-white"
          />

          {/* Plus */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              const newZoom = Math.min(4, zoom + 0.2);
              setZoom(newZoom);
            }}
            className="text-white text-lg hover:scale-125 transition"
          >
            +
          </button>
        </div>
      </div>,
      document.body,
    );
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-fit sm:min-h-[80vh] lg:min-h-screen flex flex-col items-center justify-center py-[10vh] sm:py-[12vh] px-5 sm:px-8 bg-transparent overflow-visible"
    >
      {/* Title */}
      <div className="flex flex-col items-stretch justify-center space-y-[clamp(2rem,6vh,4rem)] w-full">
        <h2 className="text-[clamp(3.0rem,4.5vw,3.8rem)] font-light text-center text-white tracking-tight leading-[1.2]">
          Our Samples
        </h2>

        {/* Grid centered and uniform */}
        {/* MOBILE CARD VIEW */}
        <div className="flex flex-col gap-5 sm:gap-6 w-full lg:hidden">
  {samples.map((item) => (
    <div
      key={item.id}
      onClick={() => setSelectedImage(item.image)}
      className="w-full rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm px-1 py-1 transition-all duration-300 active:scale-[0.98]"
    >
      <div className="w-full aspect-[3/1] relative">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover w-full h-full"
        />
      </div>

      <div className="px-4 py-2 flex items-center justify-between">
        <span className="text-white text-lg">{item.title}</span>
        <span className="text-white/50 text-xl">→</span>
      </div>
    </div>
  ))}
</div>
        {/* DESKTOP GRID */}
        <div className="hidden lg:grid grid-cols-3 gap-[2rem] md:gap-[2.5rem] w-full max-w-[90vw] px-[4vw] justify-items-center place-items-center">
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
