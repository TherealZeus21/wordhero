import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeUp } from "@fortawesome/free-solid-svg-icons";
import { Speak } from "../../services/textToSpeechService";

interface Props {
  text: string;
}

export const TextToSpeech = ({ text }: Props) => {
  if (!window.speechSynthesis) {
    return null;
  }
  return <FontAwesomeIcon onClick={() => Speak(text)} icon={faVolumeUp} />;
};
