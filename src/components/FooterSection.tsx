"use client";

import { useEffect, useRef } from "react";
import { CirclePlay } from "lucide-react";

const columns = [
  { label: "Main", links: [["Home", "#hero"], ["Works", "#work-title"], ["Services", "#section-services"]] },
  { label: "Links", links: [["About", "#about"], ["FAQs", "#faq"], ["Contact", "#footer"]] },
];

export default function FooterSection() {
  const footer = useRef<HTMLElement>(null);
  const wordmark = useRef<HTMLDivElement>(null);
  const name = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const root = footer.current;
    const mark = wordmark.current;
    const text = name.current;
    if (!root || !mark || !text) return;
    let active = true;
    const fit = () => {
      if (!active) return;
      const scale = mark.clientWidth / Math.max(1, text.offsetWidth);
      text.style.setProperty("--wordmark-scale", String(scale));
      mark.style.height = `${text.offsetHeight * scale}px`;
    };
    const resize = new ResizeObserver(fit);
    resize.observe(mark);
    fit();
    document.fonts.ready.then(fit);
    root.classList.add("footer-motion-ready");
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: .12 });
    root.querySelectorAll(".footer-reveal").forEach(el => observer.observe(el));
    return () => { active = false; resize.disconnect(); observer.disconnect(); root.classList.remove("footer-motion-ready"); };
  }, []);

  return (
    <footer ref={footer} className="agency-footer" id="footer">
      <div className="agency-footer-top">
        <div className="agency-footer-copy footer-reveal">
          <h2>{["Let's", "work", "together."].map((word, i) => <span key={word} style={{ transitionDelay: `${i * 90}ms` }}>{word}{i < 2 ? " " : ""}</span>)}</h2>
          <p>Brand, web, and product design. Always happy to talk, even early.</p>
          <div className="agency-footer-contact">
            <div className="agency-footer-socials" aria-label="Social platforms">
              <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" title="Facebook profile pending" aria-label="Facebook"><img src="/assets/social-facebook.svg" width={20} height={20} alt="" /></a>
              <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" title="LinkedIn profile pending" aria-label="LinkedIn"><img src="/assets/social-linkedin.svg" width={20} height={20} alt="" /></a>
              <a href="https://x.com/" target="_blank" rel="noopener noreferrer" title="X profile pending" aria-label="X"><img src="/assets/social-x.svg" width={20} height={20} alt="" /></a>
              <a href="https://youtube.com/" target="_blank" rel="noopener noreferrer" title="YouTube profile pending" aria-label="YouTube"><CirclePlay size={20} /></a>
            </div>
            {/* Replace this draft address with the agency's verified email before publishing. */}
            <a className="agency-footer-email" href="mailto:hello@wazemtech.com">hello@wazemtech.com</a>
          </div>
        </div>
        <div className="agency-footer-links footer-reveal">
          {columns.map(column => (
            <nav key={column.label} aria-label={`Footer ${column.label}`}>
              <p>{column.label}</p>
              {column.links.map(([label, href]) => <a key={label} href={href}><span>{label}</span><span aria-hidden="true">{label}</span></a>)}
            </nav>
          ))}
        </div>
      </div>
      <div ref={wordmark} className="agency-footer-wordmark footer-reveal" aria-label="Wazemtech">
        <span ref={name} aria-hidden="true">Wazemtech</span>
        <div className="agency-footer-blur" aria-hidden="true" />
      </div>
    </footer>
  );
}
