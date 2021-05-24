import React from "react";

interface Props {
  onClick: () => void;
}

export const QuestionIcon = ({ onClick }: Props) => {
  return (
    <div className="question-icon" onClick={onClick}>
      ?
    </div>
  );
};
