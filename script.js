function getTodayKey() {
  const today = new Date();
  return today.toISOString().split("T")[0];
}

function updateStreak() {
  const lastSeen = localStorage.getItem("last_seen");
  const streak = parseInt(localStorage.getItem("streak") || "0", 10);
  const today = getTodayKey();

  if (lastSeen !== today) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yKey = yesterday.toISOString().split("T")[0];

    const newStreak = (lastSeen === yKey) ? streak + 1 : 1;
    localStorage.setItem("streak", newStreak.toString());
    localStorage.setItem("last_seen", today);
  }

  document.getElementById("streak-count").textContent = localStorage.getItem("streak") || "1";
}

function loadVerse() {
  const url = "https://beta.ourmanna.com/api/v1/get/?format=json&order=daily";
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const verse = data.verse.details.text;
      const reference = data.verse.details.reference;
      document.getElementById("verse").textContent = verse;
      document.getElementById("reference").textContent = reference;
    })
    .catch(() => {
      document.getElementById("verse").textContent = "Failed to load verse..";
    });
}

document.addEventListener("DOMContentLoaded", () => {
  loadVerse();
  updateStreak();
});