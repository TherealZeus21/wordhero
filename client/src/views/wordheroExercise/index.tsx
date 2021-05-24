import React, { PureComponent } from "react";
import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
import Welcome from "./welcome";
import {
  getExistingResult,
  getWordHeroExercise,
  sendWordHeroExerciseResult,
} from "../../services/wordheroExerciseService";
import {
  WordHeroExerciseType,
  WordResult,
  StudentResult,
} from "../../models/wordheroExercise";
import Loading from "../../components/loading";
import WordList from "./wordlist";
import { wordMapper } from "./wordlist/helpers";
import { getCurrentDate } from "../../utils/date";

type Props = RouteComponentProps<any>;
interface State {
  exerciseData: WordHeroExerciseType;
  loading: boolean;
  userName: string;
  wordMap: Map<string, number>;
  result: StudentResult;
  groupName: string;
}

export default class WordHeroExercise extends PureComponent<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      exerciseData: {} as WordHeroExerciseType,
      loading: true,
      userName: "",
      wordMap: new Map<string, number>(),
      result: {} as StudentResult,
      groupName: "",
    };
  }

  async componentDidMount(): Promise<void> {
    const { match } = this.props;
    const { id, group } = match.params;

    const heroExercise = await getWordHeroExercise(group, id);

    this.setState({
      exerciseData: heroExercise,
      wordMap: wordMapper(heroExercise.words),
      groupName: group,
      loading: false,
    });
  }

  changeUserName = async (userName): Promise<void> => {
    const { match } = this.props;
    const { id, group } = match.params;

    this.setState({
      loading: true,
    });
    const { exerciseData } = this.state;
    const response = await getExistingResult(group, id, userName);

    this.setState({
      userName,
      wordMap: wordMapper(exerciseData.words, response.result || []),
      result: response,
      loading: false,
    });
  };

  submitResult = async (words: WordResult[]): Promise<void> => {
    const { userName, exerciseData, result, groupName } = this.state;
    const { match } = this.props;
    const { id, group } = match.params;

    const newResult = {
      ...result,
      result: words,
      studentName: userName,
      wordHeroId: exerciseData.wordHeroId,
      groupName,
      updateTime: getCurrentDate(),
    } as StudentResult;
    const response = await sendWordHeroExerciseResult(group, id, newResult);
    toast.success("Result was saved");
    this.setState({
      wordMap: wordMapper(exerciseData.words, response.result),
      result: response,
    });
  };

  render(): JSX.Element {
    const { exerciseData, loading, userName, wordMap } = this.state;
    if (loading) {
      return <Loading />;
    }
    const view =
      userName.length === 0 ? (
        <Welcome heroName={exerciseData.name} onSubmit={this.changeUserName} />
      ) : (
        <WordList
          heroName={exerciseData.name}
          wordMap={wordMap}
          submitResult={this.submitResult}
        />
      );

    const { wordHeroConfig } = exerciseData;
    return (
      <div
        className="wordhero-exercise"
        style={{ ...wordHeroConfig.preferences }}
      >
        {view}
      </div>
    );
  }
}
