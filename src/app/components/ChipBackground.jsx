"use client";

import { useEffect, useState } from "react";

export default function ChipBackground() {
  const [mouse, setMouse] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMouse({
        x: (event.clientX / window.innerWidth) * 100,
        y: (event.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="chip-background">
      <div
        className="chip-mouse-glow"
        style={{
          left: `${mouse.x}%`,
          top: `${mouse.y}%`,
        }}
      />

      <div className="chip-grid" />
      <div className="chip-scan-line" />

      <div className="chip-center">
        <div className="chip-core">
          <div className="chip-core-inner" />
        </div>
      </div>

      <svg
        className="chip-circuits"
        viewBox="0 0 1280 800"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0 400 H280 L340 340 H580"
          className="circuit-path"
        />

        <path
          d="M700 340 H940 L1000 400 H1280"
          className="circuit-path"
        />

        <path
          d="M0 560 H220 L300 480 H580"
          className="circuit-path circuit-path-dim"
        />

        <path
          d="M700 480 H980 L1060 560 H1280"
          className="circuit-path circuit-path-dim"
        />

        <path
          d="M300 0 V180 L420 300"
          className="circuit-path circuit-path-dim"
        />

        <path
          d="M980 0 V180 L860 300"
          className="circuit-path circuit-path-dim"
        />

        <path
          d="M300 800 V620 L420 500"
          className="circuit-path circuit-path-dim"
        />

        <path
          d="M980 800 V620 L860 500"
          className="circuit-path circuit-path-dim"
        />

        <circle r="6" className="data-pulse">
          <animateMotion
            dur="5s"
            repeatCount="indefinite"
            path="M0 400 H280 L340 340 H580"
          />
        </circle>

        <circle r="5" className="data-pulse">
          <animateMotion
            dur="6s"
            repeatCount="indefinite"
            path="M1280 560 H1060 L980 480 H700"
          />
        </circle>

        <circle r="5" className="data-pulse">
          <animateMotion
            dur="7s"
            repeatCount="indefinite"
            path="M300 0 V180 L420 300"
          />
        </circle>
      </svg>

      <div className="chip-vignette" />
    </div>
  );
}