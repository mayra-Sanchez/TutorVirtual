import { useState, useEffect, useRef } from "react";

const useSpeechApi = (options) => {
  const [transcript, setTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    const recognition = new (window.SpeechRecognition ||
      window.webkitSpeechRecognition)();
    recognition.lang = "es-ES";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognitionRef.current = recognition;

    const handleResult = (event) => {
      const last = event.results.length - 1;
      const text = event.results[last][0].transcript;
      setTranscript((prevTranscript) => prevTranscript + " " + text);
    };

    recognition.onresult = handleResult;

    recognition.onstart = () => {
      setIsListening(true);
      setTranscript("");
    };

    recognition.onerror = (event) => {
      console.error("Error en el reconocimiento de voz:", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    if (isListening) {
      recognition.start();
    } else {
      recognition.stop();
    }

    return () => recognition.stop();
  }, [isListening]);

  return {
    transcript,
    isListening,
    startListening: () => setIsListening(true),
    stopListening: () => setIsListening(false),
  };
};

export { useSpeechApi };
