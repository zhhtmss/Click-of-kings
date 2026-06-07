const SoundManager = (() => {
    const music = new Map();
    const effects = new Map();
    const clicks = new Map();
    const musicBaseVolume = 0.36;
    const effectBaseVolume = 0.7;

    let context = null;
    let enabled = true;
    let unlocked = false;
    let currentEra = 0;
    let currentMusic = null;
    let volume = 1;

    const effectSources = {
        buy: "./assets/sounds/buy.mp3",
        transition: "./assets/sounds/era-change.mp3"
    };

    function init() {
        preloadMusic();
        preloadEffects();
        preloadClickSounds();
        bindUnlockEvents();
        bindToggle();
        bindVolume();
        updateToggleText();
    }

    function preloadMusic() {
        ERAS.forEach((era, index) => {
            const audio = new Audio(era.music);
            audio.preload = "auto";
            audio.loop = true;
            audio.volume = getMusicVolume();
            music.set(index, audio);
        });
    }

    function preloadEffects() {
        Object.entries(effectSources).forEach(([name, src]) => {
            const audio = new Audio(src);
            audio.preload = "auto";
            audio.volume = getEffectVolume();
            effects.set(name, audio);
        });
    }

    function preloadClickSounds() {
        for (let i = 0; i < ERAS.length; i++) {
            const audio = new Audio(`./assets/sounds/click_era${i + 1}.mp3`);
            audio.preload = "auto";
            audio.volume = getEffectVolume();
            clicks.set(i, audio);
        }
    }

    function bindUnlockEvents() {
        document.addEventListener("pointerdown", unlock, { once: true });
        document.addEventListener("keydown", unlock, { once: true });
    }

    function bindToggle() {
        const toggle = document.getElementById("soundToggle");
        if (!toggle) return;

        toggle.addEventListener("click", () => {
            enabled = !enabled;
            if (enabled) {
                unlock();
                playMusicForEra(currentEra);
            } else {
                stopMusic();
            }
            updateToggleText();
        });
    }

    function bindVolume() {
        const slider = document.getElementById("volumeSlider");
        if (!slider) return;

        slider.value = Math.round(volume * 100);
        slider.addEventListener("input", () => {
            volume = Math.max(0, Math.min(1, Number(slider.value) / 100));
            applyVolume();

            if (enabled && unlocked && volume > 0) {
                playMusicForEra(currentEra);
            }
        });
    }

    function unlock() {
        if (!context) {
            context = new (window.AudioContext || window.webkitAudioContext)();
        }

        if (context.state === "suspended") {
            context.resume();
        }

        unlocked = true;

        if (enabled) {
            playMusicForEra(currentEra);
        }
    }

    function setEra(index, options = {}) {
        currentEra = index;

        if (options.transition) {
            playEffect("transition");
            playTransitionSweep(index);
        }

        if (unlocked && enabled) {
            playMusicForEra(index);
        }
    }

    function playMusicForEra(index) {
        const nextMusic = music.get(index);
        if (!enabled || !nextMusic) return;

        if (currentMusic && currentMusic !== nextMusic) {
            currentMusic.pause();
            currentMusic.currentTime = 0;
        }

        currentMusic = nextMusic;
        currentMusic.volume = getMusicVolume();

        const playPromise = currentMusic.play();
        if (playPromise) {
            playPromise.catch(() => {
                unlocked = false;
            });
        }
    }

    function stopMusic() {
        if (!currentMusic) return;

        currentMusic.pause();
        currentMusic.currentTime = 0;
        currentMusic = null;
    }

    function playEffect(name) {
        if (!enabled) return;
        unlock();

        const base = effects.get(name);
        if (!base) return;

        const audio = base.cloneNode();
        audio.volume = getEffectVolume();
        audio.play().catch(() => {});
    }

    function playClick(eraIndex) {
        if (!enabled) return;
        unlock();

        const base = clicks.get(eraIndex);
        if (!base) return;

        const audio = base.cloneNode();
        audio.volume = getEffectVolume();
        audio.play().catch(() => {});
    }

    function playTransitionSweep(index) {
        if (!enabled) return;
        unlock();
        if (!context) return;

        const base = 180 + index * 90;
        playTone({ type: "sawtooth", start: base, end: base * 2.4, duration: 0.45, gain: 0.07 });
    }

    function playTone({ type, start, end, duration, gain, delay = 0 }) {
        const now = context.currentTime + delay;
        const osc = context.createOscillator();
        const amp = context.createGain();
        const targetGain = Math.max(0.0001, gain * volume);

        osc.type = type;
        osc.frequency.setValueAtTime(start, now);
        osc.frequency.exponentialRampToValueAtTime(Math.max(1, end), now + duration);

        amp.gain.setValueAtTime(0.0001, now);
        amp.gain.exponentialRampToValueAtTime(targetGain, now + 0.012);
        amp.gain.exponentialRampToValueAtTime(0.0001, now + duration);

        osc.connect(amp);
        amp.connect(context.destination);
        osc.start(now);
        osc.stop(now + duration + 0.02);
    }

    function playNoise({ duration, gain, filter }) {
        const now = context.currentTime;
        const bufferSize = context.sampleRate * duration;
        const buffer = context.createBuffer(1, bufferSize, context.sampleRate);
        const data = buffer.getChannelData(0);

        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }

        const noise = context.createBufferSource();
        const amp = context.createGain();
        const lowpass = context.createBiquadFilter();

        lowpass.type = "lowpass";
        lowpass.frequency.value = filter;

        amp.gain.setValueAtTime(gain * volume, now);
        amp.gain.exponentialRampToValueAtTime(0.0001, now + duration);

        noise.buffer = buffer;
        noise.connect(lowpass);
        lowpass.connect(amp);
        amp.connect(context.destination);
        noise.start(now);
    }

    function updateToggleText() {
        const toggle = document.getElementById("soundToggle");
        if (!toggle) return;

        toggle.textContent = "Звук";
        toggle.classList.toggle("is-muted", !enabled);
        toggle.setAttribute("aria-pressed", String(enabled));
    }

    function getMusicVolume() {
        return musicBaseVolume * volume;
    }

    function getEffectVolume() {
        return effectBaseVolume * volume;
    }

    function applyVolume() {
        music.forEach(audio => {
            audio.volume = getMusicVolume();
        });

        effects.forEach(audio => {
            audio.volume = getEffectVolume();
        });

        clicks.forEach(audio => {
            audio.volume = getEffectVolume();
        });

        if (currentMusic) {
            currentMusic.volume = getMusicVolume();
        }
    }

    return {
        init,
        setEra,
        playClick,
        playEffect
    };
})();

window.SoundManager = SoundManager;
