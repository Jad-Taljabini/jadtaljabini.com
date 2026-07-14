(() => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const intro = document.createElement("div");
  intro.className = "flight-intro";
  intro.setAttribute("aria-label", "Opening animation");
  intro.innerHTML = `
    <button class="skip-intro" type="button">
      Skip intro <span aria-hidden="true">↗</span>
    </button>
    <div class="intro-coordinate intro-coordinate-top">45.4642° N · 9.1900° E</div>
    <div class="intro-coordinate intro-coordinate-bottom">Independent developer · Italy</div>
    <div class="flight-line" aria-hidden="true"><span></span></div>
    <div class="bird-flight" aria-hidden="true">
      <div class="bird-sprite"></div>
      <div class="bird-shadow"></div>
    </div>
    <div class="intro-wordmark" aria-hidden="true">
      <p>Software with a destination.</p>
      <strong>Jad Taljabini</strong>
    </div>
    <p class="flight-sr-only">Jad Taljabini, computer engineer and independent developer.</p>
  `;

  document.body.append(intro);
  document.body.classList.add("flight-intro-open");

  let isClosing = false;
  const closeIntro = () => {
    if (isClosing) return;
    isClosing = true;
    intro.classList.add("is-leaving");
    window.setTimeout(() => {
      intro.remove();
      document.body.classList.remove("flight-intro-open");
    }, 780);
  };

  intro.querySelector(".skip-intro").addEventListener("click", closeIntro);
  window.setTimeout(closeIntro, 5300);
})();
