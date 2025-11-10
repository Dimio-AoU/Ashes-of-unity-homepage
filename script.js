console.log("Ashes of Unity script loaded");

// Wait until HTML is ready (safe on slower devices)
document.addEventListener("DOMContentLoaded", () => {
  const title = document.querySelector("h1");
  if (!title) return;

  // Click: toggle color (gold <-> red) with CSS transition
  title.addEventListener("click", () => {
    alert("The battle begins!"); // optional; delete if you don't want the popup

    if (title.classList.contains("is-red")) {
      title.classList.remove("is-red");
      title.classList.add("is-gold");
    } else {
      title.classList.remove("is-gold");
      title.classList.add("is-red");
    }
  });

  // Hover/Tap glow feedback
  function addGlow(){ title.classList.add("glow"); }
  function removeGlow(){ title.classList.remove("glow"); }

  title.addEventListener("mouseenter", addGlow);
  title.addEventListener("mouseleave", removeGlow);

  title.addEventListener("touchstart", () => {
    addGlow();
    setTimeout(removeGlow, 600);
  }, { passive: true });
});