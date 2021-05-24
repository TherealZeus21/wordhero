import React, { Component } from "react";
import { RouteComponentProps } from "react-router-dom";
import { ElementDefinition } from "cytoscape";
import { getWordHeroSpidegram } from "../../services/wordheroExerciseService";
import { LessonConfigType } from "../../models/Wordhero";
import Loading from "../../components/loading";
import Spidergram from "../../components/spidergram";
import { QuestionIcon } from "../../components/icons/questionIcon";
import { QuestionsPanel } from "../../components/sidePanel/questionsPanel";
import { toogleQuestionsPanel } from "../wordhero/sidePanel/sidepaneStory";
import { ShareSpidegramType } from "../../models/wordheroExercise";

type Props = RouteComponentProps<any>;
interface State {
  spidegramData: { [key: string]: ElementDefinition[] };
  wordHeroConfig: LessonConfigType;
  loading: boolean;
  groupName: string;
  questions: string[];
}

export default class ShareSpidegram extends Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      groupName: "",
      loading: true,
      spidegramData: {},
      wordHeroConfig: {} as LessonConfigType,
      questions: [],
    };
  }

  async componentDidMount(): Promise<void> {
    const { match } = this.props;
    const { id, group } = match.params;

    const data = await getWordHeroSpidegram(id, group);

    this.updateState(data);
  }

  updateState(data: ShareSpidegramType) {
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
          isEdit={false}
          disabled={true}
        />
        <QuestionsPanel sourceQuestions={questions} />
        <QuestionIcon onClick={toogleQuestionsPanel} />
      </div>
    );
  }
}
