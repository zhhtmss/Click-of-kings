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
        bindToggle();
        bindVolume();
        updateToggleText();
        
        const startAudioOnGesture = () => {
            if (!unlocked) {
                unlock();
            }
            document.removeEventListener("click", startAudioOnGesture);
            document.removeEventListener("touchstart", startAudioOnGesture);
        };
        
        document.addEventListener("click", startAudioOnGesture);
        document.addEventListener("touchstart", startAudioOnGesture);
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

    function bindToggle() {
        const toggle = document.getElementById("soundToggle");
        if (!toggle) return;

        toggle.addEventListener("click", () => {
            enabled = !enabled;

            if (enabled) {
                if (!unlocked) {
                    try {
                        unlock();
                    } catch (err) {
                        console.warn("Could not unlock audio:", err);
                    }
                }

                if (unlocked) {
                    if (currentMusic) {
                        currentMusic.volume = 0;
                        currentMusic.play().catch(() => {});
                        fadeInMusic(currentMusic, 0.35);
                    } else {
                        playMusicForEra(currentEra);
                    }
                }
            } else if (currentMusic) {
                fadeOutMusic(currentMusic, 0.35);
                setTimeout(() => {
                    if (!enabled && currentMusic) {
                        stopMusic();
                    }
                }, 350);
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
            context = new (window.AudioContext)();
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
        }

        if (unlocked && enabled) {
            playMusicForEra(index);
        }
    }

    function playMusicForEra(index) {
        const nextMusic = music.get(index);
        if (!enabled || !nextMusic || !unlocked) return;

        if (currentMusic && currentMusic !== nextMusic) {
            // Плавный переход между музыками
            fadeOutMusic(currentMusic, 0.5);
            
            // Начинаем новую музыку с нулевой громкостью
            currentMusic = nextMusic;
            currentMusic.volume = 0;
            currentMusic.currentTime = 0;

            const playPromise = currentMusic.play();
            if (playPromise) {
                playPromise.catch(() => {
                    console.warn("Не удалось воспроизвести музыку, попытка позже...");
                });
            }

            // Плавно увеличиваем громкость новой музыки
            fadeInMusic(currentMusic, 0.5);
        } else if (!currentMusic) {
            currentMusic = nextMusic;
            currentMusic.volume = getMusicVolume();
            currentMusic.currentTime = 0;

            const playPromise = currentMusic.play();
            if (playPromise) {
                playPromise.catch(() => {
                    console.warn("Не удалось воспроизвести музыку, попытка позже...");
                });
            }
        }
    }

    function fadeOutMusic(audio, duration) {
        const startVolume = audio.volume;
        const startTime = Date.now();

        const fadeInterval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / (duration * 1000), 1);
            audio.volume = startVolume * (1 - progress);

            if (progress >= 1) {
                clearInterval(fadeInterval);
                audio.pause();
                audio.currentTime = 0;
            }
        }, 16);
    }

    function fadeInMusic(audio, duration) {
        const targetVolume = getMusicVolume();
        const startTime = Date.now();

        const fadeInterval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / (duration * 1000), 1);
            audio.volume = targetVolume * progress;

            if (progress >= 1) {
                clearInterval(fadeInterval);
                audio.volume = targetVolume;
            }
        }, 16);
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
        playEffect,
        unlock,
        isUnlocked: () => unlocked
    };
})();

window.SoundManager = SoundManager;
