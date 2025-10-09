"use client";

import React, { useState } from "react";
import Image from "next/image";
import { projects } from "../../../data/projects";
import { notFound, useParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ProjectPage() {
  const { slug } = useParams<{ slug: string }>(); // ✅ Properly typed, no any

  const project = projects.find((p) => p.slug === slug);
  const [currentIndex, setCurrentIndex] = useState(0);

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
      style={{
        paddingTop: "calc(40vh - 10%)",
      }}
    >
      {/* Project Title */}
      <h1 className="md:text-6xl font-light mb-15 tracking-tight">
        {project.title.toUpperCase()}
      </h1>

      {/* Content Box */}
      <div className="w-full flex flex-col mt-1 md:flex-row gap-10">
        {/* Left: Details */}
        <div className="flex-1 flex flex-col justify-start items-start p-4">
          {/* <h2 className="text-3xl font-light mt-4 mb-4 underline">
            Project Details
          </h2> */}
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
            {/* <li>
              <span className="font-semibold text-white">Year:</span>{" "}
              {project.year}
            </li> */}
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
              src={project.gallery[currentIndex]}
              alt={`${project.title} image ${currentIndex + 1}`}
              fill
              className="object-cover transition-all duration-500"
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
