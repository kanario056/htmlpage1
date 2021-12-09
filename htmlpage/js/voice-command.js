var voice = {
  // (A) INIT VOICE COMMAND
  wrap : null, // HTML DEMO <DIV> WRAPPER
  button : null, // HTML DEMO BUTTON
  recog : null, // SPEECH RECOGNITION OBJECT
  init : () => {
    // (A1) GET HTML ELEMENTS
    voice.wrap = document.getElementById("vwrap");
    voice.button = document.getElementById("button");

    // (A2) GET MIC ACCESS PERMISSION
    navigator.mediaDevices.getUserMedia({ audio: true })
    .then((stream) => {
      // (A3) SPEECH RECOGNITION OBJECT & SETTINGS
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      voice.recog = new SpeechRecognition();
      voice.recog.lang = "es-Do";
      voice.recog.continuous = false;
      voice.recog.interimResults = false;

      // (A4) ON SPEECH RECOGNITION - RUN CORRESPONDING COMMAND
      voice.recog.onresult = (evt) => {
        let said = evt.results[0][0].transcript.toLowerCase();
        if (cmd[said]) { cmd[said](); }
        else { said += " (command not found)"; }
        voice.wrap.innerHTML = said;
        voice.stop();
      };

      // (A5) ON SPEECH RECOGNITION ERROR
      voice.recog.onerror = (err) => { console.error(evt); };

      // (A6) READY!
      voice.button.disabled = false;
      voice.stop();
    })
    .catch((err) => {
      console.error(err);
      voice.wrap.innerHTML = "Please enable access and attach a microphone.";
    });
  },

  // (B) START SPEECH RECOGNITION
  start : () => {
    voice.recog.start();
    voice.button.onclick = voice.stop;
    voice.button.value = "Speak Now Or Click Again To Cancel";
  },

  // (C) STOP/CANCEL SPEECH RECOGNITION
  stop : () => {
    voice.recog.stop();
    voice.button.onclick = voice.start;
    voice.button.value = "Press To Speak";
  }
};
window.addEventListener("DOMContentLoaded", voice.init);

// (D) COMMANDS LIST
var cmd = {
  "encender" : () => {
    voice.wrap.style.backgroundColor = "yellow";
    voice.wrap.style.color = "black";
  },

  "apagar" : () => {
    voice.wrap.style.backgroundColor = "black";
    voice.wrap.style.color = "white";
  },

  "say hello" : () => {
    alert("Hello World!");
  }
};
