/**
 * Short pleasant “tick” chime when a product page is opened (Web Audio API).
 * No external assets; safe no-op if audio is unavailable.
 */
export function playProductOpenTick() {
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();

    const blip = (freq, startAt) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = freq;
      osc.connect(gain);
      gain.connect(ctx.destination);
      const t = startAt;
      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.exponentialRampToValueAtTime(0.1, t + 0.012);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.07);
      osc.start(t);
      osc.stop(t + 0.08);
    };

    const t0 = ctx.currentTime;
    void ctx.resume?.();
    blip(987, t0);
    blip(1318, t0 + 0.1);

    window.setTimeout(() => {
      try {
        ctx.close();
      } catch {
        /* ignore */
      }
    }, 400);
  } catch {
    /* ignore */
  }
}
