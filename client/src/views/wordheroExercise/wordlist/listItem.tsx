/* eslint-disable react/jsx-one-expression-per-line */
import React from "react";
import { TextToSpeech } from "../../../components/textToSpeech/TextToSpeech";

interface Props {
  name: string;
  useCount: number;
  increaseUse: (word) => void;
  decreaseUse: (word) => void;
}

const ListItem = ({
  name,
  useCount,
  increaseUse,
  decreaseUse,
}: Props): JSX.Element => {
  return (
    <li>
      {/* <button
        type="button"
        onClick={(): void => decreaseUse(name)}
        className="circle-sign minus"
      >
        -
      </button> */}

      <TextToSpeech text={name} />

      <button
        className="text"
        type="button"
        onClick={(): void => increaseUse(name)}
      >
        <span className="word">{name}</span>
        <span className="number">({useCount})</span>
      </button>
      {/* <button
        type="button"
        onClick={(): void => increaseUse(name)}
        className="circle-sign plus"
      >
        +
      </button> */}
    </li>
  );
};
export default ListItem;
