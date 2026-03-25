"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "What is Shata and how does it work?",
    a: "Shata is an all-in-one platform where users can easily book services for events such as birthdays, weddings, corporate functions, and more. You can choose event types, select services like photography or catering, and manage everything from one place.",
  },
  {
    q: "Can I book multiple services at once?",
    a: "Yes! Shata lets you bundle photography, catering, decoration, and event planning into a single booking. Mix and match services to build the perfect package for your celebration.",
  },
  {
    q: "How do I become a Shata Partner?",
    a: "Visit our partner page or contact us at info@shata.in. We onboard verified photographers, caterers, decorators, and planners across 76+ cities in India.",
  },
  {
    q: "How do I track my event booking status?",
    a: "Once you've placed a booking, track every detail in real time through the Shata app — from vendor confirmation to day-of updates.",
  },
  {
    q: "What is the cancellation policy?",
    a: "Cancellation terms vary by vendor and service. You can review the specific policy for each booking before confirming. For assistance, reach out to our 24/7 support.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="border-b border-[rgba(60,35,10,0.09)] last:border-b-0"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-5 px-1 text-left bg-transparent border-none cursor-pointer group"
      >
        <span className="font-[var(--font-body)] text-[.95rem] font-semibold text-ink tracking-tight group-hover:text-accent transition-colors">
          {q}
        </span>
        <span
          className="flex-shrink-0 w-6 h-6 rounded-full border border-[rgba(60,35,10,0.14)] flex items-center justify-center text-ink-mid text-xs transition-transform duration-300"
          style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
        >
          +
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <p className="font-[var(--font-body)] text-sm font-light text-ink-mid leading-relaxed pb-5 px-1">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQ() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="py-24" ref={ref}>
      <div className="max-w-[720px] mx-auto px-[clamp(1.5rem,5vw,3rem)]">
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
              FAQ
            </span>
          </div>
          <h2 className="font-[var(--font-heading)] text-[clamp(2rem,4.5vw,3.2rem)] font-bold tracking-tight leading-tight">
            Frequently Asked{" "}
            <em className="font-normal text-ink-mid">Questions</em>
          </h2>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="bg-bg border border-[rgba(60,35,10,0.09)] rounded-2xl px-7 py-2"
        >
          {faqs.map((faq) => (
            <FAQItem key={faq.q} q={faq.q} a={faq.a} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
