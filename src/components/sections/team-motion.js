import { motionScope } from "./motion-scope";
export default function initialize(root) {
 const scope = motionScope();
 const { listen, requestAnimationFrame, cancelAnimationFrame, IntersectionObserver, ResizeObserver } = scope;
 'use strict';

const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!#%';
const running = new Map();
function scramble(element) {
  const text = element.dataset.text;
  if (reduceMotion.matches) {
    element.textContent = text;
    return;
  }
  cancelAnimationFrame(running.get(element));
  const start = performance.now();
  let previous = 0;
  function frame(now) {
    const progress = Math.min(1, (now - start) / 750);
    if (now - previous >= 45 || progress === 1) {
      previous = now;
      const settled = Math.floor(progress * text.length);
      element.textContent = [...text].map((character, index) => {
        if (index < settled || character === ' ') return character;
        return alphabet[Math.floor(Math.random() * alphabet.length)];
      }).join('');
    }
    if (progress < 1) running.set(element, requestAnimationFrame(frame));else {
      element.textContent = text;
      running.delete(element);
    }
  }
  running.set(element, requestAnimationFrame(frame));
}
const appear = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    appear.unobserve(entry.target);
    scramble(entry.target);
  });
}, {
  threshold: .5
});
document.fonts.ready.then(() => {
  root.querySelectorAll(".team-scramble").forEach(element => appear.observe(element));
});
listen(reduceMotion, 'change', () => {
  if (!reduceMotion.matches) return;
  running.forEach((frame, element) => {
    cancelAnimationFrame(frame);
    element.textContent = element.dataset.text;
  });
  running.clear();
});
 return () => { scope.dispose();   };
}
