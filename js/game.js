let gold = 0;
let perClick = 1;
let autoIncome = 0;

let currentEraIndex = 0;

// ===== INIT GAME =====
function initGame() {
    loadGame();        // завантаження прогресу
    applyEra();        // застосувати епоху
    updateUI();        // оновити інтерфейс

    const btn = document.getElementById("clickButton");

    btn.addEventListener("click", () => {
        addGold(getClickPower());
        playClickSound();
        updateUI();
        checkEraUpgrade(gold);
    });

    // AUTO INCOME LOOP
    setInterval(() => {
        if (autoIncome > 0) {
            addGold(getAutoPower());
            updateUI();
            checkEraUpgrade(gold);
        }
    }, 1000);

    // AUTO SAVE
    setInterval(() => {
        saveGame();
    }, 5000);
}

// ===== GOLD LOGIC =====
function addGold(amount) {
    gold += amount;
}

// ===== POWER SYSTEM =====
function getClickPower() {
    return perClick * getClickMultiplier();
}

function getAutoPower() {
    return autoIncome * getAutoMultiplier();
}

// ===== UPGRADES HELPERS =====
function addClickPower(value) {
    perClick += value;
}

function addAutoIncome(value) {
    autoIncome += value;
}

// ===== ERA INTEGRATION =====
function checkEraUpgrade(totalGold) {
    if (!window.ERAS) return;

    for (let i = ERAS.length - 1; i >= 0; i--) {
        if (totalGold >= ERAS[i].minGold) {
            if (i !== currentEraIndex) {
                currentEraIndex = i;
                applyEra();
                saveGame();
            }
            break;
        }
    }
}

// ===== UI =====
function updateUI() {
    document.getElementById("resources").textContent = Math.floor(gold);
    document.getElementById("perClick").textContent = getClickPower();
    document.getElementById("autoIncome").textContent = getAutoPower();
}

// ===== SAVE / LOAD =====
function saveGame() {
    saveToStorage({
        gold,
        perClick,
        autoIncome,
        era: currentEraIndex
    });
}

function loadGame() {
    const data = loadFromStorage();
    if (!data) return;

    gold = data.gold || 0;
    perClick = data.perClick || 1;
    autoIncome = data.autoIncome || 0;
    currentEraIndex = data.era || 0;
}

// ===== SOUND =====
function playClickSound() {
    if (window.playSound) {
        playSound("click");
    }
}

// ===== GETTERS FOR ERAS =====
function getClickMultiplier() {
    return ERAS?.[currentEraIndex]?.clickMultiplier || 1;
}

function getAutoMultiplier() {
    return ERAS?.[currentEraIndex]?.autoMultiplier || 1;
}

// ===== START GAME =====
window.addEventListener("load", initGame);