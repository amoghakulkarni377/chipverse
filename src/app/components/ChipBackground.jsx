"use client";

import { useEffect, useRef } from "react";

export default function ChipBackground() {
  const backgroundRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (!backgroundRef.current) return;

      backgroundRef.current.style.setProperty(
        "--mouse-x",
        `${event.clientX}px`
      );

      backgroundRef.current.style.setProperty(
        "--mouse-y",
        `${event.clientY}px`
      );
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={backgroundRef}
      className="chip-background"
      aria-hidden="true"
    >
      <div className="chip-grid" />

      <div className="circuit circuit-one">
        <span />
        <span />
        <span />
      </div>

      <div className="circuit circuit-two">
        <span />
        <span />
        <span />
      </div>

      <div className="circuit circuit-three">
        <span />
        <span />
        <span />
      </div>

      <div className="chip-core">
        <div className="chip-core-inner">
          <span>CV</span>
        </div>
      </div>

      <div className="mouse-glow" />
      <div className="background-overlay" />
    </div>
  );
}