import React from "react";

const SocialIcons: React.FC<{ variant?: "row" | "grid" }> = ({
  variant = "row",
}) => {
  return (
    <div
      className={`${
        variant === "grid"
          ? "grid grid-cols-2 gap-4"
          : "flex items-center gap-3"
      } z-10`}
    >
      {/* Instagram */}
      <a
        href="https://instagram.com/_studio_solace_"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
        className="group flex flex-col items-center gap-1"
      >
        <div className="btn btn-ghost btn-circle p-2 group-hover:scale-110 transition-transform duration-300">
          {/* ✅ ORIGINAL SVG (unchanged) */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 md:h-6 md:w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <circle cx="12" cy="12" r="3.5" />
          </svg>
        </div>

        {variant === "grid" && (
          <span className="text-xs text-white/60">Instagram</span>
        )}
      </a>

      {/* Pinterest */}
      <a
        href="https://www.pinterest.com/studiosolacearch"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Pinterest"
        className="group flex flex-col items-center gap-1"
      >
        <div className="btn btn-ghost btn-circle p-2 group-hover:scale-110 transition-transform duration-300">
          {/* ✅ ORIGINAL SVG */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 md:h-6 md:w-6"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 0C5.373 0 0 5.373 0 12c0 4.99 3.053 9.26 7.388 11.06-.102-.94-.194-2.38.04-3.404.212-.933 1.366-5.933 1.366-5.933s-.348-.697-.348-1.727c0-1.616.937-2.82 2.1-2.82.99 0 1.466.743 1.466 1.634 0 .995-.634 2.48-.96 3.858-.274 1.16.58 2.106 1.716 2.106 2.06 0 3.64-2.173 3.64-5.31 0-2.775-1.996-4.717-4.846-4.717-3.302 0-5.24 2.474-5.24 5.03 0 .995.382 2.06.86 2.64a.345.345 0 01.08.33c-.088.36-.287 1.14-.326 1.298-.05.212-.162.26-.376.157-1.4-.652-2.275-2.692-2.275-4.334 0-3.527 2.565-6.767 7.397-6.767 3.886 0 6.9 2.77 6.9 6.464 0 3.862-2.44 6.973-5.828 6.973-1.14 0-2.21-.59-2.575-1.29l-.7 2.667c-.254.988-.945 2.225-1.41 2.985.974.302 2.004.466 3.08.466 6.627 0 12-5.373 12-12S18.627 0 12 0z" />
          </svg>
        </div>

        {variant === "grid" && (
          <span className="text-xs text-white/60">Pinterest</span>
        )}
      </a>

      {/* WhatsApp */}
      <a
        href="https://wa.me/919999770200"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="group flex flex-col items-center gap-1"
      >
        <div className="btn btn-ghost btn-circle p-2 group-hover:scale-110 transition-transform duration-300">
          {/* ✅ ORIGINAL SVG */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 md:h-6 md:w-6"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
        </div>

        {variant === "grid" && (
          <span className="text-xs text-white/60">WhatsApp</span>
        )}
      </a>

      {/* Mail */}
      <a
        href={`mailto:studiosolace.arch@gmail.com,info@solacestudio.in`}
        aria-label="Mail"
        className="group flex flex-col items-center gap-1"
      >
        <div className="btn btn-ghost btn-circle p-2 group-hover:scale-110 transition-transform duration-300">
          {/* ✅ ORIGINAL SVG */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 md:h-6 md:w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <rect x="2" y="4" width="20" height="16" rx="2" ry="2" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
        </div>

        {variant === "grid" && (
          <span className="text-xs text-white/60">Email</span>
        )}
      </a>
    </div>
  );
};

export default SocialIcons;
