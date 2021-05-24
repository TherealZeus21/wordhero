import { ElementDefinition } from "cytoscape";
import React from "react";
import ShareSpidegram from ".";
import { QuestionIcon } from "../../components/icons/questionIcon";
import Loading from "../../components/loading";
import { QuestionsPanel } from "../../components/sidePanel/questionsPanel";
import Spidergram from "../../components/spidergram";
import { LessonConfigType } from "../../models/Wordhero";
import { ShareSpidegramType } from "../../models/wordheroExercise";
import { toogleQuestionsPanel } from "../wordhero/sidePanel/sidepaneStory";

export default class EmptySpidegram extends ShareSpidegram {
  state = {
    groupName: "",
    loading: true,
    spidegramData: {},
    wordHeroConfig: {} as LessonConfigType,
    questions: [],
  };

  updateState(data: ShareSpidegramType) {
    const spidegram: { [key: string]: ElementDefinition[] } =
      data.spidegramData;
    spidegram.edges = [];
    spidegram.nodes.forEach((node) => {
      node.position = undefined;
    });

    this.setState({
      spidegramData: data.spidegramData,
      wordHeroConfig: data.wordHeroConfig,
      groupName: data.name,
      loading: false,
      questions: data.questions,
    });
  }

  render() {
    const { loading, spidegramData, wordHeroConfig, questions } = this.state;
    if (loading) {
      return <Loading />;
    }

    return (
      <div className="share" style={{ ...wordHeroConfig.preferences }}>
        <Spidergram
          elements={spidegramData}
          onUpdate={() => {}}
          config={wordHeroConfig}
          isEdit={true}
          disabled={false}
        />
        <QuestionsPanel sourceQuestions={questions} />
        <QuestionIcon onClick={toogleQuestionsPanel} />
      </div>
    );
  }
}
