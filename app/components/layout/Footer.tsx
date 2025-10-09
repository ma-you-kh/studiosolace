"use client";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="relative bg-black text-gray-300 w-full pt-10 z-10">
      <div className="container mx-auto px-5 md:px-5 lg:px-5">
        <div className="grid grid-cols-1 md:grid-cols-[40%_30%_30%] gap-12 border-b border-gray-700 pb-2">
          {/* Left Column - CTA */}
          <div>
            <h2 className="text-3xl md:text-4xl font-light text-white mb-4">
              Designing Spaces,
            </h2>
            <h2 className="text-3xl md:text-4xl font-light text-white mb-4">
              Creating Joy!
            </h2>
            <p className="text-sm text-gray-400 mb-6">
              Designing structures and spaces <br />
              that feel as good as they look
            </p>
            <div className="flex gap-4">
              <Link
                href="/contact"
                className="border border-gray-500 px-5 py-2 text-sm uppercase tracking-wide hover:bg-white hover:text-black transition"
                prefetch={false}
              >
                Enquire Now →
              </Link>
            </div>
          </div>

          {/* Middle Column - Quick Links and Follow Us */}
          <div>
            <h4 className="text-white font-semibold mb-4 uppercase text-sm tracking-wide">
              Quick Links
            </h4>
            <ul className="space-y-1 mb-6">
              <li>
                <Link href="/about">About Us</Link>
              </li>
              <li>
                <Link href="/projects">Our Projects</Link>
              </li>
              <li className="text-gray-400 cursor-default select-none">
                <span>Our Expertise</span>
              </li>
              <li className="text-gray-400 cursor-default select-none">
                <span>Samples</span>
              </li>
            </ul>

            <h4 className="text-white font-semibold mt-6 mb-2 uppercase text-sm tracking-wide">
              Follow Us
            </h4>
            <div className="flex gap-6 text-sm">
              <a
                href="https://instagram.com/_studio_solace_"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
              <a
                href="https://www.pinterest.com/studiosolacearch"
                target="_blank"
                rel="noopener noreferrer"
              >
                Pinterest
              </a>
              <a
                href="https://wa.me/9999770200"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </a>
            </div>
          </div>

          {/* Right Column - Contact & Map */}
          <div>
            <h4 className="text-white font-semibold mb-4 uppercase text-sm tracking-wide">
              Office Address
            </h4>

            <div className="space-y-2">
              <a
                href="https://www.google.com/maps/place/Solace+studio/@28.4154737,77.0502796,56m/data=!3m1!1e3!4m6!3m5!1s0x390d2319c1c0de27:0x8c241291f72738cd!8m2!3d28.4154911!4d77.050311!16s%2Fg%2F11zjm23xpt?entry=ttu&g_ep=EgoyMDI1MTAwNC4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:opacity-90 transition"
                aria-label="Open in Google Maps"
              >
                <div className="w-60 h-36 rounded-md overflow-hidden border border-gray-700">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d351.58869064159435!2d77.05027963688885!3d28.41547369737687!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f40!3m3!1m2!1s0x390d2319c1c0de27%3A0x8c241291f72738cd!2sSolace%20studio!5e0!3m2!1sen!2sin!4v1707313571234"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Solace Studio Location"
                  />
                </div>

                <p className="text-sm text-gray-400 mb-6 mt-4 leading-relaxed">
                  114, Avenue 49, South City II,
                  <br />
                  Sector 49, Gurugram, Haryana 122018
                </p>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="px-4">
          {" "}
          {/* Add this wrapper for padding */}
          <div className="flex flex-col md:flex-row justify-between items-center py-4 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <span className="text-base md:text-lg font-light tracking-wide text-white">
                Studio Solace
              </span>
            </div>

            <p className="mt-4 md:mt-0">
              © {new Date().getFullYear()} — All Rights Reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
