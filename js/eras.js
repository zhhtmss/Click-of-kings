const ERA_CLASSES = [
    "era-primitive",
    "era-ancient",
    "era-medieval",
    "era-industrial",
    "era-future"
];

const ERAS = [
    {
        name: "Первобытная эпоха",
        description: "Пещеры, костры и первые орудия. Развивайте племя: для новой эпохи нужны ресурс и купленные улучшения.",
        resourceName: "Власть",
        minGold: 0,
        requiredUpgrades: 8,
        clickMultiplier: 1,
        autoMultiplier: 1,
        background: "./assets/images/backgrounds/era1.webp",
        clickImage: "./assets/images/items/era1_click.webp",
        music: "./assets/music/era1.mp3",
        themeClass: "era-primitive",
        clickSound: "stone"
    },
    {
        name: "Древний мир",
        description: "Храмы, пирамиды и города требуют устойчивой экономики, писцов и ремесла.",
        resourceName: "Золото",
        minGold: 500,
        requiredUpgrades: 10,
        clickMultiplier: 2,
        autoMultiplier: 2,
        background: "./assets/images/backgrounds/era2.webp",
        clickImage: "./assets/images/items/era2_click.webp",
        music: "./assets/music/era2.mp3",
        themeClass: "era-ancient",
        clickSound: "coin"
    },
    {
        name: "Средневековье",
        description: "Замки, короны, деревни и кузницы укрепляют власть королевства.",
        resourceName: "Казна",
        minGold: 5000,
        requiredUpgrades: 12,
        clickMultiplier: 5,
        autoMultiplier: 5,
        background: "./assets/images/backgrounds/era3.webp",
        clickImage: "./assets/images/items/era3_click.webp",
        music: "./assets/music/era3.mp3",
        themeClass: "era-medieval",
        clickSound: "metal"
    },
    {
        name: "Индустриальная эпоха",
        description: "Фабрики, пар, сталь и механизмы ускоряют рост цивилизации.",
        resourceName: "Капитал",
        minGold: 50000,
        requiredUpgrades: 6,
        clickMultiplier: 12,
        autoMultiplier: 15,
        background: "./assets/images/backgrounds/era4.webp",
        clickImage: "./assets/images/items/era4_click.webp",
        music: "./assets/music/era4.mp3",
        themeClass: "era-industrial",
        clickSound: "machine"
    },
    {
        name: "Футуризм",
        description: "Неон, космос и ядра ИИ выводят державу за пределы старого мира.",
        resourceName: "Энергия",
        minGold: 500000,
        requiredUpgrades: 0,
        clickMultiplier: 30,
        autoMultiplier: 50,
        background: "./assets/images/backgrounds/era5.webp",
        clickImage: "./assets/images/items/era5_click.webp",
        music: "./assets/music/era5.mp3",
        themeClass: "era-future",
        clickSound: "sci-fi"
    }
];

window.ERAS = ERAS;

function getCurrentEra() {
    return ERAS[currentEraIndex] || ERAS[0];
}

function getNextEra() {
    return ERAS[currentEraIndex + 1] || null;
}

function canAdvanceFromEra(eraIndex, totalGold) {
    const era = ERAS[eraIndex];
    const nextEra = ERAS[eraIndex + 1];
    const ownedUpgrades = getEraUpgradePurchases(eraIndex);

    return Boolean(nextEra)
        && totalGold >= nextEra.minGold
        && ownedUpgrades >= era.requiredUpgrades;
}

function getEraIndexForProgress(totalGold, startIndex = 0) {
    let eraIndex = Math.max(0, Math.min(startIndex, ERAS.length - 1));

    while (canAdvanceFromEra(eraIndex, totalGold)) {
        eraIndex++;
    }

    return eraIndex;
}

function checkEraUpgrade(totalGold) {
    const nextEraIndex = getEraIndexForProgress(totalGold, currentEraIndex);

    if (nextEraIndex !== currentEraIndex) {
        currentEraIndex = nextEraIndex;
        applyEra({ transition: true });
        renderUpgrades();
        updateUI();
        saveGame();
    }
}

function applyEra(options = {}) {
    const era = getCurrentEra();
    const transition = Boolean(options.transition);
    const silent = Boolean(options.silent);

    document.body.classList.remove(...ERA_CLASSES);
    document.body.classList.add(era.themeClass);

    const eraName = document.getElementById("eraName");
    if (eraName) eraName.textContent = `${era.name} (${currentEraIndex + 1}/${ERAS.length})`;

    const eraDescription = document.getElementById("eraDescription");
    if (eraDescription) eraDescription.textContent = era.description;

    const bg = document.getElementById("background");
    if (bg) bg.style.backgroundImage = `url(${era.background})`;

    const clickImg = document.getElementById("clickImage");
    if (clickImg) {
        clickImg.src = era.clickImage;
        clickImg.alt = era.name;
    }

    if (window.SoundManager) {
        SoundManager.setEra(currentEraIndex, { transition: transition && !silent });
    }
}

function updateEraProgress(totalGold) {
    const nextEra = getNextEra();
    const currentEra = getCurrentEra();
    const ownedUpgrades = getEraUpgradePurchases(currentEraIndex);
    const requiredUpgrades = currentEra.requiredUpgrades || 0;
    const progress = document.getElementById("eraProgress");
    const nextEraLabel = document.getElementById("nextEraLabel");
    const nextEraCost = document.getElementById("nextEraCost");

    if (!progress || !nextEraLabel || !nextEraCost) return;

    if (!nextEra) {
        progress.style.width = "100%";
        nextEraLabel.textContent = `Эпоха ${currentEraIndex + 1} / ${ERAS.length}: максимальная эпоха`;
        nextEraCost.textContent = "Цивилизация завершена";
        return;
    }

    const eraRange = nextEra.minGold - currentEra.minGold;
    const resourceProgress = Math.max(0, totalGold - currentEra.minGold);
    const resourcePercent = Math.min(100, (resourceProgress / eraRange) * 100);
    const upgradePercent = requiredUpgrades > 0
        ? Math.min(100, (ownedUpgrades / requiredUpgrades) * 100)
        : 100;
    const percent = Math.min(resourcePercent, upgradePercent);

    progress.style.width = `${percent}%`;
    nextEraLabel.textContent = `Эпоха ${currentEraIndex + 1} / ${ERAS.length}: к цели ${nextEra.name}`;
    nextEraCost.textContent = `${formatNumber(Math.floor(totalGold))} / ${formatNumber(nextEra.minGold)} | улучшения ${ownedUpgrades} / ${requiredUpgrades}`;
}
