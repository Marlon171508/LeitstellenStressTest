const consoleEl = document.getElementById("console");
const inputEl = document.getElementById("userInput");

// Aktueller Anrufer-Zustand
let incident = null;

// Verschiedene Einsatztypen
const incidents = [
"Wohnungsbrand",
"Herzinfarkt",
"Verkehrsunfall",
"Bewusstlose Person",
"Überfall",
"Geburt",
"Sturz/Verletzung"
];

// Emotionen, die der Anrufer zeigen kann
const emotions = [
"panisch",
"verängstigt",
"verwirrt",
"weinerlich",
"schreiend"
];

// Initialisiere die Simulation
function init() {
addMessage("System: Verbindung hergestellt. Warten auf eingehenden Notruf …", "dispatcher");
}

// Füge Nachricht ins Konsolenfenster ein
function addMessage(text, type) {
const div = document.createElement("div");
div.className = "message " + type;
div.textContent = text;
consoleEl.appendChild(div);
consoleEl.scrollTop = consoleEl.scrollHeight;
}

// Starte zufälligen Einsatz
function startIncident() {
if (incident) return; // nur einmal starten
const randomIncident = incidents[Math.floor(Math.random() * incidents.length)];
const emotion = emotions[Math.floor(Math.random() * emotions.length)];
incident = { type: randomIncident, emotion: emotion };

let intro = "";
switch (randomIncident) {
case "Wohnungsbrand":
intro = "Hallo?! Hilfe! Es brennt! Überall Rauch!";
break;
case "Herzinfarkt":
intro = "Mir geht’s schlecht… meine Brust tut weh, ich kann kaum atmen!";
break;
case "Verkehrsunfall":
intro = "Ich hatte einen Unfall! Mein Auto ist kaputt, jemand muss kommen!";
break;
case "Bewusstlose Person":
intro = "Hier liegt jemand bewusstlos am Boden!";
break;
case "Überfall":
intro = "Hilfe! Ich werde gerade überfallen!";
break;
case "Geburt":
intro = "Es geht los! Das Baby kommt! Bitte helfen Sie!";
break;
case "Sturz/Verletzung":
intro = "Ich bin gestürzt und kann mich nicht bewegen!";
break;
default:
intro = "Notfall! Ich brauche Hilfe!";
}

setTimeout(() => addMessage(intro, "caller"), 500); // kleine Verzögerung für Realismus
}

// Erstelle dynamische Anruferantworten
function callerResponse(question) {
const q = question.toLowerCase().trim();

// Reagiere emotional
const emotionPhrases = {
panisch: ["Oh nein, bitte schnell!", "Ich weiß nicht, was ich tun soll!", "Bitte helfen Sie!"],
verängstigt: ["Ich habe Angst!", "Es passiert alles so schnell!", "Bitte beruhigen Sie mich!"],
verwirrt: ["Was? Ich verstehe nicht!", "Warum fragen Sie das?", "Ich bin verwirrt!"],
weinerlich: ["Ich kann nicht mehr!", "Es ist alles so schlimm!", "Bitte, helfen Sie mir!"],
schreiend: ["Ahhhh!", "Hilfeeee!", "Es brennt!"]
};

// Wenn Frage unpassend ist
const inappropriateKeywords = ["mutter", "groß", "hund", "katze", "alter"];
if (inappropriateKeywords.some(k => q.includes(k))) {
return ["Was hat das damit zu tun?", "Warum fragen Sie das jetzt?", "Das ist doch gerade nicht wichtig!"][Math.floor(Math.random()*3)];
}

// Wenn Notfall-Thema erwähnt wird
const keywords = ["feuer","brand","schmerz","unfall","hilfe","baby","blut","bewusstlos"];
if (keywords.some(k => q.includes(k))) {
return emotionPhrases[incident.emotion][Math.floor(Math.random()*emotionPhrases[incident.emotion].length)];
}

// Standardantwort: logisch, emotional
const genericResponses = [
"Bitte schicken Sie einfach Hilfe!",
"Ich weiß nicht, was ich tun soll!",
"Schnell, es wird schlimmer!",
"Warum fragen Sie das?",
"Ich habe Angst!"
];

return genericResponses[Math.floor(Math.random() * genericResponses.length)];
}

// Eingabe des Disponenten
inputEl.addEventListener("keydown", e => {
if (e.key === "Enter" && inputEl.value.trim() !== "") {
const text = inputEl.value;
inputEl.value = "";

addMessage("Disponent: " + text, "dispatcher");

// Einsatz starten, falls noch nicht aktiv
if (!incident) startIncident();

// Dynamische Antwort nach kurzer Verzögerung
setTimeout(() => {
  addMessage(callerResponse(text), "caller");
}, 500 + Math.random()*500);


}
});

// Starte Simulation
init();
