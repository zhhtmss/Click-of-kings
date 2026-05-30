const UPGRADES = [
    {
        id: "pickaxe",
        name: "Stone Pickaxe",
        baseCost: 10,
        type: "click",
        value: 1,
        owned: 0
    },
    {
        id: "farm",
        name: "Farm",
        baseCost: 50,
        type: "auto",
        value: 1,
        owned: 0
    },
    {
        id: "mine",
        name: "Gold Mine",
        baseCost: 250,
        type: "auto",
        value: 5,
        owned: 0
    },
    {
        id: "factory",
        name: "Factory",
        baseCost: 1000,
        type: "auto",
        value: 20,
        owned: 0
    },
    {
        id: "space_ai",
        name: "Space AI Core",
        baseCost: 10000,
        type: "auto",
        value: 100,
        owned: 0
    }
];

// ===== INIT =====
function initUpgrades() {
    renderUpgrades();
}

// ===== RENDER SHOP =====
function renderUpgrades() {
    const container = document.getElementById("upgradesList");
    container.innerHTML = "";

    UPGRADES.forEach(upg => {
        const div = document.createElement("div");
        div.className = "upgrade";

        const cost = getUpgradeCost(upg);

        div.innerHTML = `
            <h3>${upg.name}</h3>
            <p>Cost: ${cost}</p>
            <p>Owned: ${upg.owned}</p>
            <button>BUY</button>
        `;

        const btn = div.querySelector("button");

        btn.addEventListener("click", () => {
            buyUpgrade(upg.id);
        });

        container.appendChild(div);
    });
}

// ===== BUY =====
function buyUpgrade(id) {
    const upg = UPGRADES.find(u => u.id === id);
    if (!upg) return;

    const cost = getUpgradeCost(upg);

    if (gold < cost) return;

    gold -= cost;
    upg.owned++;

    if (upg.type === "click") {
        addClickPower(upg.value);
    } else {
        addAutoIncome(upg.value);
    }

    renderUpgrades();
    updateUI();
    saveGame();
}

// ===== COST =====
function getUpgradeCost(upg) {
    return Math.floor(upg.baseCost * Math.pow(1.15, upg.owned));
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
        if (upg) upg.owned = saved.owned;
    });

    renderUpgrades();
}