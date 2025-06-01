const phrases = [
  "Hello",
  "I'm not feeling well today.",
  "Please wait a moment.",
  "Thank you!",
  "Yes",
  "No",
];

const synth = window.speechSynthesis;

function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  // Male voice setup
  const voices = synth.getVoices();
  const maleVoice = voices.find(v => v.name.toLowerCase().includes("english") && v.name.toLowerCase().includes("male"))
                  || voices.find(v => v.name.includes("Google UK English Male")) 
                  || voices[0];
  utterance.voice = maleVoice;
  utterance.rate = 1;
  utterance.pitch = 1;
  synth.speak(utterance);
}

function speakTypedText() {
  const input = document.getElementById("customText");
  const text = input.value.trim();
  if (text) {
    speak(text);
    input.value = '';
  }
}

const buttonContainer = document.getElementById("phraseButtons");
phrases.forEach((phrase) => {
  const btn = document.createElement("button");
  btn.innerText = phrase;
  btn.className = "phrase-btn";
  btn.onclick = () => speak(phrase);
  buttonContainer.appendChild(btn);
});

document.getElementById("customText").addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    speakTypedText();
  }
});
