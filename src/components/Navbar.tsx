"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const APP_STORE_URL = "https://apps.apple.com/in/app/shata/id6743954767";
const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.shata.user&hl=en_IN";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 55);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "#services", label: "Services" },
    { href: "#how", label: "How It Works" },
    { href: "#vendors", label: "Vendors" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -62 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
        className={`fixed top-0 left-0 right-0 z-[1000] h-[62px] flex items-center justify-between px-[clamp(1.5rem,5vw,3.5rem)] transition-all duration-300 ${
          scrolled
            ? "bg-[rgba(250,250,247,0.92)] border-b border-[rgba(60,35,10,0.14)] shadow-[0_1px_24px_rgba(60,35,10,0.06)]"
            : "bg-[rgba(250,250,247,0.75)] border-b border-[rgba(60,35,10,0.09)]"
        }`}
        style={{
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      >
        <Link href="#" className="flex items-center gap-2.5 no-underline">
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center font-[var(--font-mono)] text-xs font-bold text-white tracking-tighter">
            SH
          </div>
          <span className="font-[var(--font-body)] text-[17px] font-bold text-ink tracking-tight">
            Shata
          </span>
        </Link>

        <ul className="hidden lg:flex items-center gap-7 xl:gap-10 list-none">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="font-[var(--font-mono)] text-[10.5px] font-normal tracking-[1.4px] uppercase text-ink-mid no-underline hover:text-ink transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <div className="hidden lg:flex items-center gap-2">
            <span className="hidden xl:inline font-[var(--font-mono)] text-[10px] tracking-[1.3px] uppercase text-ink-mid">
              Download
            </span>
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-[var(--font-mono)] text-[10px] font-bold tracking-[1.2px] uppercase text-white bg-ink border-none px-4 py-2.5 rounded-[5px] no-underline hover:bg-[#2c1a06] active:scale-[.97] transition-all"
            >
              App Store
            </a>
            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-[var(--font-mono)] text-[10px] font-bold tracking-[1.2px] uppercase text-ink border border-[rgba(60,35,10,0.14)] bg-[rgba(255,255,255,0.65)] px-4 py-2.5 rounded-[5px] no-underline hover:border-[rgba(60,35,10,0.28)] hover:bg-white transition-all"
            >
              Google Play
            </a>
          </div>
          <button
            onClick={() => setMobileOpen(true)}
            className="flex lg:hidden flex-col gap-1 p-2 rounded-md border border-[rgba(60,35,10,0.14)] bg-transparent"
            aria-label="Open menu"
          >
            <span className="block w-[17px] h-[1.5px] bg-ink-mid rounded-full" />
            <span className="block w-[17px] h-[1.5px] bg-ink-mid rounded-full" />
            <span className="block w-[17px] h-[1.5px] bg-ink-mid rounded-full" />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] bg-[rgba(250,250,247,0.98)] flex flex-col items-center justify-center gap-9"
          >
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-5 right-6 bg-transparent border border-[rgba(60,35,10,0.14)] text-ink-mid w-9 h-9 rounded-md flex items-center justify-center text-[17px]"
            >
              ✕
            </button>
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-[var(--font-heading)] text-[30px] font-semibold italic text-ink-mid no-underline hover:text-accent transition-colors"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navLinks.length * 0.1 }}
              className="flex flex-col items-center gap-3 pt-4"
            >
              <span className="font-[var(--font-mono)] text-[10px] tracking-[1.6px] uppercase text-ink-mid">
                Download the app
              </span>
              <div className="flex flex-col items-center gap-3">
                <a
                  href={APP_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex min-w-[210px] justify-center items-center font-[var(--font-mono)] text-[11px] font-bold tracking-[1.4px] uppercase text-white bg-ink px-5 py-3 rounded-[6px] no-underline"
                >
                  Download on App Store
                </a>
                <a
                  href={PLAY_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex min-w-[210px] justify-center items-center font-[var(--font-mono)] text-[11px] font-bold tracking-[1.4px] uppercase text-ink border border-[rgba(60,35,10,0.14)] bg-white px-5 py-3 rounded-[6px] no-underline"
                >
                  Get it on Google Play
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
