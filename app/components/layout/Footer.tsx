"use client";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="relative bg-black text-gray-300 w-full pt-10 z-10">
      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16">
        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 border-b border-gray-700 pb-6">
          {/* CTA + MAP */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left gap-6 w-full lg:mt-10">
            <div className="w-full max-w-[340px] sm:max-w-[420px] mx-auto lg:mx-0">
              {/* CTA */}
              <div className="flex flex-col items-center lg:items-start w-full">
                <h2 className="w-full text-[clamp(1.9rem,7vw,2.6rem)] font-light text-white leading-tight">
                  Designing Spaces,
                </h2>

                <h2 className="text-[clamp(1.9rem,7vw,2.6rem)] font-light text-white leading-tight mb-4">
                  Creating Joy!
                </h2>

                <p className="text-sm text-gray-400 mb-4">
                  Designing structures and spaces <br />
                  that feel as good as they look
                </p>

                {/* Mobile Button */}
                <div className="mt-4 flex justify-center lg:hidden">
                  <Link
                    href="/contact"
                    className="border border-gray-500 px-6 py-2 text-sm uppercase tracking-wide hover:bg-white hover:text-black transition"
                  >
                    Enquire Now →
                  </Link>
                </div>

                {/* Desktop Button */}
                <div className="hidden lg:block mt-4">
                  <Link
                    href="/contact"
                    className="border border-gray-500 px-5 py-2 text-sm uppercase tracking-wide hover:bg-white hover:text-black transition"
                  >
                    Enquire Now →
                  </Link>
                </div>
              </div>

              {/* MAP (Mobile only) */}
              <div className="flex flex-col items-center lg:hidden text-center mt-4 w-full">
                <div className="w-full max-w-[300px] sm:max-w-[340px] aspect-[4/3] mx-auto rounded-md overflow-hidden border border-gray-700">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d351.58869064159435!2d77.05027963688885!3d28.41547369737687!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f40!3m3!1m2!1s0x390d2319c1c0de27%3A0x8c241291f72738cd!2sSolace%20studio!5e0!3m2!1sen!2sin!4v1707313571234"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    title="Solace Studio Location"
                  />
                </div>
                  <p className="text-sm text-gray-400 mt-4 leading-relaxed text-center">
                    114, Avenue 49, South City II,
                    <br />
                    Sector 49, Gurugram, Haryana 122018
                  </p>
              </div>
            </div>
          </div>

          {/* MIDDLE COLUMN (Desktop only) */}
          <div className="hidden lg:flex flex-col justify-center items-center text-center w-full">
            <h4 className="text-white font-semibold mb-4 uppercase text-sm tracking-wide">
              Quick Links
            </h4>

            <ul className="flex flex-col gap-1 mb-6">
              <li>
                <Link href="/about">About Us</Link>
              </li>
              <li>
                <Link href="/projects">Our Projects</Link>
              </li>
              <li>
                <Link href="/contact">Contact Us</Link>
              </li>
            </ul>

            <h4 className="text-white font-semibold mt-4 mb-2 uppercase text-sm tracking-wide">
              Follow Us
            </h4>

            <div className="flex gap-6">
              <a href="https://instagram.com/_studio_solace_" target="_blank">
                Instagram
              </a>
              <a
                href="https://www.pinterest.com/studiosolacearch"
                target="_blank"
              >
                Pinterest
              </a>
              <a href="https://wa.me/919999770200" target="_blank">
                WhatsApp
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN (Desktop only) */}
          <div className="hidden lg:flex flex-col items-center justify-self-end">
            <h4 className="text-white font-semibold mb-4 uppercase text-sm tracking-wide text-center w-full">
              Office Address
            </h4>

            <div className="space-y-2">
              <a
                href="https://www.google.com/maps/place/Solace+studio"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:opacity-90 transition"
              >
                <div className="w-full max-w-[500px] aspect-[4/3] rounded-md overflow-hidden border border-gray-700">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d351.58869064159435!2d77.05027963688885!3d28.41547369737687!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f40!3m3!1m2!1s0x390d2319c1c0de27%3A0x8c241291f72738cd!2sSolace%20studio!5e0!3m2!1sen!2sin!4v1707313571234"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                  />
                </div>

                <p className="text-sm text-gray-400 mt-4 leading-relaxed text-center w-full">
                  114, Avenue 49, South City II,
                  <br />
                  Sector 49, Gurugram, Haryana 122018
                </p>
              </a>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="px-2 sm:px-4">
          <div className="flex flex-col lg:flex-row justify-center lg:justify-between items-center py-4 text-sm text-gray-500 text-center lg:text-left">
            <span className="text-white">Studio Solace</span>

            <p className="mt-2 lg:mt-0">
              © {new Date().getFullYear()} — All Rights Reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
