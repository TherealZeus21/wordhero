import React from "react";
import "./typeSwitcher.scss";

interface Props {
  onSwitch: (type: string) => void;
  selected: string;
}

export const TypeSwitcher = ({ selected, onSwitch }: Props) => {
  return (
    <div className="type-switcher">
      <div className="display-type-container">
        <div
          className={`display-type ${
            selected === "wordcloud" ? "selected" : ""
          }`}
          onClick={() => onSwitch("wordcloud")}
        >
          <div className="box">
            <img
              src={require(`../../assets/icons/wordcloud${
                selected === "wordcloud" ? "_selected" : ""
              }.svg`)}
              alt="wordcloud"
            />
          </div>
        </div>

        <div
          className={`display-type ${
            selected === "spidergram" ? "selected" : ""
          }`}
          onClick={() => onSwitch("spidergram")}
        >
          <div className="box">
            <img
              src={require(`../../assets/icons/spidegram${
                selected === "spidergram" ? "_selected" : ""
              }.svg`)}
              alt="wordcloud"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
