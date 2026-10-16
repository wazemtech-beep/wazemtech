"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { ReactNode, useEffect } from "react";

function LenisAnchorHandler() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      if (!href || !href.startsWith("#") || href === "#") return;

      let targetEl: HTMLElement | null = null;
      try {
        targetEl = document.querySelector<HTMLElement>(href);
      } catch {
        targetEl = null;
      }

      // Friendly fallback mapping for common nav aliases in the site
      if (!targetEl) {
        if (href === "#contact") {
          targetEl = document.getElementById("footer");
        } else if (href === "#service" || href === "#services") {
          targetEl =
            document.getElementById("section-services") ||
            document.getElementById("services-title");
        } else if (href === "#portfolio" || href === "#work") {
          targetEl =
            document.getElementById("work-title") ||
            document.querySelector(".section-work");
        } else if (href === "#team") {
          targetEl =
            document.getElementById("team-title") ||
            document.querySelector(".section-team");
        } else if (href === "#process") {
          targetEl =
            document.getElementById("process-title") ||
            document.querySelector(".section-process");
        }
      }

      if (targetEl) {
        e.preventDefault();
        lenis.scrollTo(targetEl, {
          offset: -40,
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      }
    };

    document.addEventListener("click", handleAnchorClick, { passive: false });
    return () => {
      document.removeEventListener("click", handleAnchorClick);
    };
  }, [lenis]);

  return null;
}

interface SmoothScrollProps {
  children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.08,
        duration: 1.2,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.2,
        infinite: false,
      }}
    >
      <LenisAnchorHandler />
      {children}
    </ReactLenis>
  );
}
