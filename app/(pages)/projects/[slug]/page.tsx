"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { projects } from "../../../data/projects";
import { notFound, useParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();

  // Find project
  const project = projects.find((p) => p.slug === slug);

  // Hooks must be declared unconditionally
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);

  // Only run effect if project exists
  useEffect(() => {
    if (!project) return;

    const preload = (src: string): void => {
      const img = new window.Image();
      img.src = src;
    };

    const next = project.gallery[(currentIndex + 1) % project.gallery.length];
    const prev =
      project.gallery[
        (currentIndex - 1 + project.gallery.length) % project.gallery.length
      ];

    preload(next);
    preload(prev);
  }, [currentIndex, project]);

  // Now safely handle missing project after hooks
  if (!project) return notFound();

  const nextImage = () =>
    setCurrentIndex((prev) =>
      prev === project.gallery.length - 1 ? 0 : prev + 1
    );

  const prevImage = () =>
    setCurrentIndex((prev) =>
      prev === 0 ? project.gallery.length - 1 : prev - 1
    );

  return (
    <section
      className="min-h-screen text-white px-8 md:px-16 py-16 flex flex-col items-start"
      style={{ paddingTop: "calc(40vh - 10%)" }}
    >
      {/* Project Title */}
      <h1 className="md:text-6xl font-light mb-12 tracking-tight">
        {project.title.toUpperCase()}
      </h1>

      {/* Content Box */}
      <div className="w-full flex flex-col mt-1 md:flex-row gap-10">
        {/* Left: Details */}
        <div className="flex-1 flex flex-col justify-start items-start p-4">
          <p className="text-gray-300 text-xl leading-relaxed mb-4">
            {project.description}
          </p>

          <ul className="text-gray-400 space-y-2 text-xl">
            <li>
              <span className="font-semibold text-white">Location:</span>{" "}
              {project.location}
            </li>
            <li>
              <span className="font-semibold text-white">Client:</span>{" "}
              {project.client}
            </li>
            <li>
              <span className="font-semibold text-white">Category:</span>{" "}
              {project.category}
            </li>
          </ul>
        </div>

        {/* Right: Image Frame */}
        <div className="flex-none w-full md:w-[45vw] relative flex items-center justify-center">
          <div className="relative w-full aspect-[16/9] overflow-hidden rounded-xl border border-neutral-800 shadow-xl">
            <Image
              key={currentIndex}
              src={project.gallery[currentIndex]}
              alt={`${project.title} image ${currentIndex + 1}`}
              fill
              priority={currentIndex === 0}
              onLoadingComplete={() => setLoaded(true)}
              className={`object-cover transition-opacity duration-500 ${
                loaded ? "opacity-100" : "opacity-0"
              }`}
              sizes="(max-width: 768px) 100vw, 45vw"
              quality={85}
            />

            {/* Arrows */}
            <button
              onClick={prevImage}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full hover:bg-black/70 transition"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              onClick={nextImage}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full hover:bg-black/70 transition"
            >
              <ChevronRight size={24} />
            </button>

            {/* Dots */}
            <div className="absolute bottom-3 w-full flex justify-center gap-2">
              {project.gallery.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`w-2.5 h-2.5 rounded-full ${
                    i === currentIndex ? "bg-white" : "bg-gray-500"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
