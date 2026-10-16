// Each mounted section owns and disposes its listeners, observers and animation frames.
export function motionScope() {
  let disposed = false;
  const listeners = [];
  const observers = [];
  const frames = new Set();
  const observe = Base => class extends Base {
    constructor(callback, options) {
      super((...args) => { if (!disposed) callback(...args); }, options);
      observers.push(this);
    }
    observe(...args) { if (!disposed) super.observe(...args); }
  };
  return {
    listen(target, name, callback, options) {
      const guarded = (...args) => { if (!disposed) callback(...args); };
      target.addEventListener(name, guarded, options);
      listeners.push(() => target.removeEventListener(name, guarded, options));
    },
    requestAnimationFrame(callback) {
      if (disposed) return 0;
      const id = window.requestAnimationFrame(time => { frames.delete(id); if (!disposed) callback(time); });
      frames.add(id);
      return id;
    },
    cancelAnimationFrame(id) { window.cancelAnimationFrame(id); frames.delete(id); },
    IntersectionObserver: observe(window.IntersectionObserver),
    ResizeObserver: observe(window.ResizeObserver),
    dispose() {
      disposed = true;
      listeners.forEach(remove => remove());
      observers.forEach(observer => observer.disconnect());
      frames.forEach(id => window.cancelAnimationFrame(id));
    },
  };
}
