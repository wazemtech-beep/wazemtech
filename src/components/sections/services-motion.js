import { motionScope } from "./motion-scope";
export default function initialize(root) {
 const scope = motionScope();
 const { listen, requestAnimationFrame, cancelAnimationFrame, IntersectionObserver, ResizeObserver } = scope;
 'use strict';

const section = root.querySelector(".services-services");
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
root.classList.add("services-js-ready");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("services-is-visible");
    observer.unobserve(entry.target);
  });
}, {
  threshold: .08
});
section.querySelectorAll(".services-reveal, .services-section-heading").forEach(element => observer.observe(element));
section.querySelectorAll(".services-image-stack").forEach(stack => {
  stack.setAttribute('aria-label', stack.getAttribute('aria-label').replace('View next ', 'Preview ').replace(/ images*$/, ' images'));
  const setOpen = open => {
    stack.classList.toggle("services-is-open", open);
    stack.setAttribute('aria-expanded', String(open));
  };
  setOpen(false);
  listen(stack, 'pointerenter', event => {
    if (event.pointerType !== 'touch') setOpen(true);
  });
  listen(stack, 'pointerleave', () => {
    if (!stack.matches(':focus-visible')) setOpen(false);
  });
  listen(stack, 'focus', () => {
    if (stack.matches(':focus-visible')) setOpen(true);
  });
  listen(stack, 'blur', () => setOpen(false));
  listen(stack, 'click', event => {
    if (event.pointerType === 'mouse') return;
    setOpen(!stack.classList.contains("services-is-open"));
  });
  listen(stack, 'keydown', event => {
    if (event.key === 'Escape') setOpen(false);
  });
});
section.querySelectorAll(".services-divider").forEach(divider => {
  const namespace = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(namespace, 'svg');
  const path = document.createElementNS(namespace, 'path');
  svg.classList.add("services-divider-wave");
  svg.setAttribute('preserveAspectRatio', 'none');
  svg.setAttribute('aria-hidden', 'true');
  svg.append(path);
  divider.append(svg);
  divider.classList.add("services-wave-ready");
  let width = divider.clientWidth;
  let center = width / 2;
  let targetCenter = center;
  let amplitude = 0;
  let targetAmplitude = 0;
  let raf = 0;
  let previous = 0;
  function paint(now) {
    if (amplitude < .03) {
      path.setAttribute('d', `M 0 16.5 L ${width} 16.5`);
      return;
    }
    // Keep both endpoints fixed while a local ripple follows the cursor.
    let points = 'M 0 16.5';
    for (let x = 4; x < width; x += 4) {
      const distance = x - center;
      const envelope = Math.exp(-(distance * distance) / (2 * 115 * 115));
      const edge = Math.min(1, x / 40, (width - x) / 40);
      const y = 16.5 + Math.sin(distance / 19 - now * .008) * amplitude * envelope * edge;
      points += ` L ${x} ${y.toFixed(2)}`;
    }
    path.setAttribute('d', `${points} L ${width} 16.5`);
  }
  function animate(now) {
    raf = 0;
    const delta = previous ? Math.min(64, now - previous) : 16;
    previous = now;
    const ease = 1 - Math.exp(-delta / 110);
    amplitude += (targetAmplitude - amplitude) * ease;
    center += (targetCenter - center) * ease;
    paint(now);
    if (targetAmplitude > 0 || amplitude > .03) raf = requestAnimationFrame(animate);else previous = 0;
  }
  function start() {
    if (!raf) raf = requestAnimationFrame(animate);
  }
  function follow(event) {
    targetCenter = Math.max(0, Math.min(width, event.clientX - divider.getBoundingClientRect().left));
  }
  listen(divider, 'pointerenter', event => {
    if (event.pointerType === 'touch' || reducedMotion.matches) return;
    follow(event);
    center = targetCenter;
    targetAmplitude = 8;
    start();
  });
  listen(divider, 'pointermove', follow);
  listen(divider, 'pointerleave', () => {
    targetAmplitude = 0;
    start();
  });
  const resize = new ResizeObserver(() => {
    width = divider.clientWidth;
    center = Math.min(center, width);
    targetCenter = Math.min(targetCenter, width);
    svg.setAttribute('viewBox', `0 0 ${Math.max(1, width)} 33`);
    paint(performance.now());
  });
  resize.observe(divider);
  listen(reducedMotion, 'change', () => {
    if (!reducedMotion.matches) return;
    cancelAnimationFrame(raf);
    raf = 0;
    amplitude = targetAmplitude = 0;
    previous = 0;
    paint(0);
  });
  svg.setAttribute('viewBox', `0 0 ${Math.max(1, width)} 33`);
  paint(0);
});

// A low-resolution moving grayscale texture recreates the dark shader atmosphere.
const canvas = section.querySelector('canvas');
const context = canvas.getContext('2d', {
  alpha: false
});
if (!context) return () => scope.dispose();
canvas.width = 192;
canvas.height = 256;
const frame = context.createImageData(canvas.width, canvas.height);
let visible = true;
let raf = 0;
let previous = -Infinity;
function draw(now) {
  const time = reducedMotion.matches ? 0 : now * .000035;
  for (let y = 0; y < canvas.height; y++) {
    for (let x = 0; x < canvas.width; x++) {
      const u = x / 32;
      const v = y / 42;
      const wave = Math.sin(u + Math.sin(v * .7 + time)) * Math.cos(v + time) + .55 * Math.sin(u * 1.8 + v * .9 - time * .6) + .22 * Math.cos(u * 3.1 - v * 2.6 + time);
      const value = Math.max(10, Math.min(31, 18 + wave * 5));
      const offset = (y * canvas.width + x) * 4;
      frame.data[offset] = Math.round(value * .28);
      frame.data[offset + 1] = Math.round(value * 1.72);
      frame.data[offset + 2] = Math.round(value * 1.78);
      frame.data[offset + 3] = 255;
    }
  }
  context.putImageData(frame, 0, 0);
}
function animate(now) {
  raf = 0;
  if (document.hidden || !visible || reducedMotion.matches) return;
  if (now - previous > 80) {
    previous = now;
    draw(now);
  }
  raf = requestAnimationFrame(animate);
}
function sync() {
  cancelAnimationFrame(raf);
  raf = 0;
  if (!document.hidden && visible && !reducedMotion.matches) raf = requestAnimationFrame(animate);else if (reducedMotion.matches) draw(0);
}
new IntersectionObserver(([entry]) => {
  visible = entry.isIntersecting;
  sync();
}).observe(section);
listen(document, 'visibilitychange', sync);
listen(reducedMotion, 'change', sync);
draw(0);
sync();
 return () => { scope.dispose(); root.querySelectorAll('.services-divider-wave').forEach(el=>el.remove());  };
}
