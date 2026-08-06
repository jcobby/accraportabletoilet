"use client";

import { Menu, Phone } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { WhatsAppIcon } from "@/components/icons";
import { Logo } from "@/components/logo";
import { buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { mainNav } from "@/lib/nav";
import { DEFAULT_WHATSAPP_MESSAGE, site, whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  // Nav links inside the drawer are wrapped in SheetClose, so navigation closes it.
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Utility strip — the phone number is the single most-used thing on this site. */}
      <div className="hidden bg-brand-ink text-white lg:block">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-4 py-2 text-xs sm:px-6 lg:px-8">
          <p className="text-white/70">
            Manufacturer, sale &amp; rental of portable toilets — delivering nationwide from Accra
          </p>
          <div className="flex items-center gap-5">
            <a
              href={site.phone.href}
              className="inline-flex items-center gap-1.5 font-medium transition-colors hover:text-white/70"
            >
              <Phone className="size-3.5" aria-hidden />
              {site.phone.display}
            </a>
            <a
              href={whatsappLink(DEFAULT_WHATSAPP_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-medium transition-colors hover:text-white/70"
            >
              <WhatsAppIcon className="size-3.5" />
              WhatsApp us
            </a>
          </div>
        </div>
      </div>

      <div className="border-b border-border/70 bg-background/80 backdrop-blur-xl supports-backdrop-filter:bg-background/65">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="rounded-md focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
          >
            <Logo />
            <span className="sr-only">{site.name} — home</span>
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-0.5 md:flex">
            {mainNav.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    active ? "text-brand" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {item.label}
                  {/* Underline rather than a filled pill — lighter, and it survives
                      sitting on top of the tinted page heroes below. */}
                  <span
                    aria-hidden
                    className={cn(
                      "absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-linear-to-r from-brand to-fresh transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                      active ? "scale-x-100" : "scale-x-0",
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={site.phone.href}
              className={cn(
                buttonVariants({ variant: "outline" }),
                "hidden h-10 px-4 sm:inline-flex lg:hidden",
              )}
            >
              <Phone aria-hidden />
              Call
            </a>
            <Link
              href="/quote"
              className={cn(
                buttonVariants(),
                "hidden h-10 px-5 text-sm font-semibold shadow-[0_6px_20px_-8px_var(--brand)] transition-transform hover:-translate-y-px sm:inline-flex",
              )}
            >
              Get a free quote
            </Link>

            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger
                render={
                  <button
                    type="button"
                    className={cn(buttonVariants({ variant: "outline", size: "icon" }), "size-10 md:hidden")}
                  />
                }
              >
                <Menu aria-hidden />
                <span className="sr-only">Open menu</span>
              </SheetTrigger>

              <SheetContent side="right" className="w-[85vw] max-w-sm">
                <SheetHeader className="border-b p-5">
                  <SheetTitle className="text-left">
                    <Logo />
                  </SheetTitle>
                  <SheetDescription className="text-left">
                    {site.tagline}
                  </SheetDescription>
                </SheetHeader>

                <nav aria-label="Mobile" className="flex flex-col gap-1 p-4">
                  {mainNav.map((item) => (
                    <SheetClose
                      key={item.href}
                      render={
                        <Link
                          href={item.href}
                          className="rounded-lg px-3 py-3 text-base font-medium text-foreground transition-colors hover:bg-secondary"
                        />
                      }
                    >
                      {item.label}
                    </SheetClose>
                  ))}
                </nav>

                <div className="mt-auto flex flex-col gap-2 border-t p-4">
                  <Link href="/quote" className={cn(buttonVariants(), "h-11 w-full text-sm")}>
                    Get a free quote
                  </Link>
                  <a
                    href={whatsappLink(DEFAULT_WHATSAPP_MESSAGE)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(buttonVariants({ variant: "outline" }), "h-11 w-full text-sm")}
                  >
                    <WhatsAppIcon className="size-4 text-[#25D366]" />
                    WhatsApp {site.phone.display}
                  </a>
                  <a
                    href={site.phone.href}
                    className={cn(buttonVariants({ variant: "ghost" }), "h-11 w-full text-sm")}
                  >
                    <Phone aria-hidden />
                    Call {site.phone.display}
                  </a>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
