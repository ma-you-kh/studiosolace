"use client";
import React from "react";
import Image from "next/image";

interface ProjectCardProps {
  title: string;
  image: string;
  descriptionLine1?: string;
  descriptionLine2?: string;
  index: number;
}

export default function ProjectCard({
  title,
  image,
  descriptionLine1 = "",
  descriptionLine2 = "",
}: ProjectCardProps) {
  return (
    <div
      className="relative flex-none overflow-hidden rounded-3xl shadow-2xl group cursor-pointer
             w-[50vw] h-[50vh] bg-black/20 backdrop-blur-sm border border-white/10"
    >
      <Image
        src={image}
        alt={title}
        fill // ✅ fills parent container (acts like absolute + inset-0)
        className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
        sizes="(max-width: 768px) 100vw, 50vw" // ✅ helps responsive loading
        priority={false} // set to true if above-the-fold
      />

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      {/* Text */}
      <div className="absolute bottom-0 left-0 p-8 z-10 text-white">
        <h3 className="text-3xl font-bold mb-2">{title}</h3>
        <p className="text-sm text-gray-200">{descriptionLine1}</p>
        <p className="text-sm text-gray-400">{descriptionLine2}</p>
      </div>
    </div>
  );
}
