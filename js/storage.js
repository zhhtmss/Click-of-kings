const SAVE_KEY = "click_of_kings_save";

// ===== SAVE =====
function saveToStorage(data) {
    try {
        localStorage.setItem(SAVE_KEY, JSON.stringify(data));
    } catch (err) {
        console.error("Save error:", err);
    }
}

// ===== LOAD =====
function loadFromStorage() {
    try {
        const data = localStorage.getItem(SAVE_KEY);
        return data ? JSON.parse(data) : null;
    } catch (err) {
        console.error("Load error:", err);
        return null;
    }
}

// ===== CLEAR SAVE =====
function clearSave() {
    localStorage.removeItem(SAVE_KEY);
}