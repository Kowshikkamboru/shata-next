"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function CinematicCard() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<SVGCircleElement>(null);
  const ringValRef = useRef<HTMLDivElement>(null);
  const badge1Ref = useRef<HTMLDivElement>(null);
  const badge2Ref = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const [ringAnimated, setRingAnimated] = useState(false);

  const animateRing = useCallback(() => {
    if (ringAnimated) return;
    setRingAnimated(true);
    const fg = ringRef.current;
    const val = ringValRef.current;
    if (fg) fg.style.strokeDashoffset = "60";
    let start: number | null = null;
    const target = 28;
    function step(ts: number) {
      if (!start) start = ts;
      const pct = Math.min((ts - start) / 1400, 1);
      const count = Math.round(pct * target);
      if (val) val.textContent = String(count);
      if (pct < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
    setTimeout(() => badge1Ref.current?.classList.add("show"), 600);
    setTimeout(() => badge2Ref.current?.classList.add("show"), 1000);
  }, [ringAnimated]);

  useEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    const bgText = bgTextRef.current;
    const content = contentRef.current;
    const cta = ctaRef.current;
    if (!section || !card || !bgText || !content || !cta) return;

    const isMob = window.innerWidth < 900;
    const startW = isMob ? 88 : 80;
    const startH = isMob ? 88 : 80;

    ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        const pct = self.progress;

        // Phase 0–0.18: bg text + card slide in
        const p0 = Math.min(pct / 0.18, 1);
        bgText.style.transform = `scale(${1 + p0 * 0.12})`;
        bgText.style.opacity = String(1 - p0 * 0.85);
        bgText.style.filter = `blur(${p0 * 16}px)`;

        if (pct < 0.18) {
          const slide = 1 - p0;
          card.style.transform = `translateY(${slide * 110}vh)`;
          card.style.width = startW + "vw";
          card.style.height = startH + "vh";
          card.style.borderRadius = isMob ? "28px" : "36px";
          content.classList.remove("visible");
        } else if (pct < 0.45) {
          const p1 = (pct - 0.18) / 0.27;
          card.style.transform = "translateY(0)";
          card.style.width = startW + p1 * (100 - startW) + "vw";
          card.style.height = startH + p1 * (100 - startH) + "vh";
          const br = isMob ? 28 - p1 * 28 : 36 - p1 * 36;
          card.style.borderRadius = br + "px";
          content.classList.add("visible");
          cta.classList.remove("show");
          if (p1 > 0.5) animateRing();
        } else if (pct < 0.75) {
          card.style.width = "100vw";
          card.style.height = "100vh";
          card.style.borderRadius = "0px";
          card.style.transform = "translateY(0)";
          content.classList.add("visible");
          cta.classList.remove("show");
          animateRing();
        } else if (pct < 0.9) {
          const p2 = (pct - 0.75) / 0.15;
          card.style.width = 100 - p2 * (100 - startW) + "vw";
          card.style.height = 100 - p2 * (100 - startH) + "vh";
          card.style.borderRadius = p2 * (isMob ? 28 : 36) + "px";
          card.style.transform = "translateY(0)";
          content.style.opacity = String(1 - p2);
          cta.classList.toggle("show", p2 > 0.35);
        } else {
          const p3 = (pct - 0.9) / 0.1;
          card.style.transform = `translateY(-${p3 * 110}vh)`;
          card.style.width = startW + "vw";
          card.style.height = startH + "vh";
          card.style.borderRadius = isMob ? "28px" : "36px";
          content.style.opacity = "0";
          cta.classList.remove("show");
        }
      },
    });

    // Card sheen on mouse
    const onCardMove = (e: MouseEvent) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", e.clientX - r.left + "px");
      card.style.setProperty("--my", e.clientY - r.top + "px");
    };
    card.addEventListener("mousemove", onCardMove);

    // Phone 3D tilt
    const phone = phoneRef.current;
    const onPhoneTilt = (e: MouseEvent) => {
      if (!phone) return;
      const xv = (e.clientX / window.innerWidth - 0.5) * 2;
      const yv = (e.clientY / window.innerHeight - 0.5) * 2;
      phone.style.transform = `rotateY(${xv * 10}deg) rotateX(${-yv * 10}deg)`;
      phone.style.transition = "transform 1s cubic-bezier(.25,.4,.25,1)";
    };
    document.addEventListener("mousemove", onPhoneTilt);

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      card.removeEventListener("mousemove", onCardMove);
      document.removeEventListener("mousemove", onPhoneTilt);
    };
  }, [animateRing]);

  return (
    <section id="cinematic" ref={sectionRef} className="relative h-[600vh]">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        {/* Background Text */}
        <div
          ref={bgTextRef}
          className="absolute inset-0 z-[1] flex flex-col items-center justify-center text-center p-4"
          style={{ willChange: "transform, opacity" }}
        >
          <div className="font-[var(--font-heading)] text-[clamp(2.8rem,6vw,5.5rem)] font-semibold leading-[0.95] tracking-[-2px] text-ink">
            Your event,
          </div>
          <div
            className="font-[var(--font-heading)] text-[clamp(2.8rem,6vw,5.5rem)] font-bold italic leading-[0.95] tracking-[-2px]"
            style={{
              background: "linear-gradient(180deg, var(--color-ink) 0%, rgba(26,16,9,0.4) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            expertly handled.
          </div>
        </div>

        {/* The Card */}
        <div
          ref={cardRef}
          className="absolute z-10 flex items-center justify-center overflow-hidden"
          style={{
            willChange: "transform, width, height, border-radius",
            background: "linear-gradient(145deg, #2A1A08 0%, #0F0904 100%)",
            boxShadow:
              "0 60px 120px -30px rgba(0,0,0,0.55), 0 20px 40px -15px rgba(0,0,0,0.4), inset 0 1px 2px rgba(255,255,255,0.12), inset 0 -2px 4px rgba(0,0,0,0.6)",
            border: "1px solid rgba(255,255,255,0.04)",
          }}
        >
          {/* Sheen */}
          <div
            className="absolute inset-0 pointer-events-none z-50"
            style={{
              background:
                "radial-gradient(700px circle at var(--mx, 50%) var(--my, 50%), rgba(255,255,255,0.045) 0%, transparent 45%)",
              mixBlendMode: "screen",
              borderRadius: "inherit",
            }}
          />

          {/* Card Content */}
          <div
            ref={contentRef}
            className="relative z-[5] w-full h-full grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center px-[clamp(1.5rem,4vw,3.5rem)] gap-[clamp(1rem,3vw,2.5rem)] opacity-0 transition-opacity duration-400"
            style={{ transitionDelay: "0.1s" }}
          >
            {/* Left Text */}
            <div className="hidden md:block">
              <h3 className="font-[var(--font-heading)] italic text-[clamp(1.4rem,2.5vw,2.2rem)] font-semibold text-white leading-tight mb-3 tracking-tight">
                Accountability,
                <br />
                beautifully designed.
              </h3>
              <p className="font-[var(--font-body)] text-[clamp(.8rem,1.2vw,.95rem)] text-[rgba(255,240,220,0.55)] leading-relaxed font-light">
                <strong className="text-[rgba(255,240,220,0.9)] font-semibold">
                  Shata
                </strong>{" "}
                connects you with verified photographers, caterers, decorators,
                and event planners — with real portfolios, instant booking, and
                end-to-end support for every celebration.
              </p>
            </div>

            {/* Phone Mockup */}
            <div className="relative w-[230px] flex-shrink-0 mx-auto" style={{ perspective: "1000px" }}>
              <div
                ref={phoneRef}
                className="phone-body w-[230px] h-[470px] rounded-[2.5rem] bg-[#0d0d0d] relative overflow-visible"
                style={{
                  boxShadow:
                    "inset 0 0 0 2px #48484a, inset 0 0 0 6px #000, 0 40px 80px -15px rgba(0,0,0,0.8), 0 12px 24px -5px rgba(0,0,0,0.6)",
                }}
              >
                {/* Hardware Buttons */}
                <div className="absolute left-[-2px] top-[88px] w-[3px] h-[22px] rounded-l bg-gradient-to-r from-[#3a3a3a] to-[#151515] shadow-[-2px_0_4px_rgba(0,0,0,0.8)]" />
                <div className="absolute left-[-2px] top-[120px] w-[3px] h-[40px] rounded-l bg-gradient-to-r from-[#3a3a3a] to-[#151515] shadow-[-2px_0_4px_rgba(0,0,0,0.8)]" />
                <div className="absolute right-[-2px] top-[130px] w-[3px] h-[60px] rounded-r bg-gradient-to-r from-[#3a3a3a] to-[#151515] shadow-[2px_0_4px_rgba(0,0,0,0.8)]" />

                {/* Screen */}
                <div
                  className="absolute inset-[6px] bg-[#060304] rounded-[2rem] overflow-hidden text-white"
                  style={{ boxShadow: "inset 0 0 12px rgba(0,0,0,.9)" }}
                >
                  {/* Glare */}
                  <div
                    className="absolute inset-0 z-40 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(108deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0) 45%)",
                    }}
                  />
                  {/* Dynamic Island */}
                  <div className="absolute top-[5px] left-1/2 -translate-x-1/2 w-[90px] h-[25px] bg-black rounded-full z-50 flex items-center justify-end pr-2.5">
                    <div className="w-[5px] h-[5px] bg-green-500 rounded-full shadow-[0_0_6px_rgba(34,197,94,0.8)] animate-pulse" />
                  </div>

                  {/* App UI */}
                  <div className="relative h-full pt-[38px] px-3.5 pb-[22px] flex flex-col z-10">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <div className="font-[var(--font-mono)] text-[8px] tracking-[1.5px] uppercase text-[rgba(255,220,180,0.5)] mb-0.5">
                          Today
                        </div>
                        <div className="font-[var(--font-body)] text-[15px] font-bold">
                          My Events
                        </div>
                      </div>
                      <div className="w-[30px] h-[30px] rounded-full bg-[rgba(255,107,44,0.2)] border border-[rgba(255,107,44,0.35)] flex items-center justify-center text-[10px] font-bold text-[#FF9F6A] font-[var(--font-mono)]">
                        AP
                      </div>
                    </div>

                    {/* Ring */}
                    <div className="relative w-[130px] h-[130px] mx-auto mb-3.5">
                      <svg
                        viewBox="0 0 100 100"
                        className="w-full h-full"
                      >
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          fill="none"
                          stroke="rgba(255,255,255,0.04)"
                          strokeWidth="10"
                        />
                        <circle
                          ref={ringRef}
                          cx="50"
                          cy="50"
                          r="40"
                          fill="none"
                          stroke="var(--color-accent)"
                          strokeWidth="10"
                          strokeLinecap="round"
                          style={{
                            transform: "rotate(-90deg)",
                            transformOrigin: "center",
                            strokeDasharray: 314,
                            strokeDashoffset: 314,
                            transition:
                              "stroke-dashoffset 1.4s 1.6s cubic-bezier(.4,0,.2,1)",
                          }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div
                          ref={ringValRef}
                          className="font-[var(--font-heading)] text-[2.2rem] font-bold text-white tracking-tight"
                        >
                          0
                        </div>
                        <div className="font-[var(--font-mono)] text-[7px] tracking-[1.5px] uppercase text-[rgba(255,200,160,0.45)]">
                          Days to Go
                        </div>
                      </div>
                    </div>

                    {/* Widgets */}
                    {[
                      { emoji: "📸", status: "Booked", color: "255,107,44" },
                      { emoji: "🍽️", status: "Confirmed", color: "200,146,42" },
                    ].map((w) => (
                      <div
                        key={w.status}
                        className="bg-[rgba(255,255,255,0.035)] border border-[rgba(255,255,255,0.06)] rounded-xl p-2 px-2.5 flex items-center gap-2 mb-1.5"
                        style={{
                          boxShadow:
                            "0 4px 12px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.04)",
                        }}
                      >
                        <div
                          className="w-[30px] h-[30px] rounded-lg flex items-center justify-center flex-shrink-0 text-[13px]"
                          style={{
                            background: `rgba(${w.color},0.15)`,
                            border: `1px solid rgba(${w.color},0.25)`,
                          }}
                        >
                          {w.emoji}
                        </div>
                        <div className="flex flex-col gap-1 flex-1">
                          <div className="h-[7px] rounded bg-[rgba(255,255,255,0.12)] w-[70%]" />
                          <div className="h-[7px] rounded bg-[rgba(255,255,255,0.12)] w-[45%]" />
                        </div>
                        <div className="font-[var(--font-mono)] text-[9px] text-[rgba(255,200,160,0.5)]">
                          {w.status}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Home bar */}
                  <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-[90px] h-[3px] bg-[rgba(255,255,255,0.18)] rounded-full" />
                </div>
              </div>

              {/* Floating Badges */}
              <div
                ref={badge1Ref}
                className="f-badge absolute z-30 top-[15%] left-[-90px] flex items-center gap-2.5 px-3.5 py-2.5 rounded-[14px] opacity-0 translate-y-5 transition-all duration-600"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.02) 100%)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  boxShadow:
                    "0 20px 40px -10px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.15)",
                }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-[15px]"
                  style={{
                    background: "rgba(255,107,44,0.15)",
                    border: "1px solid rgba(255,107,44,0.25)",
                  }}
                >
                  🎞️
                </div>
                <div>
                  <div className="font-[var(--font-body)] text-[11px] font-bold text-white">
                    Vendor Booked
                  </div>
                  <div className="font-[var(--font-mono)] text-[8.5px] text-[rgba(255,220,180,0.45)]">
                    Photography · Confirmed
                  </div>
                </div>
              </div>

              <div
                ref={badge2Ref}
                className="f-badge absolute z-30 bottom-[22%] right-[-90px] flex items-center gap-2.5 px-3.5 py-2.5 rounded-[14px] opacity-0 translate-y-5 transition-all duration-600"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.02) 100%)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  boxShadow:
                    "0 20px 40px -10px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.15)",
                }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-[15px]"
                  style={{
                    background: "rgba(200,146,42,0.12)",
                    border: "1px solid rgba(200,146,42,0.22)",
                  }}
                >
                  ⭐
                </div>
                <div>
                  <div className="font-[var(--font-body)] text-[11px] font-bold text-white">
                    5-Star Review
                  </div>
                  <div className="font-[var(--font-mono)] text-[8.5px] text-[rgba(255,220,180,0.45)]">
                    Review submitted
                  </div>
                </div>
              </div>
            </div>

            {/* Right Brand */}
            <div className="md:block order-first md:order-last">
              <h2
                className="font-[var(--font-heading)] text-[clamp(3rem,7vw,6.5rem)] font-bold italic text-right tracking-[-2px] leading-[.9]"
                style={{
                  background: "linear-gradient(180deg, #fff 0%, #a0806a 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  filter:
                    "drop-shadow(0 12px 24px rgba(0,0,0,0.7)) drop-shadow(0 4px 8px rgba(0,0,0,0.5))",
                }}
              >
                Shata
                <br />
                <em
                  className="not-italic block text-[.65em] opacity-50 tracking-tight"
                >
                  Events
                </em>
              </h2>
            </div>
          </div>

          {/* CTA Layer */}
          <div
            ref={ctaRef}
            className="absolute inset-0 z-[8] flex flex-col items-center justify-center text-center p-8 opacity-0 pointer-events-none transition-opacity duration-500"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-6 border border-[rgba(255,255,255,0.12)]"
              style={{ background: "rgba(255,255,255,0.04)" }}
            >
              <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
              <span className="font-[var(--font-mono)] text-[10px] tracking-[1.8px] uppercase text-[rgba(255,220,180,0.55)]">
                Start Planning Today
              </span>
            </div>
            <div className="font-[var(--font-heading)] text-[clamp(2.2rem,4.5vw,3.8rem)] font-bold italic leading-none tracking-tight text-white mb-4">
              Your dream event
              <br />
              starts here.
            </div>
            <p className="font-[var(--font-body)] text-[clamp(.85rem,1.5vw,1.05rem)] text-[rgba(255,230,200,0.55)] max-w-[420px] mx-auto mb-10 leading-relaxed font-light">
              Join thousands of happy couples, families &amp; corporates who trusted
              Shata to make their moments unforgettable.
            </p>
            <div className="flex gap-4 flex-wrap justify-center">
              <a
                href="https://apps.apple.com/in/app/shata/id6743954767"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 px-5 py-3 rounded-[14px] no-underline text-[#111] hover:-translate-y-1 transition-transform"
                style={{
                  background: "linear-gradient(180deg, #fff 0%, #f0f0f0 100%)",
                  boxShadow:
                    "0 2px 4px rgba(0,0,0,0.2), 0 12px 24px -4px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,1)",
                }}
              >
                <svg fill="currentColor" viewBox="0 0 384 512" className="w-6 h-6">
                  <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
                </svg>
                <div>
                  <div className="text-[9px] font-semibold tracking-[1px] uppercase opacity-55 leading-none">Download on the</div>
                  <div className="font-[var(--font-body)] text-[15px] font-bold leading-tight">App Store</div>
                </div>
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.shata.user&hl=en_IN"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 px-5 py-3 rounded-[14px] no-underline text-white hover:-translate-y-1 transition-transform"
                style={{
                  background: "linear-gradient(180deg, #2a2a2a 0%, #191919 100%)",
                  boxShadow:
                    "0 2px 4px rgba(0,0,0,0.5), 0 12px 24px -4px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.1)",
                }}
              >
                <svg fill="currentColor" viewBox="0 0 512 512" className="w-6 h-6">
                  <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z" />
                </svg>
                <div>
                  <div className="text-[9px] font-semibold tracking-[1px] uppercase opacity-55 leading-none">Get it on</div>
                  <div className="font-[var(--font-body)] text-[15px] font-bold leading-tight">Google Play</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
