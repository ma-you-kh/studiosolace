"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import ContactForm from "../../components/cards/ContactForm";

gsap.registerPlugin(ScrollTrigger);

export default function ContactPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
  // ✅ Wait until the browser fully paints the DOM
  const timeout = setTimeout(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 80 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
            delay: i * 0.1,
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>(".parallax").forEach((el) => {
        gsap.to(el, {
          yPercent: -15,
          ease: "none",
          scrollTrigger: { trigger: el, scrub: 1.2 },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, 50); // small delay to ensure DOM + hydration done

  return () => clearTimeout(timeout);
}, []);


  return (
    <div
      ref={containerRef}
      className="relative z-10 flex flex-col items-center justify-center text-white px-6 md:px-24 lg:px-48 pb-40"
      style={{
        paddingTop: "calc(40vh - 10%)",
      }}
    >
      {/* Section 1 — Header */}
      <section className="max-w-4xl text-center space-y-6 mb-24">
        <h1 className="reveal parallax text-6xl md:text-7xl font-light tracking-tight">
          Contact Us
        </h1>
        <p className="reveal text-lg md:text-xl text-gray-300 leading-relaxed">
          We&apos;d love to hear from you, so don&apos;t hesitate to drop us a
          line! <br />
          Whether you&apos;re planning a project or just want to start a
          conversation, reach out to us.
        </p>
      </section>

      {/* Section 2 — Grid */}
      <section className="reveal grid grid-cols-1 md:grid-cols-2 gap-20 w-full max-w-6xl">
        {/* Left Info */}
        <div className="space-y-12">
          {/* Studio Address */}
          <div>
            <h2 className="text-3xl font-light mb-4">Studio Address</h2>
            <a
              href="https://www.google.com/maps/place/Solace+studio/@28.4154737,77.0502796,56m/data=!3m1!1e3!4m6!3m5!1s0x390d2319c1c0de27:0x8c241291f72738cd!8m2!3d28.4154911!4d77.050311!16s%2Fg%2F11zjm23xpt?entry=ttu&g_ep=EgoyMDI1MTAwNC4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 text-lg leading-relaxed hover:text-white transition-colors duration-300"
            >
              Avenue 49, 114, Lilac Rd, South City II, <br />
              Sector 49, Gurugram, Haryana 122018
            </a>
          </div>

          {/* Project Enquiries */}
          <div>
            <h2 className="text-3xl font-light mb-4">Project Inquiries</h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              Have a project in mind? <br />
              Share your vision through the form, and our team will connect with
              you within 2 working days.
            </p>
          </div>

          {/* Contact Numbers */}
          <div>
            <h2 className="text-3xl font-light mb-4">Contact</h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              <span className="block">+91 98100 12345</span>
              <span className="block">+91 98765 43210</span>
            </p>
          </div>

          {/* Email Addresses */}
          <div>
            <h2 className="text-3xl font-light mb-4">Email</h2>
            <div className="space-y-2 text-gray-400 text-lg leading-relaxed">
              <a
                href="mailto:studiosolace.arch@gmail.com"
                className="text-white hover:underline transition-all duration-300 block"
              >
                studiosolace.arch@gmail.com
              </a>
              <a
                href="mailto:akashthakran77.arch@gmail.com"
                className="text-white hover:underline transition-all duration-300 block"
              >
                akashthakran77.arch@gmail.com
              </a>
              <a
                href="mailto:sakshichauhan.arch@gmail.com"
                className="text-white hover:underline transition-all duration-300 block"
              >
                sakshichauhan.arch@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Right — Form Component */}
        <ContactForm />
      </section>
    </div>
  );
}