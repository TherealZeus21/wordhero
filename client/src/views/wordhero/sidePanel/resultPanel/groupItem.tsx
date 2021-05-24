import React from "react";
import CreateDate from "../../../../components/createDate";

interface Props {
  name: string;
  update: Date;
  onClick: (name: string) => void;
}

const GroupItem = ({ name, update, onClick }: Props) => {
  return (
    <li
      className="list-item"
      onClick={() => {
        onClick(name);
      }}
    >
      <h4>{name}</h4>
      Last update: <CreateDate createdAt={update} />
      <i>&gt;</i>
    </li>
  );
};

export default GroupItem;
