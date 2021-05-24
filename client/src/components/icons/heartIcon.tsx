import React from "react";

interface Props {
  fill: boolean;
  disabled?: boolean;
  onClick: (e: any) => void;
}

const HeartIcon = ({ fill, onClick }: Props): JSX.Element => {
  const name = `like${fill ? "-selected" : ""}.svg`;

  return (
    <img
      src={require(`../../assets/icons/${name}`)}
      alt="word hero img"
      className="heart-icon wh-icon active"
      onClick={onClick}
    />
  );
};

export default HeartIcon;
