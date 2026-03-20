// Browser Speech Synthesis utility for offline TTS
const speak = (text: string, rate = 0.8, pitch = 1.1) => {
  if (!('speechSynthesis' in window)) return;
  
  window.speechSynthesis.cancel();
  
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'es-ES';
  utterance.rate = rate;
  utterance.pitch = pitch;
  utterance.volume = 1;

  // Try to find a Spanish voice
  const voices = window.speechSynthesis.getVoices();
  const spanishVoice = voices.find(v => v.lang.startsWith('es'));
  if (spanishVoice) utterance.voice = spanishVoice;

  window.speechSynthesis.speak(utterance);
};

export const speakWord = (word: string) => speak(word, 0.7, 1.2);
export const speakSyllable = (syllable: string) => speak(syllable, 0.6, 1.3);
export const speakSound = (sound: string) => speak(sound, 0.65, 1.1);
export const speakCelebration = (text: string) => speak(text, 0.85, 1.0);
