let synth: SpeechSynthesis;
let utter: SpeechSynthesisUtterance;
let isSupported = false;

if (!!window.speechSynthesis) {
  synth = window.speechSynthesis;
  utter = new SpeechSynthesisUtterance();
  isSupported = true;

  setTimeout(() => {
    utter.voice =
      synth
        .getVoices()
        .find(
          (voice) =>
            voice.name === "Google US English" ||
            voice.name === "Microsoft Zira Desktop - English (United States)"
        ) || ({} as SpeechSynthesisVoice);
    utter.pitch = 1;
    utter.rate = 1;
  }, 1000);
}

export function Speak(text: string) {
  if (!isSupported) {
    return;
  }
  utter.text = text;
  synth.speak(utter);
}
