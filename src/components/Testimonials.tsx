"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

const testimonials = [
  {
    name: "Vundela Vyshnavi",
    initials: "VV",
    stars: 4,
    text: "Best app for everyone, the interface is looking wonderful, all events will be handled in the app. Shata definitely gives you a better experience and a memorable day for your event.",
  },
  {
    name: "Karthik Smiley",
    initials: "KS",
    stars: 5,
    text: "The Best App I have seen for Event Management. Particularly praised for its customer-friendly service and user-friendly interface for creating invitations at a very reasonable price.",
  },
];

export function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="py-24" ref={ref}>
      <div className="max-w-[1160px] mx-auto px-[clamp(1.5rem,5vw,3rem)]">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <div className="flex items-center gap-2.5 justify-center mb-3.5">
            <span className="block w-7 h-px bg-accent" />
            <span className="font-[var(--font-mono)] text-[9.5px] tracking-[3px] uppercase text-accent">
              Reviews
            </span>
          </div>
          <h2 className="font-[var(--font-heading)] text-[clamp(2rem,4.5vw,3.2rem)] font-bold tracking-tight leading-tight">
            Smiles, Stories &amp;{" "}
            <em className="font-normal text-ink-mid">Shata Magic</em>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[800px] mx-auto">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className="bg-bg border border-[rgba(60,35,10,0.09)] rounded-2xl p-8 transition-colors hover:bg-cream"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-accent-dim border border-[rgba(255,107,44,0.18)] flex items-center justify-center font-[var(--font-mono)] text-xs font-bold text-accent">
                  {t.initials}
                </div>
                <div>
                  <div className="font-[var(--font-body)] text-sm font-bold">
                    {t.name}
                  </div>
                  <div className="font-[var(--font-mono)] text-[10px] text-gold">
                    {"★".repeat(t.stars)}
                    {"☆".repeat(5 - t.stars)}
                  </div>
                </div>
              </div>
              <p className="font-[var(--font-body)] text-sm font-light text-ink-mid leading-relaxed">
                &ldquo;{t.text}&rdquo;
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
