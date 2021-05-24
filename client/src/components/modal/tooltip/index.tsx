import React, { useState } from "react";
import Input from "../../controls/input";

interface Props {
  addGroupPositionPopup: null | {
    x: number;
    y: number;
  };
  onSubmit: (value: string) => void;
  label: string;
  submitName: string;
}

const TooltipModal = ({
  addGroupPositionPopup,
  onSubmit,
  label,
  submitName,
}: Props) => {
  const [value, setValue] = useState("");

  return (
    <form
      className="add-new-group"
      style={{ top: addGroupPositionPopup?.y, left: addGroupPositionPopup?.x }}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(value);
      }}
    >
      <Input
        label={label}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        focus
      />

      <input type="submit" value={submitName} />
    </form>
  );
};

export default TooltipModal;
