(() => {
  const link = document.querySelector('[data-hosting-arrival]');
  if (!link || typeof HTMLDialogElement === 'undefined') return;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const assetBase = new URL('hospitality/', document.currentScript.src);
  const duration = 6400;
  let sprite;
  let pending = false;
  let activeDialog;
  let cancelActive;
  const preload = () => {
    if (!sprite) {
      sprite = ['jad-guest-sprites.png', 'jad-walk-v2.png', 'guest-walk-v2.png'].map(file => {
        const image = new Image();
        image.src = new URL(file, assetBase).href;
        return image;
      });
    }
    return sprite;
  };
  link.addEventListener('pointerenter', preload, { once: true });
  link.addEventListener('focus', preload, { once: true });
  if ('IntersectionObserver' in window && !reducedMotion.matches) {
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) { preload(); observer.disconnect(); }
    }, { rootMargin: '240px' });
    observer.observe(link);
  }
  link.addEventListener('click', async (event) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || reducedMotion.matches) return;
    if (pending || activeDialog) { event.preventDefault(); return; }
    event.preventDefault();
    pending = true;
    const destination = link.href;
    // Keep the real link as a reliable fallback on slow connections or image errors.
    const ready = await Promise.race([
      Promise.all(preload().map(image => image.decode())).then(() => true, () => false),
      new Promise(resolve => window.setTimeout(() => resolve(false), 1200))
    ]);
    pending = false;
    if (!ready || reducedMotion.matches) { window.location.assign(destination); return; }
    const dialog = document.createElement('dialog');
    dialog.className = 'hosting-arrival';
    dialog.setAttribute('aria-labelledby', 'hosting-arrival-title');
    dialog.setAttribute('aria-describedby', 'hosting-arrival-description');
    dialog.innerHTML = `
      <div class="hosting-arrival-top"><p>Jad Taljabini · Hospitality</p><button type="button" autofocus>Skip &amp; step inside ↗</button></div>
      <div class="hosting-stage-window" aria-hidden="true"><div class="hosting-stage">
        <div class="hosting-floor"></div><div class="hosting-doorway"><div class="hosting-door"></div></div>
        <canvas class="hosting-characters" width="1280" height="600"></canvas>
      </div></div>
      <h2 id="hosting-arrival-title">Make yourself at home.</h2>
      <p class="hosting-arrival-note" id="hosting-arrival-description">A little welcome from me. Your visit starts in a moment.</p>
      <div class="hosting-arrival-progress" aria-hidden="true"></div>`;
    let animationFrame;
    let disposed = false;
    const previousOverflow = document.body.style.overflow;
    const cleanup = () => {
      if (disposed) return;
      disposed = true;
      cancelAnimationFrame(animationFrame);
      dialog.close();
      dialog.remove();
      document.body.style.overflow = previousOverflow;
      activeDialog = undefined;
      cancelActive = undefined;
    };
    const enter = () => { cleanup(); window.location.assign(destination); };
    dialog.querySelector('button').addEventListener('click', enter, { once: true });
    dialog.addEventListener('cancel', (e) => { e.preventDefault(); cleanup(); link.focus({ preventScroll: true }); });
    document.body.append(dialog);
    activeDialog = dialog;
    cancelActive = cleanup;
    document.body.style.overflow = 'hidden';
    dialog.showModal();
    const canvas = dialog.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) { enter(); return; }
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = 640 * dpr;
    canvas.height = 300 * dpr;
    ctx.scale(dpr, dpr);
    const [poses, jadWalk, guestWalk] = sprite;
    // Measured alpha bounds and head centers keep generated frames on one baseline.
    // Frame tuple: head center X, top opaque pixel, bottom opaque pixel.
    const jadFrames = [[215.5,24,500],[208,22,500],[204,22,500],[207.5,23,501],[209,16,492],[226,16,491],[205.5,16,492],[216,16,490]];
    const guestFrames = [[206,21,488],[206.5,21,491],[201.5,21,493],[206,21,491],[220,14,483],[221.5,14,485],[211.5,15,487],[209.5,14,485]];
    const poseFrames = {4:[180.5,12,476],5:[225.5,12,476],6:[205,38,471]};
    const clamp = value => Math.max(0, Math.min(1, value));
    const smooth = value => { const t = clamp(value); return t * t * (3 - 2 * t); };
    const drawFrame = (image, frame, metrics, x, height, opacity = 1, bob = 0) => {
      if (opacity <= 0) return;
      const [head, top, bottom] = metrics;
      const scale = height / (bottom - top);
      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.drawImage(image, (frame % 4) * 384, Math.floor(frame / 4) * 512, 384, 512,
        x - head * scale, 271 - bottom * scale + bob, 384 * scale, 512 * scale);
      ctx.restore();
    };
    const shadow = (x, opacity = 1) => {
      ctx.save();
      ctx.fillStyle = `rgba(44, 40, 32, ${.11 * opacity})`;
      ctx.filter = 'blur(3px)';
      ctx.beginPath(); ctx.ellipse(x - 9, 270, 28, 3, 0, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    };
    const walk = (image, frames, elapsed, x, height, opacity = 1) => {
      const phase = Math.max(0, elapsed) / 105;
      const index = Math.floor(phase) % 8;
      const bob = -Math.abs(Math.sin(phase / 4 * Math.PI)) * 1.2;
      // Keep each gait frame fully opaque: source-over crossfades expose the
      // pale backdrop and make the entire character flash at every step.
      drawFrame(image, index, frames[index], x, height, opacity, bob);
    };
    let lastTime;
    let elapsed = 0;
    const animate = now => {
      if (disposed) return;
      const delta = lastTime === undefined ? 0 : Math.min(now - lastTime, 50);
      lastTime = now;
      // Do not skip the interaction when returning to a backgrounded tab.
      if (!document.hidden) elapsed += delta;
      ctx.clearRect(0, 0, 640, 300);
      const arrival = clamp(elapsed / 2100);
      const jadX = 35 + 250 * arrival;
      const settle = smooth((elapsed - 2060) / 80);
      const wave = smooth((elapsed - 3500) / 90);
      const depart = smooth((elapsed - 4050) / 1650);
      const guestX = 440 + 98 * depart;
      const disappear = 1 - smooth((depart - .6) / .4);
      const turn = smooth((elapsed - 4050) / 90);
      shadow(jadX);
      shadow(guestX, disappear);
      walk(jadWalk, jadFrames, Math.min(elapsed, 2100), jadX, 200, 1 - settle);
      drawFrame(poses, 4, poseFrames[4], jadX, 200, settle * (1 - wave));
      drawFrame(poses, 5, poseFrames[5], jadX, 200, wave, -Math.sin(elapsed / 400) * .45);
      drawFrame(poses, 6, poseFrames[6], 440, 190, 1 - turn, -Math.sin(elapsed / 600) * .45);
      // Advance the gait by distance, so slowing at the doorway also slows the steps.
      walk(guestWalk, guestFrames, depart * 840, guestX, 190, turn * disappear);
      dialog.classList.toggle('is-handoff', elapsed >= 2140);
      dialog.classList.toggle('is-entering', elapsed >= 3650);
      dialog.classList.toggle('is-finished', elapsed >= 5800);
      dialog.classList.toggle('is-leaving', elapsed >= 6100);
      dialog.style.setProperty('--arrival-progress', clamp(elapsed / duration));
      if (elapsed >= duration) { enter(); return; }
      animationFrame = requestAnimationFrame(animate);
    };
    animationFrame = requestAnimationFrame(animate);
  });
  window.addEventListener('pagehide', () => { cancelActive?.(); pending = false; });
  reducedMotion.addEventListener('change', () => {
    if (reducedMotion.matches && activeDialog) { cancelActive?.(); window.location.assign(link.href); }
  });
})();
