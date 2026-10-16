"use client";

import { useEffect, useRef, useState } from "react";
import { Plus, SquarePlus } from "lucide-react";

const questions = [
  ["What services does your agency provide?", "Wazemtech brings together brand identity, web design and development, interaction design, and custom AI and software solutions."],
  ["How do you approach a new project?", "We start by understanding your business, audience and goals. Together we define the scope and direction, then move through design, development, feedback and launch."],
  ["What is the typical timeline for a project?", "The timeline depends on the scope, complexity and feedback required. We agree on milestones and a delivery schedule before the project begins."],
  ["How do you handle revisions?", "We collect feedback at agreed checkpoints and refine the work together. Revision rounds and any additional scope are outlined in your project proposal."],
  ["How much do your services cost?", "Each project is quoted around its requirements. Share your goals, deliverables and budget so we can prepare a clear scope and tailored estimate."],
];

export default function FaqSection() {
  const root = useRef<HTMLElement>(null);
  const [open, setOpen] = useState<Set<number>>(new Set());
  const [visible, setVisible] = useState<Set<number>>(new Set());
  useEffect(() => {
    const section = root.current;
    if (!section) return;
    section.classList.add("faq-motion-ready");
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const index = (entry.target as HTMLElement).dataset.faqIndex;
        if (index !== undefined) setVisible(previous => new Set(previous).add(Number(index)));
        else entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: .08 });
    section.querySelectorAll(".agency-faq-reveal").forEach(el => observer.observe(el));
    return () => { observer.disconnect(); section.classList.remove("faq-motion-ready"); };
  }, []);

  function toggle(index: number) {
    setOpen(previous => {
      const next = new Set(previous);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }

  return (
    <section ref={root} className="agency-faq" id="faq" aria-labelledby="faq-title">
      <div className="agency-faq-layout">
        <header className="agency-faq-heading agency-faq-reveal">
          <p className="agency-faq-tag"><SquarePlus size={16} aria-hidden="true" />FAQs</p>
          <h2 id="faq-title">Got questions?<br />We&apos;ve got answers</h2>
          <p>Everything you need to know about our process, pricing, and how we work together</p>
        </header>
        <div className="agency-faq-list">
          {questions.map(([question, answer], index) => (
            <article key={question} data-faq-index={index} className={`agency-faq-item agency-faq-reveal${visible.has(index) ? " is-visible" : ""}${open.has(index) ? " is-open" : ""}`}>
              <h3>
                <button type="button" id={`faq-question-${index}`} aria-expanded={open.has(index)} aria-controls={`faq-answer-${index}`} onClick={() => toggle(index)}>
                  <span>{question}</span><span className="agency-faq-plus"><Plus size={20} aria-hidden="true" /></span>
                </button>
              </h3>
              <div className="agency-faq-answer" id={`faq-answer-${index}`} role="region" aria-labelledby={`faq-question-${index}`} aria-hidden={!open.has(index)} inert={!open.has(index)}>
                <div><p>{answer}</p></div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
