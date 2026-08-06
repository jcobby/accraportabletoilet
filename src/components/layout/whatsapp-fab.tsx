"use client";

import { usePathname } from "next/navigation";

import { WhatsAppIcon } from "@/components/icons";
import { DEFAULT_WHATSAPP_MESSAGE, site, whatsappLink } from "@/lib/site";

/**
 * Persistent WhatsApp CTA for tablet and desktop.
 *
 * Hidden on phones (the bottom action bar covers it there) and on /quote, where the
 * form already ends in a WhatsApp hand-off and a second button would compete with it.
 */
export function WhatsAppFab() {
  const pathname = usePathname();
  if (pathname === "/quote") return null;

  return (
    <a
      href={whatsappLink(DEFAULT_WHATSAPP_MESSAGE)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Chat with ${site.name} on WhatsApp`}
      className="group fixed right-6 bottom-6 z-50 hidden items-center gap-2.5 rounded-full bg-[#25D366] py-3 pr-5 pl-3.5 text-sm font-semibold text-[#04310f] shadow-[0_8px_30px_-6px_rgba(37,211,102,0.6)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:scale-[1.02] focus-visible:ring-3 focus-visible:ring-[#25D366]/50 focus-visible:outline-none md:inline-flex"
    >
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366] opacity-15 [animation-duration:3s]" />
      <WhatsAppIcon className="size-6" />
      Chat on WhatsApp
    </a>
  );
}
