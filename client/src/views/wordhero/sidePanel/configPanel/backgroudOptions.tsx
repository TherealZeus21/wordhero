import React from "react";
import { backgrounds } from "./helpers/bacgrounds";

interface Props {
  background: string;
  onChange: (style) => void;
}

const BackgroudOptions = (props: Props) => {
  const onSelect = (e) => {
    const style = {
      backgroundColor: e.target.dataset.color,
      backgroundImage: undefined,
      backgroundSize: undefined,
    };
    props.onChange(style);
  };

  const onImage = (bg) => {
    props.onChange(bg);
  };

  return (
    <div className="custom-input">
      <label>background</label>
      <div className="boxes-container">
        <div
          className="bg-box blue"
          onClick={onSelect}
          data-color="#0e004e"
        ></div>

        {backgrounds.map((bg, i) => (
          <div
            key={"bg-key-" + i}
            className="bg-box"
            style={bg}
            onClick={() => onImage(bg)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default BackgroudOptions;