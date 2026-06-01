function formatNumber(value) {
    const number = Number(value) || 0;

    if (number >= 1000000) return (Math.floor(number / 100000) / 10) + 'M';
    if (number >= 1000) return (Math.floor(number / 100) / 10) + 'K';

    return Math.floor(number).toString();
}

function initEraUI() {
    fixLegacyText();
    ensureEraPanel();
    ensureSoundToggle();
}

function fixLegacyText() {
    const loaderTitle = document.querySelector("#loader h1");
    if (loaderTitle) loaderTitle.textContent = "Click of Kings";

    const clickShopTitle = document.querySelector(".shop-click h2");
    if (clickShopTitle) clickShopTitle.textContent = "Click Upgrades";

    const autoShopTitle = document.querySelector(".shop-auto h2");
    if (autoShopTitle) autoShopTitle.textContent = "Income Per Second";

    const legacyShopTitle = document.querySelector(".shop:not(.shop-click):not(.shop-auto) h2");
    if (legacyShopTitle) legacyShopTitle.textContent = "Улучшения эпохи";
}

function ensureEraPanel() {
    if (document.getElementById("eraDescription")) return;

    const gameArea = document.querySelector(".game-area");
    const clickButton = document.getElementById("clickButton");
    if (!gameArea || !clickButton) return;

    const panel = document.createElement("section");
    panel.className = "era-panel";
    panel.setAttribute("aria-live", "polite");
    panel.innerHTML = `
        <p id="eraDescription">Развивайте цивилизацию кликами и улучшениями.</p>
        <div class="progress-wrap">
            <div class="progress-label">
                <span id="nextEraLabel">Следующая эпоха</span>
                <span id="nextEraCost">0</span>
            </div>
            <div class="progress-bar">
                <span id="eraProgress"></span>
            </div>
        </div>
    `;

    gameArea.insertBefore(panel, clickButton);
}

function ensureSoundToggle() {
    const hudRight = document.querySelector(".hud .right");
    if (!hudRight || document.getElementById("soundToggle")) return;

    hudRight.innerHTML = `
        <div><span id="resourceName">Власть</span>: <span id="resources">0</span></div>
        <div>Клик: <span id="perClick">1</span></div>
        <div>Доход: <span id="autoIncome">0</span>/с</div>
        <button id="soundToggle" class="sound-toggle" type="button" aria-label="Включить или выключить звук">Звук: вкл</button>
    `;
}
