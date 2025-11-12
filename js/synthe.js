const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// --- Master Gain pour un volume plus fort ---
const masterGain = audioContext.createGain();
masterGain.gain.value = 0.7; // bien audible
masterGain.connect(audioContext.destination);

// --- Reverb légère ---
const reverb = audioContext.createConvolver();
const irBuffer = audioContext.createBuffer(
  2,
  audioContext.sampleRate * 2,
  audioContext.sampleRate
);
for (let c = 0; c < irBuffer.numberOfChannels; c++) {
  const data = irBuffer.getChannelData(c);
  for (let i = 0; i < data.length; i++) {
    data[i] = Math.random() * Math.pow(1 - i / data.length, 2);
  }
}
reverb.buffer = irBuffer;
reverb.connect(masterGain);

// --- Définition des touches ---
const getElementByNote = (note) => document.querySelector(`[note="${note}"]`);
const keys = {
  A: { element: getElementByNote("C"), note: "C", octaveOffset: 0 },
  W: { element: getElementByNote("C#"), note: "C#", octaveOffset: 0 },
  S: { element: getElementByNote("D"), note: "D", octaveOffset: 0 },
  E: { element: getElementByNote("D#"), note: "D#", octaveOffset: 0 },
  D: { element: getElementByNote("E"), note: "E", octaveOffset: 0 },
  F: { element: getElementByNote("F"), note: "F", octaveOffset: 0 },
  T: { element: getElementByNote("F#"), note: "F#", octaveOffset: 0 },
  G: { element: getElementByNote("G"), note: "G", octaveOffset: 0 },
  Y: { element: getElementByNote("G#"), note: "G#", octaveOffset: 0 },
  H: { element: getElementByNote("A"), note: "A", octaveOffset: 1 },
  U: { element: getElementByNote("A#"), note: "A#", octaveOffset: 1 },
  J: { element: getElementByNote("B"), note: "B", octaveOffset: 1 },
  K: { element: getElementByNote("C2"), note: "C", octaveOffset: 1 },
  O: { element: getElementByNote("C#2"), note: "C#", octaveOffset: 1 },
  L: { element: getElementByNote("D2"), note: "D", octaveOffset: 1 },
  P: { element: getElementByNote("D#2"), note: "D#", octaveOffset: 1 },
  semicolon: { element: getElementByNote("E2"), note: "E", octaveOffset: 1 },
};

// --- Conversion note → fréquence ---
const getHz = (note = "A", octave = 4) => {
  const A4 = 440;
  let N = 0;
  switch (note) {
    default:
    case "A":
      N = 0;
      break;
    case "A#":
    case "Bb":
      N = 1;
      break;
    case "B":
      N = 2;
      break;
    case "C":
      N = 3;
      break;
    case "C#":
    case "Db":
      N = 4;
      break;
    case "D":
      N = 5;
      break;
    case "D#":
    case "Eb":
      N = 6;
      break;
    case "E":
      N = 7;
      break;
    case "F":
      N = 8;
      break;
    case "F#":
    case "Gb":
      N = 9;
      break;
    case "G":
      N = 10;
      break;
    case "G#":
    case "Ab":
      N = 11;
      break;
  }
  N += 12 * (octave - 4);
  return A4 * Math.pow(2, N / 12);
};

const pressedNotes = new Map();
let clickedKey = "";

// --- Jouer une note ---
const playKey = (key) => {
  if (!keys[key]) return;

  const osc = audioContext.createOscillator();
  const noteGainNode = audioContext.createGain();
  noteGainNode.connect(reverb);

  osc.connect(noteGainNode);
  osc.type = "triangle"; // son doux style Rhodes
  osc.frequency.value = getHz(keys[key].note, keys[key].octaveOffset + 3);

  // ADSR plus doux pour Rhodes
  const now = audioContext.currentTime;
  noteGainNode.gain.setValueAtTime(0.0001, now);
  noteGainNode.gain.exponentialRampToValueAtTime(0.6, now + 0.05); // Attack un peu plus long
  noteGainNode.gain.exponentialRampToValueAtTime(0.2, now + 1); // Decay
  noteGainNode.gain.exponentialRampToValueAtTime(0.0001, now + 2); // Release

  keys[key].element.classList.add("pressed");
  pressedNotes.set(key, osc);
  osc.start();
};

// --- Stopper une note ---
const stopKey = (key) => {
  if (!keys[key]) return;
  keys[key].element.classList.remove("pressed");
  const osc = pressedNotes.get(key);
  if (osc) {
    setTimeout(() => osc.stop(), 2000);
    pressedNotes.delete(key);
  }
};

// --- Gestion clavier ---
document.addEventListener("keydown", (e) => {
  const eventKey = e.key.toUpperCase();
  const key = eventKey === ";" ? "semicolon" : eventKey;
  if (!key || pressedNotes.get(key)) return;
  playKey(key);
});
document.addEventListener("keyup", (e) => {
  const eventKey = e.key.toUpperCase();
  const key = eventKey === ";" ? "semicolon" : eventKey;
  if (!key) return;
  stopKey(key);
});

// --- Gestion clic souris ---
for (const [key, { element }] of Object.entries(keys)) {
  element.addEventListener("mousedown", () => {
    playKey(key);
    clickedKey = key;
  });
}
document.addEventListener("mouseup", () => {
  stopKey(clickedKey);
});

// Sélectionner les boutons
const btnMinus = document.querySelector(".button1");
const btnPlus = document.querySelector(".button2");

// Fonction pour diminuer le volume
btnMinus.addEventListener("click", () => {
  masterGain.gain.value = Math.max(0, masterGain.gain.value - 0.1);
  console.log("Volume:", Math.round(masterGain.gain.value * 100) + "%");
});

// Fonction pour augmenter le volume
btnPlus.addEventListener("click", () => {
  masterGain.gain.value = Math.min(1, masterGain.gain.value + 0.1);
  console.log("Volume:", Math.round(masterGain.gain.value * 100) + "%");
});

// Sélectionner les boutons PLAY et RECORD (stop)
const btnPlay = document.querySelector(".button4");
const btnStop = document.querySelector(".button3");

// Créer un élément audio
const audioPlayer = new Audio("../assets/audio/BHT_125_break_loop_encode.wav");

// Créer un gain spécifique pour l'audio
const audioGain = audioContext.createGain();
audioGain.gain.value = 0.6; // Réduire à 30% du volume

// Connecter : audioPlayer → audioGain → masterGain
const audioSource = audioContext.createMediaElementSource(audioPlayer);
audioSource.connect(audioGain);
audioGain.connect(masterGain);

// Lancer la lecture au clic sur PLAY
btnPlay.addEventListener("click", () => {
  audioPlayer.play();
  console.log("Lecture en cours");
});

// Arrêter la lecture au clic sur RECORD (stop)
btnStop.addEventListener("click", () => {
  audioPlayer.pause();
  audioPlayer.currentTime = 0;
  console.log("Lecture arrêtée");
});
