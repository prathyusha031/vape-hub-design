"use client";

/** Signals that the visitor has passed the 21+ gate, so cinematic intros can start. */
declare global {
  interface Window {
    __vhEntered?: boolean;
  }
}

export function signalEnter() {
  window.__vhEntered = true;
  window.dispatchEvent(new Event("vh:enter"));
}

export function onEnter(cb: () => void) {
  if (window.__vhEntered) {
    cb();
    return () => {};
  }
  const h = () => cb();
  window.addEventListener("vh:enter", h, { once: true });
  return () => window.removeEventListener("vh:enter", h);
}

export function setScrollLock(locked: boolean) {
  document.documentElement.style.overflow = locked ? "hidden" : "";
  window.dispatchEvent(new CustomEvent("vh:scroll-lock", { detail: locked }));
}
