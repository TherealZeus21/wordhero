/* eslint-disable react/no-array-index-key */
import React, { Component } from "react";
import ListItem from "./listItem";
import { WordResult } from "../../../models/wordheroExercise";

interface Props {
  wordMap: Map<string, number>;
  heroName: string;
  submitResult: (words: WordResult[]) => void;
}
interface State {
  wordMap: Map<string, number>;
}

export default class WordList extends Component<Props, State> {
  constructor(props) {
    super(props);
    const { wordMap } = this.props;
    this.state = { wordMap };
  }

  increaseUse = (word): void => {
    const { wordMap } = this.state;
    const val = wordMap.get(word) || 0;
    wordMap.set(word, val + 1);
    this.setState({
      wordMap,
    });
  };

  decreaseUse = (word): void => {
    const { wordMap } = this.state;
    const val = wordMap.get(word) || 0;
    if (val === 0) {
      return;
    }
    wordMap.set(word, val - 1);
    this.setState({
      wordMap,
    });
  };

  submit = (): void => {
    const { wordMap } = this.state;
    const { submitResult } = this.props;
    const results: WordResult[] = [];
    wordMap.forEach((value, key) => {
      results.push({
        word: key,
        useCount: value,
      });
    });
    submitResult(results);
  };

  render(): JSX.Element {
    const { wordMap } = this.state;
    const { heroName } = this.props;
    const elements: JSX.Element[] = [];
    wordMap.forEach((useCount, word) => {
      elements.push(
        <ListItem
          name={word}
          useCount={useCount}
          key={`${word}-id`}
          increaseUse={this.increaseUse}
          decreaseUse={this.decreaseUse}
        />
      );
    });
    return (
      <>
        <h2>
          <span className="wordcloud-title">{heroName}</span>
        </h2>
        <ul className="word-list">{elements}</ul>
        <button type="button" onClick={this.submit} className="submit-result">
          Send result
        </button>
      </>
    );
  }
}
