"use client";

import { FileText, Phone } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { WhatsAppIcon } from "@/components/icons";
import { DEFAULT_WHATSAPP_MESSAGE, site, whatsappLink } from "@/lib/site";

/**
 * Fixed bottom bar on phones: call, WhatsApp, quote — the only three things a visitor
 * on this site ever wants to do, always one thumb-reach away.
 *
 * On desktop this is hidden and the header CTA plus the floating WhatsApp button do
 * the same job.
 */
export function MobileActionBar() {
  const pathname = usePathname();
  const onQuote = pathname === "/quote";

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border/80 bg-background/92 pb-[env(safe-area-inset-bottom)] backdrop-blur-lg md:hidden">
      <div className="grid grid-cols-3 gap-1 p-2">
        <a
          href={site.phone.href}
          className="flex flex-col items-center gap-1 rounded-xl py-2 text-[0.7rem] font-semibold text-muted-foreground transition-colors active:bg-secondary"
        >
          <Phone className="size-5 text-brand" aria-hidden />
          Call
        </a>
        <a
          href={whatsappLink(DEFAULT_WHATSAPP_MESSAGE)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1 rounded-xl py-2 text-[0.7rem] font-semibold text-muted-foreground transition-colors active:bg-secondary"
        >
          <WhatsAppIcon className="size-5 text-[#25D366]" />
          WhatsApp
        </a>
        {onQuote ? (
          <span className="flex flex-col items-center gap-1 rounded-xl py-2 text-[0.7rem] font-semibold text-brand">
            <FileText className="size-5" aria-hidden />
            Quote
          </span>
        ) : (
          <Link
            href="/quote"
            className="flex flex-col items-center gap-1 rounded-xl bg-brand py-2 text-[0.7rem] font-semibold text-white transition-opacity active:opacity-90"
          >
            <FileText className="size-5" aria-hidden />
            Get a quote
          </Link>
        )}
      </div>
    </div>
  );
}
