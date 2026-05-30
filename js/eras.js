const ERAS = [
    {
        name: "Survival Age",
        minGold: 0,
        clickMultiplier: 1,
        autoMultiplier: 1,
        background: "assets/images/backgrounds/era1.webp",
        clickImage: "assets/images/items/era1_click.webp"
    },
    {
        name: "Simple Life",
        minGold: 100,
        clickMultiplier: 2,
        autoMultiplier: 2,
        background: "assets/images/backgrounds/era2.webp",
        clickImage: "assets/images/items/era2_click.webp"
    },
    {
        name: "City & Business",
        minGold: 1000,
        clickMultiplier: 5,
        autoMultiplier: 5,
        background: "assets/images/backgrounds/era3.webp",
        clickImage: "assets/images/items/era3_click.webp"
    },
    {
        name: "Tech Era",
        minGold: 10000,
        clickMultiplier: 12,
        autoMultiplier: 15,
        background: "assets/images/backgrounds/era4.webp",
        clickImage: "assets/images/items/era4_click.webp"
    },
    {
        name: "Space Future",
        minGold: 100000,
        clickMultiplier: 30,
        autoMultiplier: 50,
        background: "assets/images/backgrounds/era5.webp",
        clickImage: "assets/images/items/era5_click.webp"
    }
];

let currentEraIndex = 0;

function getCurrentEra() {
    return ERAS[currentEraIndex];
}

function checkEraUpgrade(totalGold) {
    for (let i = ERAS.length - 1; i >= 0; i--) {
        if (totalGold >= ERAS[i].minGold) {
            if (i !== currentEraIndex) {
                currentEraIndex = i;
                applyEra();
            }
            break;
        }
    }
}

function applyEra() {
    const era = getCurrentEra();

    // UI TEXT
    const eraName = document.getElementById("eraName");
    if (eraName) eraName.textContent = era.name;

    // BACKGROUND
    const bg = document.getElementById("background");
    if (bg) {
        bg.style.backgroundImage = `url(${era.background})`;
        bg.style.backgroundSize = "cover";
        bg.style.backgroundPosition = "center";
    }

    // CLICK IMAGE
    const clickImg = document.getElementById("clickImage");
    if (clickImg) {
        clickImg.src = era.clickImage;
    }

    // SAVE ERA (optional)
    if (window.saveGame) {
        window.saveGame();
    }

    console.log("Era changed to:", era.name);
}

function getClickMultiplier() {
    return getCurrentEra().clickMultiplier;
}

function getAutoMultiplier() {
    return getCurrentEra().autoMultiplier;
}