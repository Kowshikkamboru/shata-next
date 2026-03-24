"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "Browse & Select Your Service",
    desc: "Explore a wide range of event services like photography, catering, and full event planning — all in one place.",
  },
  {
    num: "02",
    title: "Customize Your Booking",
    desc: "Pick your date, set your budget, and choose the services you need. We tailor it to your vision.",
  },
  {
    num: "03",
    title: "Partner Match & Planning",
    desc: "Get connected with verified event partners instantly. Discuss ideas and finalize details stress-free.",
  },
  {
    num: "04",
    title: "Relax & Celebrate",
    desc: "Enjoy your big day while we handle the rest! From setup to execution, Shata ensures everything is picture-perfect.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

export function HowItWorks() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="how" className="py-24" ref={ref}>
      <div className="max-w-[1160px] mx-auto px-[clamp(1.5rem,5vw,3rem)]">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <div className="flex items-center gap-2.5 justify-center mb-3.5">
            <span className="block w-7 h-px bg-accent" />
            <span className="font-[var(--font-mono)] text-[9.5px] tracking-[3px] uppercase text-accent">
              How It Works
            </span>
          </div>
          <h2 className="font-[var(--font-heading)] text-[clamp(2rem,4.5vw,3.2rem)] font-bold tracking-tight leading-tight">
            Your seamless journey
            <br />
            <em className="font-normal text-ink-mid">with Shata</em>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-0 relative max-w-[960px] mx-auto">
          {/* Connecting line */}
          <div
            className="hidden md:block absolute top-[27px] left-[12.5%] right-[12.5%] h-px"
            style={{
              background:
                "linear-gradient(to right, var(--color-accent), rgba(255,107,44,.25), rgba(255,107,44,.25), var(--color-accent))",
            }}
          />

          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className="step-card flex flex-col items-center text-center px-6 py-4 md:py-0"
            >
              <div className="w-[54px] h-[54px] rounded-full bg-bg border border-[rgba(60,35,10,0.14)] flex items-center justify-center font-[var(--font-mono)] text-[13px] font-bold text-accent mb-6 relative z-[1] transition-all duration-300 hover:bg-accent hover:text-white hover:border-accent hover:scale-[1.08] hover:shadow-[0_0_28px_rgba(255,107,44,0.3)]"
                style={{ boxShadow: "0 2px 12px rgba(60,35,10,0.06)" }}
              >
                {step.num}
              </div>
              <div className="font-[var(--font-body)] text-[.95rem] font-bold mb-2">
                {step.title}
              </div>
              <div className="font-[var(--font-body)] text-[.83rem] font-light text-ink-mid leading-relaxed">
                {step.desc}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
