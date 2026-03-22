"use client";
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import SocialIcons from "../icons/SocialIcons";

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);

  const menuRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const rightTextRef = useRef<HTMLDivElement>(null);
  const [socialDropdownOpen, setSocialDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const bgColor = scrolled
    ? "bg-black/90 backdrop-blur-sm"
    : "bg-black/20 backdrop-blur-sm";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setSocialDropdownOpen(false);
      }
    };

    if (socialDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [socialDropdownOpen]);

  useEffect(() => {
    if (!menuRef.current) return;

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    if (menuOpen) {
      tl.to(menuRef.current, { y: 0, opacity: 1, duration: 0.5 });

      if (linksRef.current) {
        const linkEls = Array.from(linksRef.current.children);
        tl.fromTo(
          linkEls,
          { x: 50, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.5, stagger: 0.2 },
          "-=0.3",
        );
      }

      tl.fromTo(
        dividerRef.current,
        { scaleY: 0, opacity: 0 },
        { scaleY: 1, opacity: 1, duration: 0.3 },
        "-=0.4",
      ).fromTo(
        rightTextRef.current,
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5 },
        "-=0.4",
      );
    } else {
      if (linksRef.current) {
        const linkEls = Array.from(linksRef.current.children);
        tl.to(linkEls, {
          opacity: 0,
          x: 50,
          duration: 0.5,
          stagger: { each: 0.2, from: "end" },
        });
      }

      tl.to([rightTextRef.current, dividerRef.current], {
        opacity: 0,
        duration: 0.3,
      }).to(menuRef.current, {
        y: "-100%",
        opacity: 0,
        duration: 0.5,
        ease: "power3.in",
      });
    }
  }, [menuOpen]);

  return (
    <nav
      id="main-navbar"
      className={`fixed top-0 left-0 w-full z-20 transition-[background-color,backdrop-filter] duration-500 ease-in-out ${bgColor}`}
    >
      <div
        className={`w-full px-4 md:px-8 flex items-center justify-between relative
  transition-[padding] duration-500 ease-in-out
  ${scrolled ? "py-3 md:py-4" : "py-6 md:py-8"}`}
      >
        {/* Logo */}
        <div className="absolute left-1/2 transform -translate-x-1/2 z-40">
          <img
            id="navbarLogo"
            src="/logo.png"
            alt="Studio Solace Logo"
            className={`object-contain cursor-pointer 
          transition-[height,transform] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
          ${scrolled ? "h-10 md:h-12" : "h-14 md:h-16"}
          hover:drop-shadow-[0_0_5px_rgba(255,255,255,1)]`}
            onClick={() => setMenuOpen(!menuOpen)}
          />
        </div>

        {/* Desktop: Social Icons */}
        <div className="hidden md:flex ml-auto">
          <SocialIcons />
        </div>

        {/* Mobile: Dropdown Trigger */}
        <div className="ml-auto md:hidden relative z-50">
          <button
            onClick={() => setSocialDropdownOpen(!socialDropdownOpen)}
            className="btn btn-ghost btn-circle p-2 transition-all duration-300 hover:bg-white/10 active:scale-90"
            aria-label="Social links"
          >
            {/* Animated 3-dot icon */}
            <div className="flex flex-col items-center gap-[3px]">
              <span className="w-1 h-1 bg-white rounded-full transition-all duration-300"></span>
              <span className="w-1 h-1 bg-white rounded-full transition-all duration-300"></span>
              <span className="w-1 h-1 bg-white rounded-full transition-all duration-300"></span>
            </div>
          </button>

          {/* Dropdown */}
          <div
            className={`absolute right-0 mt-4 z-50
      transition-all duration-300 ease-out origin-top-right
      ${
        socialDropdownOpen
          ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
          : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
      }
    `}
          >
            <div
              ref={dropdownRef}
              className="bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-4 min-w-[180px]"
            >
              {/* Title */}
              <p className="text-xs uppercase tracking-widest text-white/50 mb-3 px-2">
                Connect
              </p>
              <SocialIcons variant="grid" />
            </div>
          </div>
        </div>
      </div>

      {/* Sliding Menu */}
      <div
        ref={menuRef}
        className="fixed w-full h-screen inset-0 z-20 bg-black/97 backdrop-blur-md opacity-0"
        style={{ transform: "translateY(-100%)" }}
      >
        <div className="container mx-auto px-6 md:px-10 lg:px-16 flex h-full justify-between items-center">
          {/* Left Column: Navigation */}
          <div
            ref={linksRef}
            className="flex-1 flex flex-col items-end justify-center gap-10 text-white text-4xl pr-8 md:pr-12"
          >
            <Link
              href="/home"
              onClick={() => setMenuOpen(false)}
              onMouseEnter={() => setHoveredImage("home")}
              onMouseLeave={() => setHoveredImage(null)}
              className="transition-all duration-500 hover:scale-110 hover:text-orange-400 hover:drop-shadow-[0_0_15px_rgba(255,165,0,0.9)]"
            >
              Home
            </Link>
            <Link
              href="/about"
              onClick={() => setMenuOpen(false)}
              onMouseEnter={() => setHoveredImage("about")}
              onMouseLeave={() => setHoveredImage(null)}
              className="transition-all duration-500 hover:scale-110 hover:text-blue-400 hover:drop-shadow-[0_0_10px_rgba(0,191,255,0.5)]"
            >
              About Us
            </Link>
            <Link
              href="/projects"
              onClick={() => setMenuOpen(false)}
              onMouseEnter={() => setHoveredImage("portfolio")}
              onMouseLeave={() => setHoveredImage(null)}
              className="transition-all duration-500 hover:scale-110 hover:text-blue-400 hover:drop-shadow-[0_0_10px_rgba(0,191,255,0.5)]"
            >
              Our Projects
            </Link>
            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              onMouseEnter={() => setHoveredImage("contact")}
              onMouseLeave={() => setHoveredImage(null)}
              className="transition-all duration-500 hover:scale-110 hover:text-blue-400 hover:drop-shadow-[0_0_10px_rgba(0,191,255,0.5)]"
            >
              Contact Us
            </Link>
          </div>

          {/* Divider */}
          <div
            ref={dividerRef}
            className="h-[60vh] w-px bg-white/70 origin-top scale-y-0"
          ></div>

          {/* Right Column: Dynamic Descriptions */}
          <div
            ref={rightTextRef}
            className="flex-1 flex items-center justify-start pl-8 md:pl-12 relative opacity-0"
          >
            <p
              className={`text-white text-lg max-w-md leading-relaxed absolute transition-opacity duration-700 ease-in-out ${
                hoveredImage ? "opacity-0" : "opacity-80"
              }`}
            >
              Welcome to Studio Solace. Explore our world of design, creativity,
              and architecture.
            </p>

            {hoveredImage === "home" && (
              <p className="text-white text-lg max-w-md leading-relaxed absolute transition-opacity duration-700 ease-in-out opacity-80">
                Discover our vision and values that shape every project we
                create.
              </p>
            )}
            {hoveredImage === "about" && (
              <p className="text-white text-lg max-w-md leading-relaxed absolute transition-opacity duration-700 ease-in-out opacity-80">
                Learn about our journey, philosophy, and the people behind
                Studio Solace.
              </p>
            )}
            {hoveredImage === "portfolio" && (
              <p className="text-white text-lg max-w-md leading-relaxed absolute transition-opacity duration-700 ease-in-out opacity-80">
                Browse our curated portfolio showcasing creativity across
                diverse projects.
              </p>
            )}
            {hoveredImage === "contact" && (
              <p className="text-white text-lg max-w-md leading-relaxed absolute transition-opacity duration-700 ease-in-out opacity-80">
                Get in touch with us — we’d love to collaborate and bring ideas
                to life.
              </p>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
