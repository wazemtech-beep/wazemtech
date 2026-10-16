"use client";

import { useEffect, useRef } from "react";

export default function AboutSection() {
  const section = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = section.current;
    if (!root) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    root.classList.add("about-motion-ready");
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: .15 });
    root.querySelectorAll(".about-reveal").forEach(el => observer.observe(el));
    const applyPreference = () => {
      if (reduced.matches) root.querySelectorAll(".about-reveal").forEach(el => el.classList.add("is-visible"));
    };
    reduced.addEventListener("change", applyPreference);
    applyPreference();
    return () => {
      observer.disconnect();
      reduced.removeEventListener("change", applyPreference);
      root.classList.remove("about-motion-ready");
    };
  }, []);

  return (
    <section ref={section} className="agency-about" id="about" aria-labelledby="about-title">
      <div className="about-layout">
        <div className="about-top">
          <p className="about-kicker about-reveal"><span aria-hidden="true" />Who we are</p>
          <h2 id="about-title" className="about-title about-reveal">
            Empowering brands with tailored web <span>development solutions</span>
          </h2>
        </div>
        <div className="about-bottom">
          <div className="about-stat about-reveal">
            <div className="about-counter" aria-label="25 plus projects, illustrative portfolio figure">
              <span className="about-digit" aria-hidden="true">
                <span className="about-roll about-roll-tens">{[0, 1, 2].map(n => <span key={n}>{n}</span>)}</span>
              </span>
              <span className="about-digit" aria-hidden="true">
                <span className="about-roll about-roll-ones">{[0, 1, 2, 3, 4, 5].map(n => <span key={n}>{n}</span>)}</span>
              </span>
              <span aria-hidden="true">+</span>
            </div>
            <p>Projects delivered</p>
            <small>Illustrative portfolio figure</small>
          </div>
          <div className="about-images">
            <figure className="about-image about-reveal">
              <img src="/sections/agenx-about/studio-collaboration.avif" width={1368} height={900} alt="Design team collaborating on a creative project" />
            </figure>
            <figure className="about-image about-reveal">
              <img src="/sections/agenx-about/studio-development.avif" width={1224} height={1400} alt="Creative team working on a digital product" />
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
