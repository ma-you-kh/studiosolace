"use client";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="relative bg-black text-gray-300 w-full pt-10 z-10">
      <div className="w-full px-5 md:px-10 lg:px-16 max-w-[1400px] mx-auto">

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 border-b border-gray-700 pb-6">

          {/* CTA + MAP (Mobile Combined) */}
          <div className="grid grid-cols-2 md:grid-cols-1 gap-6 items-center">

            {/* CTA */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-light text-white mb-2">
                Designing Spaces,
              </h2>
              <h2 className="text-3xl md:text-4xl font-light text-white mb-4">
                Creating Joy!
              </h2>

              <p className="text-sm text-gray-400 mb-5">
                Designing structures and spaces <br />
                that feel as good as they look
              </p>

              <Link
                href="/contact"
                className="border border-gray-500 px-5 py-2 text-sm uppercase tracking-wide hover:bg-white hover:text-black transition"
              >
                Enquire Now →
              </Link>
            </div>

            {/* MAP */}
            <div className="flex flex-col items-center md:hidden text-center">
              <div className="w-44 h-28 rounded-md overflow-hidden border border-gray-700">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d351.58869064159435!2d77.05027963688885!3d28.41547369737687!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f40!3m3!1m2!1s0x390d2319c1c0de27%3A0x8c241291f72738cd!2sSolace%20studio!5e0!3m2!1sen!2sin!4v1707313571234"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  title="Solace Studio Location"
                />
              </div>
            </div>

          </div>

          {/* MIDDLE COLUMN */}
          <div className="flex flex-col justify-center items-center text-center w-full">

            <h4 className="text-white font-semibold mb-4 uppercase text-sm tracking-wide">
              Quick Links
            </h4>

            {/* MOBILE: horizontal */}
            <ul className="flex md:flex-col gap-6 md:gap-1 mb-6">
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/projects">Our Projects</Link></li>
              <li><Link href="/contact">Contact Us</Link></li>
            </ul>

            <h4 className="text-white font-semibold mt-4 mb-2 uppercase text-sm tracking-wide">
              Follow Us
            </h4>

            <div className="flex gap-6">
              <a href="https://instagram.com/_studio_solace_" target="_blank">Instagram</a>
              <a href="https://www.pinterest.com/studiosolacearch" target="_blank">Pinterest</a>
              <a href="https://wa.me/919999770200" target="_blank">WhatsApp</a>
            </div>
          </div>

          {/* RIGHT COLUMN (Desktop only full version) */}
          <div className="hidden md:flex flex-col items-end md:justify-self-end md:pl-4">

            <h4 className="text-white font-semibold mb-4 uppercase text-sm tracking-wide text-center">
              Office Address
            </h4>

            <div className="space-y-2">
              <a
                href="https://www.google.com/maps/place/Solace+studio"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:opacity-90 transition"
              >
                <div className="w-60 h-36 rounded-md overflow-hidden border border-gray-700">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18..."
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                  />
                </div>

                <p className="text-sm text-gray-400 mt-4 leading-relaxed">
                  114, Avenue 49, South City II,
                  <br />
                  Sector 49, Gurugram, Haryana 122018
                </p>
              </a>
            </div>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="px-4">
          <div className="flex flex-col md:flex-row justify-center md:justify-between items-center py-4 text-sm text-gray-500 text-center md:text-left">
            <span className="text-white">Studio Solace</span>

            <p className="mt-2 md:mt-0">
              © {new Date().getFullYear()} — All Rights Reserved
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;