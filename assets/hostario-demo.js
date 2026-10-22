(() => {
  const modal = document.createElement("dialog");
  modal.className = "hostario-demo";
  modal.setAttribute("aria-labelledby", "hd-title");
  modal.innerHTML = `
    <div class="hd-shell">
      <div class="hd-top"><span>HOSTARIO</span><button class="hd-close" aria-label="Close Hostario demo">×</button></div>
      <div class="hd-layout">
        <section class="hd-story">
          <h2 id="hd-title">One stay.<br>Everything<br>in its place.</h2>
          <p class="hd-intro">Try a check-in, from the first guest to the final receipt.</p>
          <ol class="hd-steps" aria-label="Demo journey">
            <li data-stage="0"><span>01</span><div><strong>Set up the stay</strong><small>A property, a few dates, your guests.</small></div></li>
            <li data-stage="1"><span>02</span><div><strong>Scan. Check. Done.</strong><small>Turn a sample document into guest details.</small></div></li>
            <li data-stage="2"><span>03</span><div><strong>Bring it all together</strong><small>Reporting and receipts, in the same place.</small></div></li>
          </ol>
          <p class="hd-hint" aria-live="polite">Start with “New check-in” on the phone. It’s yours to explore.</p>
          <div class="hd-links"><button class="hd-reset">↺ Start again</button><a href="https://apps.apple.com/it/app/hostario/id6753862247" target="_blank" rel="noreferrer">Get the iOS app ↗</a></div>
        </section>
        <div class="hd-stage"><div class="hd-phone"><iframe title="Hostario interactive app demo, in English" data-src="assets/hostario-demo/index.html?v=english-1" sandbox="allow-scripts allow-same-origin" referrerpolicy="no-referrer"></iframe></div></div>
      </div>
      <p class="hd-disclosure">Demo with sample data · Scanning and submissions are simulated.</p>
    </div>`;
  document.body.append(modal);
  const frame = modal.querySelector("iframe");
  const phone = modal.querySelector(".hd-phone");
  const stage = modal.querySelector(".hd-stage");
  const compact = window.matchMedia("(max-width: 760px)");
  // Keep an iPhone-sized canvas on desktop; mobile uses its available viewport.
  function fitPhone() {
    if (compact.matches) {
      phone.removeAttribute("style");
      frame.removeAttribute("style");
      return;
    }
    const styles = getComputedStyle(stage);
    const width = stage.clientWidth - parseFloat(styles.paddingLeft) - parseFloat(styles.paddingRight);
    const height = stage.clientHeight - parseFloat(styles.paddingTop) - parseFloat(styles.paddingBottom);
    if (width <= 0 || height <= 0) return;
    const scale = Math.min(1, width / 416, height / 888);
    phone.style.cssText = `flex:none;width:${416 * scale}px;height:${888 * scale}px;max-height:none;border-width:${7 * scale}px;border-radius:${43 * scale}px;`;
    frame.style.cssText = `width:402px;height:874px;transform:scale(${scale});transform-origin:top left;`;
  }
  new ResizeObserver(fitPhone).observe(stage);
  compact.addEventListener("change", fitPhone);
  const hint = modal.querySelector(".hd-hint");
  let opener;
  const hints = [
    'Choose a property, then set the dates and guest count.',
    'Tap “Scan document” to try a sample scan. You can edit the result.',
    'Your stay is saved. Try a simulated submission or open the receipt.'
  ];
  function update(stage) {
    modal.querySelectorAll("[data-stage]").forEach((item, index) => {
      item.classList.toggle("is-current", index === stage);
      item.classList.toggle("is-complete", index < stage);
      if (index === stage) item.setAttribute("aria-current", "step");
      else item.removeAttribute("aria-current");
    });
    hint.textContent = hints[stage];
  }
  modal.querySelector(".hd-close").addEventListener("click", () => modal.close());
  modal.querySelector(".hd-reset").addEventListener("click", () => {
    frame.contentWindow?.postMessage({ type: "hostario-reset" }, location.origin);
    update(0);
  });
  modal.addEventListener("click", event => { if (event.target === modal) modal.close(); });
  modal.addEventListener("close", () => {
    document.body.classList.remove("dialog-open");
    opener?.focus();
  });
  window.addEventListener("message", event => {
    if (event.origin !== location.origin || event.source !== frame.contentWindow) return;
    if (event.data?.type === "hostario-stage" && [0, 1, 2].includes(event.data.stage)) update(event.data.stage);
    if (event.data?.type === "hostario-close") modal.close();
  });
  window.hostarioDemo = { open() {
    opener = document.activeElement;
    if (!frame.hasAttribute("src")) frame.src = frame.dataset.src;
    modal.showModal();
    fitPhone();
    document.body.classList.add("dialog-open");
    modal.querySelector(".hd-close").focus();
  } };
  update(0);
})();
