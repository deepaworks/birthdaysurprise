/**
 * =========================================================================
 * 🎵 SOUND ENGINE & AUDIO SYNTHESIZER 🎵
 * =========================================================================
 * Supports Web Audio API procedural sound generation (heartbeats, chimes,
 * paper rustles) + seamless background music player with visualizer.
 */

class SoundEngine {
  constructor() {
    this.audioCtx = null;
    this.bgAudio = new Audio();
    this.bgAudio.loop = true;
    this.isPlaying = false;
    this.currentTrack = "main"; // "main" or "letter"
    this.heartbeatInterval = null;
    
    // Initialize audio element
    this.bgAudio.src = LOVE_CONFIG.music.bgmSrc;
    this.bgAudio.volume = 0.55;
  }

  initAudioContext() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.audioCtx = new AudioContext();
    }
    if (this.audioCtx.state === "suspended") {
      this.audioCtx.resume();
    }
  }

  // Play / Toggle Background Music
  toggleMusic() {
    this.initAudioContext();
    if (this.isPlaying) {
      this.bgAudio.pause();
      this.isPlaying = false;
      this.updateVisualizer(false);
    } else {
      this.bgAudio.play().then(() => {
        this.isPlaying = true;
        this.updateVisualizer(true);
      }).catch(err => {
        console.log("Audio play blocked by browser policy until interaction:", err);
      });
    }
    return this.isPlaying;
  }

  playTrack(trackName) {
    this.initAudioContext();
    const src = trackName === "letter" ? LOVE_CONFIG.music.letterBgmSrc : LOVE_CONFIG.music.bgmSrc;
    if (this.bgAudio.src.indexOf(src) === -1) {
      this.bgAudio.src = src;
      this.currentTrack = trackName;
    }
    this.bgAudio.play().then(() => {
      this.isPlaying = true;
      this.updateVisualizer(true);
    }).catch(e => console.log(e));
  }

  setVolume(vol) {
    this.bgAudio.volume = Math.max(0, Math.min(1, vol));
  }

  updateVisualizer(active) {
    const visualizer = document.getElementById("musicVisualizer");
    if (visualizer) {
      if (active) {
        visualizer.classList.add("playing");
      } else {
        visualizer.classList.remove("playing");
      }
    }
    const btn = document.getElementById("musicToggleBtn");
    if (btn) {
      btn.innerHTML = active ? "🎵 Music: Playing" : "🔇 Music: Paused";
    }
  }

  // Procedural Sound: Single Heartbeat Pulse (Lub-Dub)
  playHeartbeatSound() {
    try {
      this.initAudioContext();
      const ctx = this.audioCtx;
      const now = ctx.currentTime;

      // Lub (First lower pulse)
      this.synthesizeHeartbeatPulse(now, 55, 0.15, 0.8);
      // Dub (Second sharper pulse)
      this.synthesizeHeartbeatPulse(now + 0.14, 75, 0.18, 0.6);
    } catch (e) {
      // Audio not yet unlocked
    }
  }

  synthesizeHeartbeatPulse(time, freq, duration, gainLevel) {
    const ctx = this.audioCtx;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, time);
    osc.frequency.exponentialRampToValueAtTime(30, time + duration);

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(120, time);

    gain.gain.setValueAtTime(gainLevel * 0.4, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(time);
    osc.stop(time + duration);
  }

  // Procedural Sound: Magical Sparkle / Chime
  playSparkleSound() {
    try {
      this.initAudioContext();
      const ctx = this.audioCtx;
      const now = ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C5, E5, G5, C6, E6

      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, now + idx * 0.05);

        gain.gain.setValueAtTime(0.12, now + idx * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.05 + 0.45);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.05);
        osc.stop(now + idx * 0.05 + 0.5);
      });
    } catch (e) {}
  }

  // Procedural Sound: Romantic Success Chord
  playSuccessSound() {
    try {
      this.initAudioContext();
      const ctx = this.audioCtx;
      const now = ctx.currentTime;
      const freqs = [392.00, 493.88, 587.33, 783.99]; // G4, B4, D5, G5

      freqs.forEach((freq) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 1.3);
      });
    } catch (e) {}
  }

  // Procedural Sound: Paper Rustle / Unfold
  playPaperRustle() {
    try {
      this.initAudioContext();
      const ctx = this.audioCtx;
      const bufferSize = ctx.sampleRate * 0.25;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);

      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(1200, ctx.currentTime);
      filter.Q.setValueAtTime(2, ctx.currentTime);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start();
    } catch (e) {}
  }

  // Procedural Sound: Gentle Click / Keypad Tap
  playTapSound() {
    try {
      this.initAudioContext();
      const ctx = this.audioCtx;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch (e) {}
  }

  // Procedural Sound: Error Shake
  playErrorSound() {
    try {
      this.initAudioContext();
      const ctx = this.audioCtx;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(140, ctx.currentTime);
      osc.frequency.setValueAtTime(110, ctx.currentTime + 0.1);

      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.26);
    } catch (e) {}
  }

  // Procedural Sound: Flower Bloom Harp Glissando
  playFlowerBloomSound() {
    try {
      this.initAudioContext();
      const ctx = this.audioCtx;
      const now = ctx.currentTime;
      const harpNotes = [440, 554.37, 659.25, 880, 1108.73, 1318.51]; // A major arpeggio

      harpNotes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);

        gain.gain.setValueAtTime(0.12, now + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.06 + 0.6);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 0.65);
      });
    } catch (e) {}
  }

  // Procedural Sound: Ring Box Proposal Diamond Fanfare
  playProposalRingFanfare() {
    try {
      this.initAudioContext();
      const ctx = this.audioCtx;
      const now = ctx.currentTime;
      // Majestic chime & chord: F#5, A#5, C#6, F#6
      const chord = [739.99, 932.33, 1108.73, 1479.98];

      chord.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, now + i * 0.08);

        gain.gain.setValueAtTime(0.2, now + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.08 + 1.8);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + i * 0.08);
        osc.stop(now + i * 0.08 + 1.9);
      });
    } catch (e) {}
  }

  // Procedural Sound: Passport / Ticket Stamp Thud
  playStampSound() {
    try {
      this.initAudioContext();
      const ctx = this.audioCtx;
      const now = ctx.currentTime;

      // Heavy stamp thud
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(120, now);
      osc.frequency.exponentialRampToValueAtTime(30, now + 0.18);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.22);

      // Followed by celebratory chime
      setTimeout(() => this.playSparkleSound(), 80);
    } catch (e) {}
  }
}

// Global sound engine instance
window.soundEngine = new SoundEngine();
