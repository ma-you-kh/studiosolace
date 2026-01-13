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
            <div className="text-gray-400 text-lg leading-relaxed space-y-3">
              <a
                href="tel:+919999770200"
                className="inline-flex items-center gap-3 text-gray-400 hover:text-white transition-colors duration-300"
              >
                <svg
                  aria-hidden="true"
                  className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.09 4.18 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.72c.12 1.05.35 2.07.68 3.03a2 2 0 0 1-.45 2.11L9.91 10.09a16 16 0 0 0 6 6l1.23-1.23a2 2 0 0 1 2.11-.45c.96.33 1.98.56 3.03.68A2 2 0 0 1 22 16.92z" />
                </svg>
                <span>+91 9999770200</span>
              </a>

              <br />
              <a
                href="tel:+919667599619"
                className="inline-flex items-center gap-3 text-gray-400 hover:text-white transition-colors duration-300"
              >
                <svg
                  aria-hidden="true"
                  className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.09 4.18 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.72c.12 1.05.35 2.07.68 3.03a2 2 0 0 1-.45 2.11L9.91 10.09a16 16 0 0 0 6 6l1.23-1.23a2 2 0 0 1 2.11-.45c.96.33 1.98.56 3.03.68A2 2 0 0 1 22 16.92z" />
                </svg>
                <span>+91 9667599619</span>
              </a>
            </div>
          </div>

          {/* Email Addresses */}
          <div>
            <h2 className="text-3xl font-light mb-4">Email</h2>
            <div className="space-y-2 text-gray-400 text-lg leading-relaxed">
              <a
                href={`mailto:info@solacestudio.in?subject=Project%20Inquiry&body=Hi%20Studio%20Solace,%0D%0A%0D%0AI'd%20love%20to%20discuss%20a%20new%20project...`}
                className="inline-flex items-center gap-3 text-white hover:underline transition-all duration-300"
              >
                <svg
                  aria-hidden="true"
                  className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="5" width="18" height="14" rx="2" ry="2" />
                  <path d="M3 7l9 6 9-6" />
                </svg>
                <span>info@solacestudio.in</span>
              </a>

              <br />

              <a
                href="mailto:akashthakran77@gmail.com"
                className="inline-flex items-center gap-3 text-white hover:underline transition-all duration-300"
              >
                <svg
                  aria-hidden="true"
                  className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="5" width="18" height="14" rx="2" ry="2" />
                  <path d="M3 7l9 6 9-6" />
                </svg>
                <span>akashthakran77@gmail.com</span>
              </a>

              <br />

              <a
                href="mailto:sakshichauhan.arch@gmail.com"
                className="inline-flex items-center gap-3 text-white hover:underline transition-all duration-300"
              >
                <svg
                  aria-hidden="true"
                  className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="5" width="18" height="14" rx="2" ry="2" />
                  <path d="M3 7l9 6 9-6" />
                </svg>
                <span>sakshichauhan.arch@gmail.com</span>
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