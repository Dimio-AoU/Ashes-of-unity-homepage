/* ============================================
   ASHES OF UNITY — SCRIPT.JS (Safe Version)
   ============================================
   • Never intercepts link clicks.
   • Only passive UI: reveal-on-scroll + optional fade-out.
   ============================================ */

document.addEventListener("DOMContentLoaded", () => {
  // Reveal on scroll
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-in");
            obs.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("reveal-in"));
  }
});

// Optional: subtle page fade when navigating (non-blocking)
document.addEventListener("click", (e) => {
  const a = e.target.closest("a");
  if (!a) return;
  if (a.target === "_blank" || a.hasAttribute("download")) return;
  const url = new URL(a.href, location.href);
  if (url.origin !== location.origin) return;
  if (url.hash && url.pathname === location.pathname) return; // in-page anchor
  document.body.classList.add("page-fade");
});