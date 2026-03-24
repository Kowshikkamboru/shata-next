"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only enable on devices with fine pointer
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = 0,
      my = 0,
      rx = 0,
      ry = 0;

    const onMouseMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.left = mx + "px";
      dot.style.top = my + "px";
    };

    function animRing() {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      if (ring) {
        ring.style.left = rx + "px";
        ring.style.top = ry + "px";
      }
      requestAnimationFrame(animRing);
    }

    document.addEventListener("mousemove", onMouseMove);
    requestAnimationFrame(animRing);

    // Hover expansion
    const interactives = document.querySelectorAll(
      "a, button, .svc-card, .vcard, .step-card, .phone-body"
    );
    const enter = () => {
      if (ring) {
        ring.style.width = "46px";
        ring.style.height = "46px";
        ring.style.borderColor = "rgba(255,107,44,.65)";
      }
    };
    const leave = () => {
      if (ring) {
        ring.style.width = "30px";
        ring.style.height = "30px";
        ring.style.borderColor = "rgba(255,107,44,.45)";
      }
    };
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
    });

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="custom-cursor pointer-events-none fixed z-[9999] w-[7px] h-[7px] rounded-full -translate-x-1/2 -translate-y-1/2"
        style={{ background: "var(--color-accent)" }}
      />
      <div
        ref={ringRef}
        className="cursor-ring pointer-events-none fixed z-[9998] w-[30px] h-[30px] rounded-full -translate-x-1/2 -translate-y-1/2"
        style={{
          border: "1.5px solid rgba(255,107,44,0.45)",
          transition: "width .15s, height .15s, border-color .15s",
        }}
      />
    </>
  );
}
