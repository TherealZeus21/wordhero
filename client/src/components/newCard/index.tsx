import React from "react";
import { Link } from "react-router-dom";

const NewCard = () => {
  return (
    <Link to={"/wordhero"} className="card new-card">
      <h3 className="plus-sign">+</h3>
      <h3>New Word Hero</h3>
    </Link>
  );
};

export default NewCard;
