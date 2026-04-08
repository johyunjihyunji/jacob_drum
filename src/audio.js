// ─── Audio Engine ────────────────────────────────────────────────────────────

export function createAudioContext() {
  return new (window.AudioContext || window.webkitAudioContext)();
}

export function playDrumSound(type) {
  const ctx = createAudioContext();
  const now = ctx.currentTime;

  switch (type) {
    case "bass": {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.exponentialRampToValueAtTime(40, now + 0.5);
      gain.gain.setValueAtTime(1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
      osc.start(now); osc.stop(now + 0.6);
      break;
    }
    case "snare": {
      const bufSize = ctx.sampleRate * 0.2;
      const buffer = ctx.createBuffer(1, bufSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufSize; i++) data[i] = Math.random() * 2 - 1;
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const snareGain = ctx.createGain();
      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass"; filter.frequency.value = 1200;
      noise.connect(filter); filter.connect(snareGain); snareGain.connect(ctx.destination);
      snareGain.gain.setValueAtTime(0.8, now);
      snareGain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      noise.start(now); noise.stop(now + 0.2);
      break;
    }
    case "hihat": {
      const bufSize = ctx.sampleRate * 0.1;
      const buffer = ctx.createBuffer(1, bufSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufSize; i++) data[i] = Math.random() * 2 - 1;
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = ctx.createBiquadFilter();
      filter.type = "highpass"; filter.frequency.value = 8000;
      const gain = ctx.createGain();
      noise.connect(filter); filter.connect(gain); gain.connect(ctx.destination);
      gain.gain.setValueAtTime(0.6, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
      noise.start(now); noise.stop(now + 0.1);
      break;
    }
    case "cymbal": {
      const bufSize = ctx.sampleRate * 0.8;
      const buffer = ctx.createBuffer(1, bufSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufSize; i++) data[i] = Math.random() * 2 - 1;
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass"; filter.frequency.value = 6000; filter.Q.value = 0.5;
      const gain = ctx.createGain();
      noise.connect(filter); filter.connect(gain); gain.connect(ctx.destination);
      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
      noise.start(now); noise.stop(now + 0.8);
      break;
    }
    case "tom_hi": {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.exponentialRampToValueAtTime(150, now + 0.2);
      gain.gain.setValueAtTime(0.8, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      osc.start(now); osc.stop(now + 0.25);
      break;
    }
    case "tom_mid": {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(100, now + 0.3);
      gain.gain.setValueAtTime(0.8, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc.start(now); osc.stop(now + 0.35);
      break;
    }
    case "tom_floor": {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(60, now + 0.4);
      gain.gain.setValueAtTime(0.9, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
      osc.start(now); osc.stop(now + 0.45);
      break;
    }
    default: break;
  }
}
