console.log("Ashes of Unity site JS loaded");

document.addEventListener("DOMContentLoaded", () => {
  // Mobile nav toggle
  const nav = document.querySelector("[data-nav]");
  const toggle = document.querySelector("[data-toggle]");
  if (toggle && nav) {
    toggle.addEventListener("click", () => nav.classList.toggle("show"));
    document.querySelectorAll(".nav a").forEach(a =>
      a.addEventListener("click", () => nav.classList.remove("show"))
    );
  }

  // Smooth scroll for in-page anchors
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", e => {
      const id = link.getAttribute("href");
      if (id && id.length > 1) {
        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    });
  });

  // Title effects (toggle color + glow)
  const title = document.querySelector("h1");
  if (title) {
    title.addEventListener("click", () => {
      // remove this alert if you prefer silent toggle
      alert("The battle begins!");
      if (title.classList.contains("is-red")) {
        title.classList.remove("is-red");
        title.classList.add("is-gold");
      } else {
        title.classList.remove("is-gold");
        title.classList.add("is-red");
      }
    });
    const addGlow = () => title.classList.add("glow");
    const removeGlow = () => title.classList.remove("glow");
    title.addEventListener("mouseenter", addGlow);
    title.addEventListener("mouseleave", removeGlow);
    title.addEventListener("touchstart", () => { addGlow(); setTimeout(removeGlow, 600); }, { passive: true });
  }

  // Footer year
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
});