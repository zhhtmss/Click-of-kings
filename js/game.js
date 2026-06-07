let gold = 0;
let perClick = 1;
let autoIncome = 0;
let currentEraIndex = 0;
let gameStarted = false;

// ===== INIT GAME =====
function initGame() {
    if (gameStarted) return;
    gameStarted = true;

    loadGame();
    initEraUI();
    initSound();
    initParticles();
    initUpgrades();
    applyEra({ silent: true });
    updateUI();

    const clickImage = document.getElementById("clickImage");

    clickImage.addEventListener("click", (e) => {
        const clickPower = getClickPower();
        const reward = typeof getClickReward === "function"
            ? getClickReward(clickPower)
            : clickPower;

        addGold(reward);
        playClickSound();
        createClickParticles(e);
        checkEraUpgrade(gold);
        updateUI();
        saveGame();
    });

    const resetButton = document.getElementById("resetProgress");
    if (resetButton) {
        resetButton.addEventListener("click", resetGameProgress);
    }

    setInterval(() => {
        if (autoIncome > 0) {
            addGold(getAutoPower());
            checkEraUpgrade(gold);
            updateUI();
        }
    }, 1000);

    setInterval(saveGame, 5000);
}

// ===== RESOURCE LOGIC =====
function addGold(amount) {
    gold += amount;
}

// ===== POWER SYSTEM =====
function getClickPower() {
    const upgradeMultiplier = typeof getClickUpgradeMultiplier === "function"
        ? getClickUpgradeMultiplier()
        : 1;

    return perClick * getClickMultiplier() * upgradeMultiplier;
}

function getAutoPower() {
    const upgradeMultiplier = typeof getAutoUpgradeMultiplier === "function"
        ? getAutoUpgradeMultiplier()
        : 1;

    return autoIncome * getAutoMultiplier() * upgradeMultiplier;
}

// ===== UPGRADES HELPERS =====
function addClickPower(value) {
    perClick += value;
}

function addAutoIncome(value) {
    autoIncome += value;
}

// ===== UI =====
function updateUI() {
    const era = getCurrentEra();

    document.getElementById("resources").textContent = formatNumber(Math.floor(gold));
    document.getElementById("perClick").textContent = formatNumber(getClickPower());
    document.getElementById("autoIncome").textContent = formatNumber(getAutoPower());

    const resourceName = document.getElementById("resourceName");
    if (resourceName && era) resourceName.textContent = era.resourceName;

    updateEraProgress(gold);
    refreshUpgradeAffordability();
}

// ===== SAVE / LOAD =====
function saveGame() {
    saveToStorage({
        gold,
        perClick,
        autoIncome,
        era: currentEraIndex,
        upgrades: getUpgradesData()
    });
}

function loadGame() {
    const data = loadFromStorage();
    if (!data) return;

    gold = Number(data.gold) || 0;
    perClick = Number(data.perClick) || 1;
    autoIncome = Number(data.autoIncome) || 0;
    if (typeof loadUpgrades === "function") {
        loadUpgrades(data.upgrades);
    }

    currentEraIndex = Number(data.era) || 0;

    if (typeof getEraIndexForProgress === "function") {
        currentEraIndex = Math.max(currentEraIndex, getEraIndexForProgress(gold, currentEraIndex));
    }
}

function resetGameProgress() {
    const confirmed = window.confirm("Скинуть весь прогресс?");
    if (!confirmed) return;

    clearSave();
    gold = 0;
    perClick = 1;
    autoIncome = 0;
    currentEraIndex = 0;

    if (typeof resetUpgrades === "function") {
        resetUpgrades();
    }

    applyEra({ silent: true });
    renderUpgrades();
    updateUI();
    saveGame();
}

// ===== SOUND =====
function initSound() {
    if (window.SoundManager) {
        SoundManager.init();
    }
}

function initParticles() {
    if (window.ParticleSystem) {
        ParticleSystem.init();
    }
}

function createClickParticles(event) {
    if (window.ParticleSystem) {
        ParticleSystem.createParticles(event.clientX, event.clientY, currentEraIndex);
    }
}

function playClickSound() {
    if (window.SoundManager) {
        SoundManager.playClick(currentEraIndex);
    }
}

// ===== GETTERS FOR ERAS =====
function getClickMultiplier() {
    return ERAS?.[currentEraIndex]?.clickMultiplier || 1;
}

function getAutoMultiplier() {
    return ERAS?.[currentEraIndex]?.autoMultiplier || 1;
}
