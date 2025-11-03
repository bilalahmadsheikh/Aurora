import { useState } from "react";
import Link from "next/link";
import { pages } from "../../fluff.config";
import SiteIcon from "../Common/SiteIcon";
import Socials from "../Common/Socials";
import { useRouter } from "next/router";
import { getTranslation } from "../../lib/locales";

export default function Navbar() {
  const router = useRouter();
  const tr = getTranslation(router);

  return (
    <>
      <div className='container mx-auto max-w-screen-lg relative z-50'>
        <div className="flex justify-center transition-all relative z-50">
          <nav className="flex min-h-[80px] w-full items-center justify-between px-4 sm:px-6 md:px-8 lg:px-0 relative z-50">
            {/* Site Icon */}
            <div className="flex items-center flex-shrink-0">
              <SiteIcon className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24" />
            </div>

            {/* Navigation Links - Always Visible */}
            <div className="flex items-center justify-center flex-1 mx-1 sm:mx-2 md:mx-4 lg:mx-6">
              <div className="flex items-center justify-center gap-x-1 sm:gap-x-2 md:gap-x-4 lg:gap-x-6 xl:gap-x-8">
                {pages.map(([title, url]) => (
                  <div
                    key={title}
                    className='link link-underline link-underline-black whitespace-nowrap px-0.5 py-1 sm:px-1 sm:py-2 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-medium text-me-base relative z-50'
                  >
                    <Link href={url}>{tr.navbar[title]}</Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links - Hidden on mobile, visible on sm and up */}
            <div className='hidden sm:flex items-center flex-shrink-0 relative z-50'>
              <div className="scale-65 md:scale-75 lg:scale-90 xl:scale-100">
                <Socials />
              </div>
            </div>
          </nav>
        </div>
        
        {/* Mobile Socials - Only visible on mobile, positioned under About button */}
        <div className="flex sm:hidden justify-end pr 0 mb-1 -mt-7 relative z-50">
          <div className="scale-50">
            <Socials />
          </div>
        </div>
        
        <hr className="relative z-50" />
      </div>
    </>
  );
}