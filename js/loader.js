window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    const game = document.getElementById("game");
    setTimeout(() => {
        loader.style.opacity = "0";
        setTimeout(() => {
            loader.style.display = "none";
            game.classList.remove("hidden");
        },500);
    },1500);
});