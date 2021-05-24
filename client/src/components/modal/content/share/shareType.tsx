import React from "react";

interface Props {
  selectedType: string;
  switchType: (type: string) => void;
}

export const ShareType = ({ selectedType, switchType }: Props) => {
  return (
    <div>
      <h3>Share type:</h3>
      <ul className="share-content-type">
        <li
          className={`display-type ${
            selectedType === "spidergram" ? "selected" : ""
          }`}
          onClick={() => switchType("spidergram")}
        >
          <div className="box">
            <img
              src={require(`../../../../assets/icons/spidegram${
                selectedType === "spidergram" ? "_selected" : ""
              }.svg`)}
              alt="wordcloud"
            />
          </div>
          <div className="text">empty spidergram</div>
        </li>
        <li
          className={`display-type ${
            selectedType === "spidergram-done" ? "selected" : ""
          }`}
          onClick={() => switchType("spidergram-done")}
        >
          <div className="box">
            <img
              src={require(`../../../../assets/icons/spidegram${
                selectedType === "spidergram-done" ? "_selected" : ""
              }.svg`)}
              alt="wordcloud"
            />
          </div>
          <div className="text">fulfilled spidergram</div>
        </li>
        <li
          className={`display-type ${
            selectedType === "game" ? "selected" : ""
          }`}
          onClick={() => switchType("game")}
        >
          <div className="box">
            <img
              src={require(`../../../../assets/icons/spidegram${
                selectedType === "game" ? "_selected" : ""
              }.svg`)}
              alt="game"
            />
          </div>
          <div className="text">Game</div>
        </li>
      </ul>
    </div>
  );
};
