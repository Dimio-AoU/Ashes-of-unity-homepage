/* =======================================================
   Ashes of Unity — Frontend Interactions
   - Music toggle (with localStorage remember)
   - Scroll reveal (IntersectionObserver)
   ======================================================= */

// ---------- Music Toggle ----------
(function () {
  const audio = document.getElementById('aou-theme');
  const btn = document.getElementById('musicToggle');
  if (!audio || !btn) return;

  // Restore last state
  const saved = localStorage.getItem('aou_music') || 'off';
  if (saved === 'on') {
    // Browsers require a user gesture for autoplay; we try play() on first interaction.
    // Pre-set UI so user sees intended state.
    btn.classList.add('is-playing');
    btn.textContent = '♪ Music: On';
    btn.setAttribute('aria-pressed', 'true');
  }

  // One-time user gesture hook to allow autoplay after click
  const ensurePlay = async () => {
    try {
      if (btn.classList.contains('is-playing') && audio.paused) {
        await audio.play();
      }
    } catch (e) {
      // Autoplay blocked — will play next button click
    }
    window.removeEventListener('click', ensurePlay);
  };
  window.addEventListener('click', ensurePlay, { once: true });

  btn.addEventListener('click', async () => {
    const playing = btn.classList.toggle('is-playing');
    if (playing) {
      btn.textContent = '♪ Music: On';
      btn.setAttribute('aria-pressed', 'true');
      localStorage.setItem('aou_music', 'on');
      try { await audio.play(); } catch (e) { /* ignore */ }
    } else {
      btn.textContent = '♪ Music: Off';
      btn.setAttribute('aria-pressed', 'false');
      localStorage.setItem('aou_music', 'off');
      audio.pause();
    }
  });
})();

// ---------- Scroll Reveal ----------
(function () {
  const els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || !els.length) {
    // No IO support — show everything
    els.forEach(el => el.classList.add('in'));
    return;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  els.forEach(el => io.observe(el));
})();