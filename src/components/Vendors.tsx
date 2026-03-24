"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const vendors = [
  { emoji: "🎞️", cat: "Photography", name: "Pixels by Arjun", loc: "Hyderabad, TG", rating: "5.0" },
  { emoji: "🍛", cat: "Catering", name: "Royal Feast Co.", loc: "Bengaluru, KA", rating: "4.9" },
  { emoji: "🌺", cat: "Décor & Floral", name: "Bloom Studio", loc: "Mumbai, MH", rating: "4.9" },
  { emoji: "🏛️", cat: "Venue", name: "The Grand Mahal", loc: "Delhi, NCR", rating: "4.8" },
  { emoji: "🎸", cat: "Entertainment", name: "Rhythm House Band", loc: "Chennai, TN", rating: "5.0" },
  { emoji: "💄", cat: "Makeup Artist", name: "Glam by Priya", loc: "Hyderabad, TG", rating: "4.9" },
  { emoji: "🎨", cat: "Mehendi Artist", name: "Henna by Fatima", loc: "Kolkata, WB", rating: "4.8" },
  { emoji: "📋", cat: "Event Planning", name: "Moments Managed", loc: "Pune, MH", rating: "5.0" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

export function Vendors() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="vendors" className="py-24" ref={ref}>
      <div className="max-w-[1160px] mx-auto px-[clamp(1.5rem,5vw,3rem)]">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          transition={{ duration: 0.7 }}
          className="mb-11"
        >
          <div className="flex items-center gap-2.5 mb-3.5">
            <span className="block w-7 h-px bg-accent" />
            <span className="font-[var(--font-mono)] text-[9.5px] tracking-[3px] uppercase text-accent">
              Vendors
            </span>
          </div>
          <h2 className="font-[var(--font-heading)] text-[clamp(2rem,4.5vw,3.2rem)] font-bold tracking-tight leading-tight">
            Featured <em className="font-normal text-ink-mid">on Shata</em>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[rgba(60,35,10,0.09)] border border-[rgba(60,35,10,0.09)] rounded-2xl overflow-hidden">
          {vendors.map((v, i) => (
            <motion.div
              key={v.name}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              transition={{ duration: 0.7, delay: i * 0.08 }}
              className="vcard bg-bg p-6 transition-colors duration-200 cursor-default hover:bg-cream"
            >
              <div className="w-[38px] h-[38px] rounded-[9px] bg-gold-soft border border-[rgba(200,146,42,0.18)] flex items-center justify-center text-[17px] mb-3">
                {v.emoji}
              </div>
              <div className="font-[var(--font-mono)] text-[9px] tracking-[1.2px] uppercase text-accent mb-1.5">
                {v.cat}
              </div>
              <div className="font-[var(--font-body)] text-[.88rem] font-bold mb-1">
                {v.name}
              </div>
              <div className="font-[var(--font-body)] text-[.78rem] font-light text-ink-mid mb-1">
                {v.loc}
              </div>
              <div className="font-[var(--font-mono)] text-[10px] text-gold flex items-center gap-1">
                ★★★★★ <span className="text-ink-soft">{v.rating}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
