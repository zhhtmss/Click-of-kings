// ===== APP ENTRY POINT =====
window.addEventListener("load", () => {
    if (typeof initGame === "function") {
        initGame();
    }
});
