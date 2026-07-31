"use client";

import { useEffect, useMemo, useState } from "react";
import Particles from "@tsparticles/react";
import { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export default function ChipBackground() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const options = useMemo(
    () => ({
      fullScreen: {
        enable: true,
        zIndex: -1,
      },
      background: {
        color: "#070b14",
      },
      fpsLimit: 60,
      particles: {
        number: {
          value: 80,
        },
        color: {
          value: "#22d3ee",
        },
        links: {
          enable: true,
          color: "#22d3ee",
          distance: 160,
          opacity: 0.25,
          width: 1,
        },
        move: {
          enable: true,
          speed: 1,
        },
        opacity: {
          value: 0.5,
        },
        size: {
          value: { min: 1, max: 3 },
        },
      },
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: "grab",
          },
        },
        modes: {
          grab: {
            distance: 180,
            links: {
              opacity: 0.8,
            },
          },
        },
      },
    }),
    []
  );

  if (!init) return null;

  return <Particles id="tsparticles" options={options} />;
}