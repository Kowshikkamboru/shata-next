"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const lineReveal = {
  hidden: { y: "100%", opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.9, ease: "easeOut" as const },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } },
};

export function Hero() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center text-center pt-[62px] overflow-hidden"
      ref={ref}
    >
      {/* Dot Grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(rgba(60,35,10,0.18) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
          maskImage:
            "radial-gradient(ellipse 75% 65% at 50% 50%, black, transparent)",
          WebkitMaskImage:
            "radial-gradient(ellipse 75% 65% at 50% 50%, black, transparent)",
        }}
      />

      {/* Floating Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[
          { cls: "w-[560px] h-[125px] left-[-8%] top-[19%]", deg: 11, color: "255,107,44", dur: 14, delay: 0.3 },
          { cls: "w-[460px] h-[105px] right-[-4%] top-[73%]", deg: -14, color: "200,146,42", dur: 12, delay: 0.5 },
          { cls: "w-[270px] h-[68px] left-[6%] bottom-[7%]", deg: -7, color: "180,100,20", dur: 16, delay: 0.4 },
          { cls: "w-[185px] h-[52px] right-[17%] top-[11%]", deg: 21, color: "255,107,44", dur: 10, delay: 0.6 },
          { cls: "w-[135px] h-[36px] left-[22%] top-[5%]", deg: -24, color: "200,146,42", dur: 11, delay: 0.7 },
          { cls: "w-[310px] h-[76px] right-[4%] top-[44%]", deg: 8, color: "255,140,60", dur: 13, delay: 0.55 },
        ].map((s, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-[999px] border-[1.5px] border-[rgba(60,35,10,0.1)] ${s.cls}`}
            style={{
              background: `linear-gradient(90deg, rgba(${s.color},0.12), transparent)`,
            }}
            initial={{ opacity: 0, y: -120, rotate: s.deg - 15 }}
            animate={
              inView
                ? {
                    opacity: 1,
                    y: [0, i % 2 === 0 ? -16 : 11, 0],
                    rotate: s.deg,
                  }
                : {}
            }
            transition={{
              opacity: { duration: 2, delay: s.delay, ease: [0.23, 0.86, 0.39, 0.96] },
              y: {
                duration: s.dur,
                delay: s.delay + 2,
                ease: "easeInOut",
                repeat: Infinity,
              },
              rotate: { duration: 2, delay: s.delay },
            }}
          />
        ))}
      </div>

      <div className="container relative z-[2] max-w-[1160px] mx-auto px-[clamp(1.5rem,5vw,3rem)]">
        {/* Badge */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          transition={{ delay: 0.35 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface2 border border-[rgba(60,35,10,0.14)] mb-10"
        >
          <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
          <span className="font-[var(--font-mono)] text-[10px] tracking-[1.8px] uppercase text-ink-mid">
            India&apos;s #1 Event Booking App
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="font-[var(--font-heading)] text-[clamp(3.2rem,8.5vw,7.5rem)] font-bold leading-[0.95] tracking-[-2px] mb-5 max-w-[900px] mx-auto"
        >
          <span className="block overflow-hidden">
            <motion.span variants={lineReveal} className="inline-block">
              Where Every
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              variants={lineReveal}
              className="inline-block italic text-accent"
              style={{ textShadow: "0 2px 30px rgba(255,107,44,0.15)" }}
            >
              Celebration
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span variants={lineReveal} className="inline-block">
              Becomes Legend
            </motion.span>
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          transition={{ delay: 1.15 }}
          className="font-[var(--font-body)] text-[clamp(1rem,2vw,1.2rem)] text-ink-mid max-w-[520px] mx-auto mb-11 leading-relaxed font-light"
        >
          Book photographers, caterers, decorators &amp; event planners across
          Hyderabad, Vizag, Bengaluru &amp; 76+ cities — all in one seamless
          platform.
        </motion.p>

        {/* Actions */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          transition={{ delay: 1.4 }}
          className="flex items-center justify-center gap-4 flex-wrap mb-16"
        >
          <a
            href="#cinematic"
            className="inline-flex items-center gap-2 font-[var(--font-mono)] text-[11px] font-bold tracking-[1.4px] uppercase text-white bg-ink px-6 py-3.5 rounded-[5px] no-underline hover:bg-[#2c1a06] active:scale-[.97] transition-all shadow-[0_4px_20px_rgba(26,16,9,0.2),0_1px_3px_rgba(26,16,9,0.15)]"
          >
            Explore Platform →
          </a>
          <a
            href="#how"
            className="inline-flex items-center gap-2 font-[var(--font-mono)] text-[11px] tracking-[1.4px] uppercase text-ink-mid bg-transparent border border-[rgba(60,35,10,0.14)] px-6 py-3.5 rounded-[5px] no-underline hover:border-[rgba(60,35,10,0.28)] hover:text-ink transition-all"
          >
            How It Works
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          transition={{ delay: 1.7 }}
          className="grid grid-cols-3 gap-px max-w-[520px] mx-auto bg-[rgba(60,35,10,0.14)] border border-[rgba(60,35,10,0.14)] rounded-xl overflow-hidden"
        >
          {[
            { num: "76+", accent: "", label: "Cities" },
            { num: "10K+", accent: "", label: "Events Booked" },
            { num: "4.9", accent: "★", label: "App Rating" },
          ].map((stat) => (
            <div key={stat.label} className="bg-bg p-4 text-center">
              <span className="font-[var(--font-heading)] text-[2rem] font-bold block tracking-tight">
                {stat.num}
                {stat.accent && (
                  <em className="not-italic text-accent">{stat.accent}</em>
                )}
              </span>
              <span className="font-[var(--font-mono)] text-[9px] tracking-[1.2px] uppercase text-ink-soft block mt-0.5">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.3, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
      >
        <div
          className="w-px h-11 animate-pulse"
          style={{
            background:
              "linear-gradient(to bottom, transparent, var(--color-accent))",
          }}
        />
        <span
          className="font-[var(--font-mono)] text-[8px] tracking-[2.5px] uppercase text-ink-dim"
          style={{
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
          }}
        >
          Scroll
        </span>
      </motion.div>
    </section>
  );
}
