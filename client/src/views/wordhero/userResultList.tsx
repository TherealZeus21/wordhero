import React from "react";
import { WordResult } from "../../models/wordheroExercise";

interface Props {
  words: WordResult[];
  name: string;
}

const UserResultList = ({ words, name }: Props): JSX.Element => {
  const arr = words.sort((a, b) => (a.useCount < b.useCount ? 1 : -1));

  const list = arr.map((el) => (
    <tr key={`word-count-${el.word}`}>
      <td>{el.word}</td>
      <td>{el.useCount}</td>
    </tr>
  ));

  return (
    <section className="user-result">
      <h4>{name}</h4>
      <table>
        <tbody>{list}</tbody>
      </table>
    </section>
  );
};

export default UserResultList;
