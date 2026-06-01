const UPGRADES = [
    {
        id: "sharp_stone",
        era: 0,
        name: "Острый камень",
        description: "+1 к силе клика",
        baseCost: 15,
        type: "click",
        value: 1,
        owned: 0
    },
    {
        id: "bone_tool",
        era: 0,
        name: "Костяное орудие",
        description: "+2 к силе клика",
        baseCost: 55,
        type: "click",
        value: 2,
        owned: 0
    },
    {
        id: "campfire",
        era: 0,
        name: "Костёр племени",
        description: "+1 дохода в секунду",
        baseCost: 45,
        type: "auto",
        value: 1,
        owned: 0
    },
    {
        id: "hunter_group",
        era: 0,
        name: "Отряд охотников",
        description: "+3 дохода в секунду",
        baseCost: 120,
        type: "auto",
        value: 3,
        owned: 0
    },
    {
        id: "scribe",
        era: 1,
        name: "Писцы и свитки",
        description: "+4 к силе клика",
        baseCost: 520,
        type: "click",
        value: 4,
        owned: 0
    },
    {
        id: "bronze_coin",
        era: 1,
        name: "Бронзовая монета",
        description: "+8 к силе клика",
        baseCost: 900,
        type: "click",
        value: 8,
        owned: 0
    },
    {
        id: "temple_tax",
        era: 1,
        name: "Храмовая казна",
        description: "+6 дохода в секунду",
        baseCost: 750,
        type: "auto",
        value: 6,
        owned: 0
    },
    {
        id: "trade_route",
        era: 1,
        name: "Торговый путь",
        description: "+12 дохода в секунду",
        baseCost: 1500,
        type: "auto",
        value: 12,
        owned: 0
    },
    {
        id: "royal_sword",
        era: 2,
        name: "Королевский меч",
        description: "+18 к силе клика",
        baseCost: 5500,
        type: "click",
        value: 18,
        owned: 0
    },
    {
        id: "knight_order",
        era: 2,
        name: "Орден рыцарей",
        description: "+35 к силе клика",
        baseCost: 9500,
        type: "click",
        value: 35,
        owned: 0
    },
    {
        id: "castle_village",
        era: 2,
        name: "Замковая деревня",
        description: "+25 дохода в секунду",
        baseCost: 7200,
        type: "auto",
        value: 25,
        owned: 0
    },
    {
        id: "blacksmith_guild",
        era: 2,
        name: "Гильдия кузнецов",
        description: "+55 дохода в секунду",
        baseCost: 15000,
        type: "auto",
        value: 55,
        owned: 0
    },
    {
        id: "steam_press",
        era: 3,
        name: "Паровой пресс",
        description: "+70 к силе клика",
        baseCost: 52000,
        type: "click",
        value: 70,
        owned: 0
    },
    {
        id: "steel_machine",
        era: 3,
        name: "Стальной механизм",
        description: "+140 к силе клика",
        baseCost: 90000,
        type: "click",
        value: 140,
        owned: 0
    },
    {
        id: "factory_line",
        era: 3,
        name: "Фабричная линия",
        description: "+120 дохода в секунду",
        baseCost: 76000,
        type: "auto",
        value: 120,
        owned: 0
    },
    {
        id: "rail_network",
        era: 3,
        name: "Железная дорога",
        description: "+260 дохода в секунду",
        baseCost: 150000,
        type: "auto",
        value: 260,
        owned: 0
    },
    {
        id: "ai_core",
        era: 4,
        name: "Ядро ИИ",
        description: "+300 к силе клика",
        baseCost: 520000,
        type: "click",
        value: 300,
        owned: 0
    },
    {
        id: "quantum_lens",
        era: 4,
        name: "Квантовая линза",
        description: "+650 к силе клика",
        baseCost: 950000,
        type: "click",
        value: 650,
        owned: 0
    },
    {
        id: "orbital_grid",
        era: 4,
        name: "Орбитальная сеть",
        description: "+700 дохода в секунду",
        baseCost: 780000,
        type: "auto",
        value: 700,
        owned: 0
    },
    {
        id: "neural_empire",
        era: 4,
        name: "Нейронная держава",
        description: "+1500 дохода в секунду",
        baseCost: 1500000,
        type: "auto",
        value: 1500,
        owned: 0
    },
    {
        id: "tribal_chant",
        era: 0,
        name: "Боевой напев",
        description: "+8% к силе всех кликов",
        baseCost: 180,
        type: "click",
        effect: "clickMultiplier",
        value: 0.08,
        maxOwned: 5,
        owned: 0
    },
    {
        id: "lucky_totem",
        era: 0,
        name: "Тотем удачи",
        description: "+3% шанс критического клика",
        baseCost: 260,
        type: "click",
        effect: "critChance",
        value: 0.03,
        maxOwned: 5,
        owned: 0
    },
    {
        id: "granary",
        era: 1,
        name: "Зерновой запас",
        description: "+10% к пассивному доходу",
        baseCost: 2200,
        type: "auto",
        effect: "autoMultiplier",
        value: 0.1,
        maxOwned: 5,
        owned: 0
    },
    {
        id: "market_bargain",
        era: 1,
        name: "Рыночный торг",
        description: "-4% к цене всех улучшений",
        baseCost: 3200,
        type: "auto",
        effect: "discount",
        value: 0.04,
        maxOwned: 5,
        owned: 0
    },
    {
        id: "royal_decree",
        era: 2,
        name: "Королевский указ",
        description: "+50% к силе критического клика",
        baseCost: 25000,
        type: "click",
        effect: "critMultiplier",
        value: 0.5,
        maxOwned: 4,
        owned: 0
    },
    {
        id: "banking_house",
        era: 2,
        name: "Банкирский дом",
        description: "+15% к пассивному доходу",
        baseCost: 30000,
        type: "auto",
        effect: "autoMultiplier",
        value: 0.15,
        maxOwned: 5,
        owned: 0
    },
    {
        id: "overdrive",
        era: 3,
        name: "Режим перегруза",
        description: "+18% к силе всех кликов",
        baseCost: 180000,
        type: "click",
        effect: "clickMultiplier",
        value: 0.18,
        maxOwned: 5,
        owned: 0
    },
    {
        id: "assembly_optimization",
        era: 3,
        name: "Оптимизация сборки",
        description: "-5% к цене всех улучшений",
        baseCost: 240000,
        type: "auto",
        effect: "discount",
        value: 0.05,
        maxOwned: 4,
        owned: 0
    },
    {
        id: "quantum_prediction",
        era: 4,
        name: "Квантовое предсказание",
        description: "+5% шанс критического клика",
        baseCost: 1800000,
        type: "click",
        effect: "critChance",
        value: 0.05,
        maxOwned: 4,
        owned: 0
    },
    {
        id: "dyson_accounting",
        era: 4,
        name: "Солнечная бухгалтерия",
        description: "+25% к пассивному доходу",
        baseCost: 2600000,
        type: "auto",
        effect: "autoMultiplier",
        value: 0.25,
        maxOwned: 5,
        owned: 0
    }
];

// ===== INIT =====
function initUpgrades() {
    renderUpgrades();
}

// ===== RENDER SHOP =====
function renderUpgrades() {
    const eraUpgrades = getAvailableUpgrades();
    const clickContainer = document.getElementById("clickUpgradesList");
    const autoContainer = document.getElementById("autoUpgradesList");
    const legacyContainer = document.getElementById("upgradesList");

    if (clickContainer || autoContainer) {
        renderUpgradeGroup(
            clickContainer,
            eraUpgrades.filter(upg => upg.type === "click")
        );
        renderUpgradeGroup(
            autoContainer,
            eraUpgrades.filter(upg => upg.type === "auto")
        );
    } else {
        renderUpgradeGroup(legacyContainer, eraUpgrades);
    }

    refreshUpgradeAffordability();
}

function renderUpgradeGroup(container, upgrades) {
    if (!container) return;

    container.innerHTML = "";

    upgrades.forEach(upg => {
        const div = document.createElement("div");
        div.className = "upgrade";
        div.dataset.upgradeId = upg.id;

        div.innerHTML = `
            <div class="upgrade-info">
                <h3>${upg.name}</h3>
                <p>${upg.description}</p>
                <span>${getUpgradeOwnedText(upg)}</span>
            </div>
            <button type="button">Купить за ${formatNumber(getUpgradeCost(upg))}</button>
        `;

        div.querySelector("button").addEventListener("click", () => {
            buyUpgrade(upg.id);
        });

        container.appendChild(div);
    });
}

function getAvailableUpgrades() {
    return UPGRADES.filter(upg => upg.era === currentEraIndex);
}

function getEraUpgradePurchases(eraIndex) {
    return UPGRADES
        .filter(upg => upg.era === eraIndex)
        .reduce((total, upg) => total + upg.owned, 0);
}

function getUpgradeOwnedText(upg) {
    if (upg.maxOwned) {
        return `Куплено: ${upg.owned} / ${upg.maxOwned}`;
    }

    return `Куплено: ${upg.owned}`;
}

function isUpgradeMaxed(upg) {
    return Boolean(upg.maxOwned) && upg.owned >= upg.maxOwned;
}

function getUpgradeEffectTotal(effect) {
    return UPGRADES
        .filter(upg => upg.effect === effect)
        .reduce((total, upg) => total + (upg.value * upg.owned), 0);
}

function getClickUpgradeMultiplier() {
    return 1 + getUpgradeEffectTotal("clickMultiplier");
}

function getAutoUpgradeMultiplier() {
    return 1 + getUpgradeEffectTotal("autoMultiplier");
}

function getCriticalClickChance() {
    return Math.min(0.5, getUpgradeEffectTotal("critChance"));
}

function getCriticalClickMultiplier() {
    return 3 + getUpgradeEffectTotal("critMultiplier");
}

function getUpgradeDiscount() {
    return Math.min(0.45, getUpgradeEffectTotal("discount"));
}

function getClickReward(baseAmount) {
    const critChance = getCriticalClickChance();
    if (critChance > 0 && Math.random() < critChance) {
        return baseAmount * getCriticalClickMultiplier();
    }

    return baseAmount;
}

// ===== BUY =====
function buyUpgrade(id) {
    const upg = UPGRADES.find(u => u.id === id);
    if (!upg) return;
    if (isUpgradeMaxed(upg)) return;

    const cost = getUpgradeCost(upg);
    if (gold < cost) return;

    gold -= cost;
    upg.owned++;

    if (!upg.effect && upg.type === "click") {
        addClickPower(upg.value);
    } else if (!upg.effect && upg.type === "auto") {
        addAutoIncome(upg.value);
    }

    if (window.SoundManager) {
        SoundManager.playEffect("buy");
    }

    checkEraUpgrade(gold);
    renderUpgrades();
    updateUI();
    saveGame();
}

function refreshUpgradeAffordability() {
    const buttons = document.querySelectorAll(".upgrade");

    buttons.forEach(item => {
        const upg = UPGRADES.find(u => u.id === item.dataset.upgradeId);
        const button = item.querySelector("button");
        if (!upg || !button) return;

        if (isUpgradeMaxed(upg)) {
            button.textContent = "Максимум";
            button.disabled = true;
            return;
        }

        const cost = getUpgradeCost(upg);
        button.textContent = `Купить за ${formatNumber(cost)}`;
        button.disabled = gold < cost;
    });
}

// ===== COST =====
function getUpgradeCost(upg) {
    const discount = getUpgradeDiscount();
    const cost = upg.baseCost * Math.pow(1.2, upg.owned) * (1 - discount);

    return Math.max(1, Math.floor(cost));
}

// ===== SAVE SUPPORT =====
function getUpgradesData() {
    return UPGRADES.map(u => ({
        id: u.id,
        owned: u.owned
    }));
}

function loadUpgrades(data) {
    if (!data) return;

    data.forEach(saved => {
        const upg = UPGRADES.find(u => u.id === saved.id);
        if (!upg) return;

        const owned = Number(saved.owned) || 0;
        upg.owned = upg.maxOwned ? Math.min(owned, upg.maxOwned) : owned;
    });
}
