import React, { useState, useEffect } from "react";
import SidePanel from "..";
import {
  sidePanelState,
  toogleQuestionsPanel,
} from "../../../views/wordhero/sidePanel/sidepaneStory";
import {
  updateQuestions,
  wordHeroState,
  updateWordHero,
} from "../../../redux/stories/wordheroStory";
import Textarea from "../../controls/textarea";

interface Props {
  isEdit?: boolean;
  sourceQuestions: string[];
}

export const QuestionsPanel = ({ isEdit = false, sourceQuestions }: Props) => {
  const [isOpen, setIsOpen] = useState(sidePanelState.value.questionsOpen);
  const [questions, setQuestions] = useState<string[]>(sourceQuestions);

  useEffect(() => {
    const sub = sidePanelState.subscribe((state) =>
      setIsOpen(state.questionsOpen)
    );
    return () => {
      sub.unsubscribe();
    };
  }, []);

  const save = async () => {
    updateQuestions(questions);
    await updateWordHero(wordHeroState.value.wordHero);
  };

  const removeItem = (index) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);
  };

  const updateQuestion = (val, index) => {
    if (index === questions.length) {
      setQuestions([...questions, val]);
    } else {
      let newQuestions = [...questions];
      newQuestions[index] = val;
      setQuestions(newQuestions);
    }
  };

  const inputs = questions.map((x, i) => {
    if (isEdit) {
      return (
        <Textarea
          label={"Question: #" + (i + 1)}
          key={"question-" + i}
          type="text"
          value={x}
          onChange={(e) => updateQuestion(e.target.value, i)}
          disabled={!isEdit}
          onRemove={() => removeItem(i)}
        />
      );
    } else {
      return (
        <div className="custom-input">
          <label>{"Question: #" + (i + 1)}</label>
          <div className="question-content">{x}</div>
        </div>
      );
    }
  });

  if (isEdit) {
    inputs.push(
      <Textarea
        label="Add new question"
        key={"question-" + questions.length}
        type="text"
        value=""
        onChange={(e) => updateQuestion(e.target.value, questions.length)}
      />
    );
  }

  return (
    <SidePanel isOpen={isOpen}>
      <SidePanel.Header
        onClose={toogleQuestionsPanel}
        onSave={isEdit ? save : undefined}
        topic="Questions"
      />

      <section className="questions">{inputs}</section>
    </SidePanel>
  );
};
