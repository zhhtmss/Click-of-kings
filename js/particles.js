const ParticleSystem = (() => {
    const particles = [];
    let canvas = null;
    let ctx = null;
    let particleImages = new Map();

    function init() {
        // Создаём canvas для частиц
        canvas = document.createElement("canvas");
        canvas.id = "particleCanvas";
        canvas.style.position = "fixed";
        canvas.style.top = "0";
        canvas.style.left = "0";
        canvas.style.pointerEvents = "none";
        canvas.style.zIndex = "100";
        document.body.insertBefore(canvas, document.body.firstChild);

        ctx = canvas.getContext("2d");
        resizeCanvas();

        // Загружаем изображения частиц для каждой эры
        for (let i = 0; i < ERAS.length; i++) {
            const img = new Image();
            img.src = `./assets/images/items/era${i + 1}_particles.webp`;
            particleImages.set(i, img);
        }

        window.addEventListener("resize", resizeCanvas);
        animationLoop();
    }

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function createParticles(x, y, eraIndex) {
        const offsetX = (Math.random() - 0.5) * 40;
        const offsetY = (Math.random() - 0.5) * 40;

        particles.push({
            x: x + offsetX,
            y: y + offsetY,
            vx: (Math.random() - 0.5) * 2,
            vy: -3 - Math.random() * 2,
            life: 1,
            maxLife: 1.2,
            scale: 0.12,
            rotation: Math.random() * Math.PI * 2,
            rotationVelocity: (Math.random() - 0.5) * 0.3,
            eraIndex: eraIndex
        });
    }

    function animationLoop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Обновляем и рисуем частицы
        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];

            // Обновляем позицию
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.15; // Гравитация
            p.life -= 1 / 60;
            p.rotation += p.rotationVelocity;

            if (p.life <= 0) {
                particles.splice(i, 1);
                continue;
            }

            // Рисуем частицу
            ctx.save();
            ctx.globalAlpha = Math.max(0, p.life / p.maxLife);
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rotation);
            
            const image = particleImages.get(p.eraIndex);
            
            if (image && image.complete && image.width > 0) {
                // Рисуем изображение с масштабированием
                const w = image.width * p.scale;
                const h = image.height * p.scale;
                ctx.drawImage(image, -w / 2, -h / 2, w, h);
            }

            ctx.restore();
        }

        requestAnimationFrame(animationLoop);
    }

    return {
        init,
        createParticles
    };
})();

window.ParticleSystem = ParticleSystem;
