"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

export function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="contact" className="py-24 text-center relative overflow-hidden" ref={ref}>
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px] h-[380px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(255,107,44,0.06), transparent 70%)" }}
      />

      <div className="max-w-[1160px] mx-auto px-[clamp(1.5rem,5vw,3rem)]">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          transition={{ duration: 0.7 }}
          className="max-w-[600px] mx-auto relative z-[1]"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface2 border border-[rgba(60,35,10,0.14)] mb-8">
            <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
            <span className="font-[var(--font-mono)] text-[10px] tracking-[1.8px] uppercase text-ink-mid">
              Start Planning
            </span>
          </div>

          <h2 className="font-[var(--font-heading)] text-[clamp(2.4rem,5vw,4rem)] font-bold tracking-[-2px] leading-none mb-4">
            Your dream event
            <br />
            <em className="italic text-accent">starts here.</em>
          </h2>

          <p className="font-[var(--font-body)] text-lg font-light text-ink-mid mb-10 leading-relaxed">
            Join thousands of happy couples, families &amp; corporates who
            trusted Shata to make their moments unforgettable.
          </p>

          <div className="flex items-center justify-center gap-4 flex-wrap mb-12">
            <a
              href="https://play.google.com/store/apps/details?id=com.shata.user&hl=en_IN"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-[var(--font-mono)] text-[11px] font-bold tracking-[1.4px] uppercase text-white bg-ink px-6 py-3.5 rounded-[5px] no-underline hover:bg-[#2c1a06] active:scale-[.97] transition-all shadow-[0_4px_20px_rgba(26,16,9,0.2),0_1px_3px_rgba(26,16,9,0.15)]"
            >
              Get Started Free →
            </a>
            <a
              href="#vendors"
              className="inline-flex items-center gap-2 font-[var(--font-mono)] text-[11px] tracking-[1.4px] uppercase text-ink-mid bg-transparent border border-[rgba(60,35,10,0.14)] px-6 py-3.5 rounded-[5px] no-underline hover:border-[rgba(60,35,10,0.28)] hover:text-ink transition-all"
            >
              List Your Business
            </a>
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
            <div className="bg-surface border border-[rgba(60,35,10,0.09)] rounded-xl p-5">
              <div className="font-[var(--font-mono)] text-[9px] tracking-[1.5px] uppercase text-accent mb-2">
                Location
              </div>
              <div className="font-[var(--font-body)] text-sm text-ink-mid leading-relaxed">
                Shata Events Pvt Ltd, The Platina, 132, Gachibowli, Hyderabad,
                Telangana-500032
              </div>
            </div>
            <div className="bg-surface border border-[rgba(60,35,10,0.09)] rounded-xl p-5">
              <div className="font-[var(--font-mono)] text-[9px] tracking-[1.5px] uppercase text-accent mb-2">
                Call Us
              </div>
              <div className="font-[var(--font-body)] text-sm text-ink-mid leading-relaxed">
                Available 24/7
                <br />
                <a
                  href="tel:+919701811134"
                  className="text-ink font-medium no-underline hover:text-accent transition-colors"
                >
                  (+91) 97018 11134
                </a>
              </div>
            </div>
            <div className="bg-surface border border-[rgba(60,35,10,0.09)] rounded-xl p-5">
              <div className="font-[var(--font-mono)] text-[9px] tracking-[1.5px] uppercase text-accent mb-2">
                Write To Us
              </div>
              <div className="font-[var(--font-body)] text-sm text-ink-mid leading-relaxed">
                We reply within 2 hours
                <br />
                <a
                  href="mailto:info@shata.in"
                  className="text-ink font-medium no-underline hover:text-accent transition-colors"
                >
                  info@shata.in
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
