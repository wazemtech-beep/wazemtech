import { motionScope } from "./motion-scope";
export default function initialize(root) {
 const scope = motionScope();
 const { listen, requestAnimationFrame, cancelAnimationFrame, IntersectionObserver, ResizeObserver } = scope;
 const track = root.querySelector(".process-process-track");
const panels = root.querySelector(".process-panels");
const cards = [...root.querySelectorAll(".process-panel")];
const mobile = matchMedia('(max-width: 809px)');
let active = -1;
let scheduled = false;
const reelTrack = root.querySelector(".process-reel-track");
const reelSurface = root.querySelector(".process-reel-surface");
const reelOverlay = root.querySelector(".process-reel-overlay");
const video = root.querySelector(".process-reel-video");
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const dialog = root.querySelector(".process-reel-dialog");
const popupVideo = root.querySelector(".process-popup-video");
const playButton = root.querySelector(".process-reel-play");
function updateReel() {
  const rect = reelTrack.getBoundingClientRect();
  const progress = reducedMotion.matches ? 1 : Math.max(0, Math.min(1, -rect.top / innerHeight));
  reelSurface.style.transform = `perspective(1200px) scale(${.6 + progress * .4}) rotate(${-5 * (1 - progress)}deg) rotateX(${5 * (1 - progress)}deg) rotateY(${15 * (1 - progress)}deg)`;
  reelOverlay.style.transform = `translate(-50%, -50%) perspective(1200px) scale(${2 - progress}) rotate(${-10 * (1 - progress)}deg) rotateX(${15 * (1 - progress)}deg) rotateY(${25 * (1 - progress)}deg)`;
  reelOverlay.style.setProperty('--reel-label-opacity', progress);
  reelOverlay.style.setProperty('--reel-offset', `${(1 - progress) * 500}px`);
  reelOverlay.style.setProperty('--reel-meta-opacity', Math.min(1, progress * .75));
  reelOverlay.style.setProperty('--reel-meta-offset', `${-50 * (1 - progress)}px`);
}
function activate(index) {
  if (index === active) return;
  active = index;
  cards.forEach((card, i) => {
    card.classList.toggle("process-is-active", i === index);
    card.querySelectorAll(".process-dots i").forEach((dot, j) => {
      dot.style.background = j <= index ? '#DAF1DE' : '#C8E2D680';
    });
  });
}
function update() {
  scheduled = false;
  updateReel();
  panels.style.setProperty('--image-width', mobile.matches ? 'calc(90vw - 6px)' : `${(panels.clientWidth - 15) / 2}px`);
  if (mobile.matches) return;
  const rect = track.getBoundingClientRect();
  activate(Math.max(0, Math.min(3, Math.floor(-rect.top / innerHeight + .5))));
}
function schedule() {
  if (!scheduled) {
    scheduled = true;
    requestAnimationFrame(update);
  }
}
listen(window, 'scroll', schedule, {
  passive: true
});
listen(window, 'resize', schedule);
listen(mobile, 'change', schedule);
const videoObserver = new IntersectionObserver(entries => {
  if (dialog.open) return;
  if (entries[0].isIntersecting && !reducedMotion.matches) video.play().catch(() => {});else video.pause();
}, {
  threshold: .1
});
videoObserver.observe(reelSurface);
listen(playButton, 'click', () => {
  video.pause();
  dialog.showModal();
  document.body.classList.add("process-reel-modal-open");
  popupVideo.currentTime = 0;
  popupVideo.play().catch(() => {});
});
listen(root.querySelector(".process-reel-close"), 'click', () => dialog.close());
listen(dialog, 'click', event => {
  const rect = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
});
listen(dialog, 'close', () => {
  popupVideo.pause();
  document.body.classList.remove("process-reel-modal-open");
  playButton.focus({
    preventScroll: true
  });
  const rect = reelSurface.getBoundingClientRect();
  if (!reducedMotion.matches && rect.bottom > 0 && rect.top < innerHeight) video.play().catch(() => {});
});
cards.forEach((card, index) => {
  listen(card, 'focus', () => activate(index));
  listen(card, 'click', () => activate(index));
});
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.remove("process-waiting");
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: .1
});
root.querySelectorAll(".process-reveal").forEach(el => {
  el.classList.add("process-waiting");
  observer.observe(el);
});
update();
 return () => { scope.dispose();  dialog.close(); popupVideo.pause(); video.pause(); document.body.classList.remove('process-reel-modal-open'); };
}
