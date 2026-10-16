"use client";

/*
 * EXACT 1:1 COPY of spartan-ai-second-section
 * HTML structure → index.html
 * JS logic → script.js
 * Uses lucide-react instead of lucide.min.js CDN
 */

import React, { useEffect, useRef } from "react";
import { TrendingUp, Rocket, Quote } from "lucide-react";

export default function GrowthSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    if (!section || !heading) return;

    // ---- script.js line 3: lucide.createIcons() → not needed, lucide-react handles it ----

    // ---- script.js lines 4-11: Split headline into <span class="word"> ----
    const words = heading.textContent!.trim().split(/\s+/);
    heading.replaceChildren(
      ...words.flatMap((word, index) => {
        const span = document.createElement("span");
        span.className = "word";
        span.textContent = word;
        return index === words.length - 1
          ? [span]
          : [span, document.createTextNode(" ")];
      })
    );

    // ---- script.js line 12: document.documentElement.classList.add('js-ready') ----
    // Scoped to .growth instead of <html> to avoid affecting other sections
    section.classList.add("js-ready");

    // ---- script.js lines 14-32: Scroll-driven word lighting ----
    const litWords = [...heading.querySelectorAll<HTMLElement>(".word")];
    let scheduled = false;

    function updateHeadline() {
      scheduled = false;
      const rect = heading!.getBoundingClientRect();
      const start = innerHeight * 0.86;
      const end = innerHeight * 0.15;
      const progress = Math.max(
        0,
        Math.min(1, (start - rect.top) / (start - end))
      );
      const visibleCount = Math.round(progress * litWords.length);
      litWords.forEach((word, index) =>
        word.classList.toggle("is-lit", index < visibleCount)
      );
    }

    function scheduleHeadline() {
      if (scheduled) return;
      scheduled = true;
      requestAnimationFrame(updateHeadline);
    }

    addEventListener("scroll", scheduleHeadline, { passive: true });
    addEventListener("resize", scheduleHeadline);
    updateHeadline();

    // ---- script.js lines 34-62: Reveal observer + animated counters ----
    const motionReduced = matchMedia("(prefers-reduced-motion: reduce)");
    const cards = [...section.querySelectorAll<HTMLElement>(".reveal")];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
          entry.target
            .querySelectorAll<HTMLElement>(".count")
            .forEach(animateCount);
        });
      },
      { threshold: 0.22 }
    );

    cards.forEach((card, index) => {
      card.style.transitionDelay = motionReduced.matches
        ? "0ms"
        : `${Math.min(index, 3) * 90}ms`;
      observer.observe(card);
    });

    function animateCount(element: HTMLElement) {
      if (motionReduced.matches) return;
      const target = Number(element.dataset.target);
      const prefix = element.dataset.prefix || "";
      const suffix = element.dataset.suffix || "";
      const start = performance.now();
      const duration = 1450;

      function frame(now: number) {
        const fraction = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - fraction, 3);
        element.textContent = prefix + Math.round(target * eased) + suffix;
        if (fraction < 1) requestAnimationFrame(frame);
      }

      requestAnimationFrame(frame);
    }

    return () => {
      removeEventListener("scroll", scheduleHeadline);
      removeEventListener("resize", scheduleHeadline);
      observer.disconnect();
    };
  }, []);

  /* =====================================================================
   * JSX below is an EXACT copy of index.html lines 16-62
   * Only differences:
   *   - class → className
   *   - <i data-lucide="..."> → <TrendingUp />, <Rocket />, <Quote />
   *   - asset paths: assets/ → /assets/
   *   - self-closing tags
   * ===================================================================== */
  return (
    <section
      ref={sectionRef}
      className="growth"
      aria-labelledby="growth-title"
    >
      <div className="growth-inner">
        {/* index.html lines 18-21 */}
        <div className="intro">
          <h2
            ref={headingRef}
            id="growth-title"
            className="headline"
          >
            Automate the manual, accelerate the future. Our custom AI solutions
            deliver measurable growth and operational excellence.
          </h2>
          <p>
            Empowering teams with intelligent tools that turn complex data into
            actionable business outcomes daily.
          </p>
        </div>

        {/* index.html lines 22-55: metrics grid */}
        <div className="metrics">
          {/* line 23-29: revenue card */}
          <article
            className="metric revenue reveal"
            aria-label="Project experience"
          >
            <div>
              <span className="icon-tile">
                <TrendingUp aria-hidden="true" />
              </span>
              <strong
                className="capability-label"
                data-target="45"
                data-prefix="$"
                data-suffix="M"
              >
                25+
              </strong>
            </div>
            <p>
              25+ demo projects across branding, websites and software.
            </p>
          </article>

          {/* line 30-41: middle column (agents + speed) */}
          <div className="metric-middle">
            <article
              className="metric agents reveal"
              aria-label="Demo client portfolio"
            >
              <div className="avatars" aria-hidden="true">
                <img
                  src="/assets/avatar-1.jpg"
                  alt=""
                  width={52}
                  height={52}
                />
                <img
                  src="/assets/avatar-2.jpg"
                  alt=""
                  width={52}
                  height={52}
                />
                <img
                  src="/assets/avatar-3.jpg"
                  alt=""
                  width={52}
                  height={52}
                />
                <img
                  src="/assets/avatar-4.jpg"
                  alt=""
                  width={52}
                  height={52}
                />
              </div>
              <p>
                <strong>15+</strong> demo clients
              </p>
            </article>
            <article className="metric speed reveal">
              <strong
                className="capability-label"
                data-target="5"
                data-suffix="x"
              >
                4
              </strong>
              <p>Creative and technical team members.</p>
            </article>
          </div>

          {/* line 42-49: inference card */}
          <article className="metric inference reveal">
            <div
              className="inference-ring"
              role="img"
              aria-label="Intelligent automation"
            >
              <div className="ring-rays" aria-hidden="true"></div>
              <span className="ring-center">
                <Rocket aria-hidden="true" />
              </span>
              <span
                className="ring-number"
                data-target="90"
                data-suffix="%"
              >
                AI
              </span>
            </div>
            <div className="inference-copy">
              <h3>Intelligent automation</h3>
              <p>
                Purpose-built tools for everyday business workflows.
              </p>
            </div>
          </article>

          {/* line 50-54: quote card */}
          <article className="metric quote-card reveal">
            <div className="quote-top">
              <Quote aria-hidden="true" />
              <img
                src="/assets/logo.svg"
                alt="Wazemtech"
                width={63}
                height={19}
              />
            </div>
            <blockquote>
              We bring creativity and technical expertise together to build
              digital experiences that communicate your brand.
            </blockquote>
            <p className="credit">&bull; &nbsp;Wazemtech</p>
          </article>
        </div>
      </div>
    </section>
  );
}
