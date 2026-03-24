"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const services = [
  {
    icon: "🎉",
    name: "Events",
    desc: "From weddings and birthdays to corporate galas and music fests — we craft every event with passion and precision to make it unforgettable.",
  },
  {
    icon: "📸",
    name: "Photography & Film",
    desc: "Be it a pre-wedding shoot, baby shower, or a grand event — we frame memories that last a lifetime, turning emotions into timeless stories.",
  },
  {
    icon: "🍽️",
    name: "Catering & Cuisine",
    desc: "From diverse cuisines to themed food stations, our catering services serve up delicious memories crafted to impress your guests.",
  },
  {
    icon: "🌸",
    name: "Décor & Floral",
    desc: "Bespoke themes, luxe florals, and stage setups that transform any space into a dreamy celebration venue.",
  },
  {
    icon: "🏛️",
    name: "Venues & Spaces",
    desc: "Banquet halls, farmhouses, rooftops & destination venues across Hyderabad, Vizag, Bengaluru & 76+ cities.",
  },
  {
    icon: "📋",
    name: "Full Event Planning",
    desc: "End-to-end coordination — let a dedicated planner handle every detail while you enjoy the moment.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

export function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="services" className="relative py-32 pb-24" ref={ref}>
      {/* Glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[260px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(255,107,44,0.05), transparent 70%)",
        }}
      />

      <div className="max-w-[1160px] mx-auto px-[clamp(1.5rem,5vw,3rem)]">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 mb-14"
        >
          <div>
            <div className="flex items-center gap-2.5 mb-3.5">
              <span className="block w-7 h-px bg-accent" />
              <span className="font-[var(--font-mono)] text-[9.5px] tracking-[3px] uppercase text-accent">
                Our Services
              </span>
            </div>
            <h2 className="font-[var(--font-heading)] text-[clamp(2rem,4.5vw,3.2rem)] font-bold tracking-tight leading-tight">
              Everything your
              <br />
              <em className="font-normal text-ink-mid">celebration needs</em>
            </h2>
          </div>
          <p className="font-[var(--font-body)] font-light text-base text-ink-mid max-w-[380px] leading-relaxed">
            From intimate gatherings to grand weddings — every service, every
            vendor, one platform. Available across India.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[rgba(60,35,10,0.09)] border border-[rgba(60,35,10,0.09)] rounded-2xl overflow-hidden">
          {services.map((svc, i) => (
            <motion.div
              key={svc.name}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="svc-card bg-bg p-8 relative overflow-hidden cursor-default group transition-colors duration-300 hover:bg-cream"
            >
              {/* Accent overlay on hover */}
              <div className="absolute inset-0 bg-accent-dim opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <span className="absolute top-5 right-6 font-[var(--font-mono)] text-[10px] text-ink-dim tracking-wider">
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="relative z-[1]">
                <div className="w-[42px] h-[42px] rounded-[10px] bg-accent-dim border border-[rgba(255,107,44,0.18)] flex items-center justify-center mb-5 text-[19px] group-hover:scale-[1.07] transition-transform">
                  {svc.icon}
                </div>
                <div className="font-[var(--font-body)] text-[.98rem] font-bold mb-2 tracking-tight">
                  {svc.name}
                </div>
                <div className="font-[var(--font-body)] text-[.83rem] font-light text-ink-mid leading-relaxed">
                  {svc.desc}
                </div>
              </div>

              <span className="absolute bottom-5 right-6 text-[14px] text-ink-dim opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                →
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
