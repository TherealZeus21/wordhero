import React from "react";

interface Props {
  name: string;
  used: number;
  selected: boolean;
  onSelect: (resultId) => void;
}

const UserDetails = ({ name, used, onSelect, selected }: Props) => {
  return (
    <li
      className={`list-item ${selected ? "selected" : ""}`}
      onClick={() => {
        onSelect(name);
      }}
    >
      <div>{name}</div>
      <div>{used} words used</div>
    </li>
  );
};

export default UserDetails;
