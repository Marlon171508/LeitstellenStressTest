const consoleEl = document.getElementById("console");
const inputEl = document.getElementById("userInput");
const timerEl = document.getElementById("timer");

let questionCount = 0;
let incident = null;
let countdown = null;
let remainingSeconds = 0;

const incidents = [
{
name: "Wohnungsbrand",
intro: "Hallo?! Können Sie mich hören?! Es brennt in meiner Wohnung, überall Rauch!",
reactions: {
wo: "Zu Hause, dritte Etage! Ich sehe kaum noch was!",
verletzt: "Ich huste stark, meine Augen brennen total!",
allein: "Nein! Meine Katze ist noch hier drin!"
}
},
{
name: "Herzinfarkt",
intro: "Mir geht es richtig schlecht… meine Brust tut furchtbar weh!",
reactions: {
wo: "In meiner Wohnung… ich liege auf dem Boden!",
schmerz: "Ja! Es zieht in den linken Arm, mir ist übel!",
allein: "Ich bin allein, bitte schicken Sie Hilfe!"
}
},
{
name: "Verkehrsunfall",
intro: "Ich hatte einen Unfall! Mein Auto ist kaputt!",
reactions: {
wo: "Auf einer Landstraße, ich sehe ein Schild B17!",
verletzt: "Mein Bein tut höllisch weh, ich kann es nicht bewegen!",
allein: "Andere Leute sind da, aber keiner weiß was zu tun ist!"
}
},
{
name: "Bewusstlose Person",
intro: "Hier liegt jemand auf dem Boden und bewegt sich nicht!",
reactions: {
wo: "Im Park, beim Spielplatz!",
atmet: "Ja… aber ganz flach!",
allein: "Ich bin allein mit der Person, bitte helfen Sie mir!"
}
}
];

function addMessage(text, type) {
const div = document.createElement("div");
div.className = "message " + type;
div.textContent = text;
consoleEl.appendChild(div);
consoleEl.scrollTop = consoleEl.scrollHeight;
}

function startIncident() {
incident = incidents[Math.floor(Math.random() * incidents.length)];
addMessage(incident.intro, "caller");
startTimer(180);
}

function startTimer(seconds) {
remainingSeconds = seconds;
updateTimer();
countdown = setInterval(() => {
remainingSeconds--;
updateTimer();
if (remainingSeconds <= 0) {
clearInterval(countdown);
addMessage("Hallo?! Bitte sagen Sie doch was!", "caller");
}
}, 1000);
}

function updateTimer() {
const m = String(Math.floor(remainingSeconds / 60)).padStart(2, "0");
const s = String(remainingSeconds % 60).padStart(2, "0");
timerEl.textContent = m + ":" + s;
}

function callerResponse(question) {
const q = question.toLowerCase();

for (let key in incident.reactions) {
if (q.includes(key)) {
return incident.reactions[key];
}
}

if (q.includes("mutter") || q.includes("groß")) {
return "Was?! Das ist doch völlig egal! Es ist ein Notfall!";
}

if (q.includes("ruhig") || q.includes("beruhigen")) {
return "Ich versuche ja ruhig zu bleiben, aber das ist schwer!";
}

return "Ich weiß es nicht genau! Bitte schicken Sie einfach Hilfe!";
}

inputEl.addEventListener("keydown", e => {
if (e.key === "Enter" && inputEl.value.trim() !== "") {
const text = inputEl.value;
inputEl.value = "";

addMessage("Disponent: " + text, "dispatcher");
questionCount++;

if (!incident && questionCount >= 2) {
  startIncident();
  return;
}

if (incident) {
  setTimeout(() => {
    addMessage(callerResponse(text), "caller");
  }, 600);
}


}
});

addMessage("System: Verbindung hergestellt. Warten auf eingehenden Notruf …", "dispatcher");
