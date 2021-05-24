/* eslint-disable react/destructuring-assignment */
import React, { Component } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Subject } from "rxjs";
import { takeUntil, map } from "rxjs/operators";

import Loading from "../../components/loading";
import {
  loadWordHero,
  wordHeroState,
  createNewWordHero,
  updateSpidegram,
} from "../../redux/stories/wordheroStory";
import { WordHeroType } from "../../models/Wordhero";
import Spidergram from "../../components/spidergram";
import ConfigPanel from "./sidePanel/configPanel";
import CloudWords from "../../components/cloudWords";
import ResultPanel from "./sidePanel/resultPanel";
import {
  closeAllPanels,
  sidePanelState,
  toogleConfigPanel,
} from "./sidePanel/sidepaneStory";
import { UserResultDetailsType } from "../../models/wordheroResult";
import UserResultList from "./userResultList";
import { QuestionsPanel } from "../../components/sidePanel/questionsPanel";
import { TypeSwitcher } from "../../components/typeSwitcher/typeSwitcher";

type Props = RouteComponentProps<any>;
interface State {
  wordHero: WordHeroType;
  isLoading: boolean;
  type: "spidergram" | "wordcloud";
  userResult?: UserResultDetailsType;
  isEditPanelOpen: boolean;
}

export default class WordHero extends Component<Props, State> {
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(props) {
    super(props);

    this.state = {
      wordHero: {} as WordHeroType,
      isLoading: true,
      type: "wordcloud",
      userResult: undefined,
      isEditPanelOpen: false,
    } as State;
  }

  async componentDidMount(): Promise<void> {
    const wordheroId = this.props.match.params.id;
    wordHeroState.pipe(takeUntil(this.destroy$)).subscribe((state) => {
      this.setState({
        wordHero: state.wordHero,
        isLoading: state.isLoading,
      });
    });

    if (wordheroId) {
      loadWordHero(wordheroId);
    } else {
      createNewWordHero();
      toogleConfigPanel();
    }

    sidePanelState
      .pipe(
        takeUntil(this.destroy$),
        map((x) => x.userResult)
      )
      .subscribe((x) => {
        this.setState({
          userResult: x,
        });
      });

    sidePanelState
      .pipe(
        takeUntil(this.destroy$),
        map((x) => x.configOpen)
      )
      .subscribe((x) => {
        this.setState({
          isEditPanelOpen: x,
        });
      });
  }

  componentWillUnmount(): void {
    closeAllPanels();
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  switch = (type): void => {
    this.setState({
      type,
    });
  };

  updateSpidergram = (data): void => {
    for (const key in data.elements) {
      data.elements[key] = data.elements[key].filter(
        (x) => x.classes !== "eh-handle"
      );
    }
    updateSpidegram(data);

    // this.setState((state: any) => {
    //   return {
    //     ...state,
    //     wordHero: {
    //       ...state.wordHero,
    //       spidegramData: data,
    //     },
    //   };
    // });
  };

  getElementsData = (): {} => {
    if (!this.state.wordHero) {
      return {};
    }
    return this.state.wordHero.spidegramData;
  };

  removeWord = (word): void => {
    if (!this.state.wordHero) {
      return;
    }

    const newWords = this.state.wordHero?.words.filter((x) => x !== word);
    const newSpidegram = { ...this.state.wordHero.spidegramData };

    newSpidegram.edges = newSpidegram.edges.filter(
      (edge) => edge.data.source !== word && edge.data.target !== word
    );
    newSpidegram.nodes = newSpidegram.nodes.filter(
      (item) => item.data.id !== word
    );

    this.setState((state: any) => ({
      ...state,
      wordHero: {
        ...state.wordHero,
        words: newWords,
        spidegramData: newSpidegram,
      },
    }));
  };

  render(): JSX.Element {
    if (this.state.isLoading || this.state.wordHero == null) {
      return <Loading />;
    }

    const elements = this.getElementsData();
    return (
      <section className="word-hero-page full-height">
        {this.state.userResult && (
          <UserResultList
            name={this.state.userResult.name}
            words={this.state.userResult.words}
          />
        )}
        {!this.state.userResult && this.state.type === "wordcloud" && (
          <CloudWords
            title={this.state.wordHero.title}
            words={this.state.wordHero.words}
            config={this.state.wordHero.wordHeroConfig}
          />
        )}
        {!this.state.userResult && this.state.type !== "wordcloud" && (
          <Spidergram
            elements={elements}
            onUpdate={this.updateSpidergram}
            config={this.state.wordHero.wordHeroConfig}
            isEdit={this.state.isEditPanelOpen}
            disabled={false}
          />
        )}

        <ConfigPanel
          wordHero={this.state.wordHero}
          switchType={this.switch}
          selectedType={this.state.type}
        />

        <ResultPanel wordHeroId={this.state.wordHero?.id || ""} />

        <QuestionsPanel
          isEdit={true}
          sourceQuestions={this.state.wordHero.questions}
        />

        <TypeSwitcher onSwitch={this.switch} selected={this.state.type} />
      </section>
    );
  }
}
