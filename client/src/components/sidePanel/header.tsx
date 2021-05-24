import React from "react";

interface Props {
  onClose: () => void;
  onSave?: () => void;
  topic: string;
}

export const Header = ({ onClose, onSave, topic }: Props) => {
  return (
    <header>
      <button className="middle eclipse" onClick={onClose} type="button">
        Close
      </button>

      <h3>{topic}</h3>

      {onSave !== undefined ? (
        <button
          className="yellow middle eclipse"
          onClick={onSave}
          type="button"
        >
          Save
        </button>
      ) : (
        <span></span>
      )}
    </header>
  );
};
