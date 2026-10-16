import { motionScope } from "./motion-scope";
export default function initialize(root) {
 const scope = motionScope();
 const { listen, requestAnimationFrame, cancelAnimationFrame, IntersectionObserver, ResizeObserver } = scope;
 'use strict';

const section = root.querySelector(".work-work-section");
const heading = section.querySelector(".work-work-heading");
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
root.classList.add("work-js-ready");
const reveals = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("work-is-visible");
    reveals.unobserve(entry.target);
  });
}, {
  threshold: .08,
  rootMargin: '0px 0px -15px 0px'
});
section.querySelectorAll(".work-reveal").forEach(element => reveals.observe(element));

// Shrink the sticky heading as the image rows pass in front of it.
let pending = false;
function updateHeading() {
  pending = false;
  if (reduceMotion.matches) {
    heading.style.removeProperty('--heading-scale');
    return;
  }
  const top = section.getBoundingClientRect().top;
  const progress = Math.max(0, Math.min(1, (innerHeight * .35 - top) / (innerHeight * 1.4)));
  heading.style.setProperty('--heading-scale', (1 - progress * .25).toFixed(4));
}
function scheduleUpdate() {
  if (pending) return;
  pending = true;
  requestAnimationFrame(updateHeading);
}
listen(window, 'scroll', scheduleUpdate, {
  passive: true
});
listen(window, 'resize', scheduleUpdate);
listen(reduceMotion, 'change', scheduleUpdate);
document.fonts.ready.then(scheduleUpdate);
scheduleUpdate();
 return () => { scope.dispose();   };
}
