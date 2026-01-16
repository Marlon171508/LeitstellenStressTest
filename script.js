"use strict";

/* ============================
   TippTest – script.js
   ============================ */

/* -------- Texte -------- */
const TEXTS = [
    "Programmieren macht Spaß und erfordert Konzentration und Übung.",
    "Die Schreibgeschwindigkeit verbessert sich mit regelmäßigem Training.",
    "GitHub Pages ist eine einfache Möglichkeit Webseiten zu veröffentlichen.",
    "Sauberer Code ist genauso wichtig wie funktionierender Code.",
    "Ein gutes Benutzererlebnis beginnt mit durchdachtem Design."
];

/* -------- DOM -------- */
const textEl = document.getElementById("text");
const inputEl = document.getElementById("input");
const timerEl = document.getElementById("timer");
const resultsEl = document.getElementById("results");
const timeSelectEl = document.getElementById("timeSelect");

/* -------- State -------- */
let timer = null;
let timeLeft = 0;
let testRunning = false;
let currentText = "";

/* ============================
   Test starten
   ============================ */
function startTest() {
    clearInterval(timer);

    timeLeft = parseInt(timeSelectEl.value, 10);
    testRunning = true;

    inputEl.value = "";
    inputEl.disabled = false;
    inputEl.focus();

    resultsEl.style.display = "none";
    timerEl.textContent = `⏱ ${timeLeft}s`;

    loadRandomText();
    timer = setInterval(updateTimer, 1000);
}

/* ============================
   Zufälligen Text laden
   ============================ */
function loadRandomText() {
    currentText = TEXTS[Math.floor(Math.random() * TEXTS.length)];
    textEl.innerHTML = "";

    [...currentText].forEach(char => {
        const span = document.createElement("span");
        span.textContent = char;
        textEl.appendChild(span);
    });
}

/* ============================
   Timer
   ============================ */
function updateTimer() {
    if (timeLeft <= 0) {
        finishTest();
        return;
    }

    timeLeft--;
    timerEl.textContent = `⏱ ${timeLeft}s`;
}

/* ============================
   Eingabe prüfen
   ============================ */
inputEl.addEventListener("input", () => {
    if (!testRunning) return;

    const inputChars = inputEl.value.split("");
    const textChars = textEl.querySelectorAll("span");

    let errors = 0;

    textChars.forEach((charSpan, index) => {
        const typedChar = inputChars[index];

        if (typedChar === undefined) {
            charSpan.className = "";
        } else if (typedChar === charSpan.textContent) {
            charSpan.className = "correct";
        } else {
            charSpan.className = "incorrect";
            errors++;
        }
    });
});

/* ============================
   Test beenden & auswerten
   ============================ */
function finishTest() {
    clearInterval(timer);
    testRunning = false;
    inputEl.disabled = true;

    const typedText = inputEl.value.trim();
    const charCount = typedText.length;
    const wordCount = typedText ? typedText.split(/\s+/).length : 0;
    const errorCount = textEl.querySelectorAll(".incorrect").length;

    const duration = parseInt(timeSelectEl.value, 10);
    const wpm = Math.round((wordCount / duration) * 60);
    const accuracy = charCount
        ? Math.max(0, ((charCount - errorCount) / charCount) * 100)
        : 0;

    updateResults(wpm, charCount, errorCount, accuracy);
}

/* ============================
   Ergebnisse anzeigen
   ============================ */
function updateResults(wpm, chars, errors, accuracy) {
    document.getElementById("wpm").textContent = wpm;
    document.getElementById("chars").textContent = chars;
    document.getElementById("errors").textContent = errors;
    document.getElementById("accuracy").textContent = accuracy.toFixed(1) + "%";

    resultsEl.style.display = "grid";
}

/* ============================
   Global verfügbar machen
   ============================ */
window.startTest = startTest;
