import React, { useState, useEffect } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import WordHero from ".";
import Header from "../../components/header";
import LogoImg from "../../components/header/logoImg";
import {
  toogleConfigPanel,
  toogleResultPanel,
  sidePanelState,
  toogleQuestionsPanel,
} from "./sidePanel/sidepaneStory";

const WordheroContainer = (): JSX.Element => {
  const [resultPanelOpen, setResultPanelOpen] = useState(false);
  const [configPanelOpen, setConfigPanelOpen] = useState(false);
  const [questionsPanelOpen, setquestionsPanelOpen] = useState(false);

  useEffect(() => {
    const sub = sidePanelState.subscribe((state) => {
      setConfigPanelOpen(state.configOpen);
      setResultPanelOpen(state.resultOpen);
      setquestionsPanelOpen(state.questionsOpen);
    });
    return (): void => {
      sub.unsubscribe();
    };
  });

  const { path } = useRouteMatch();
  return (
    <div>
      <Header>
        <LogoImg />
        <Header.WordheroNav
          onToggleConfigPanel={toogleConfigPanel}
          onToggleResultPanel={toogleResultPanel}
          onToggleQuestionPanel={toogleQuestionsPanel}
          configPanelOpen={configPanelOpen}
          resultPanelOpen={resultPanelOpen}
          questionsPanelOpen={questionsPanelOpen}
        />
      </Header>
      <Switch>
        <Route path={`${path}/:id`} component={WordHero} />
        <Route path={`${path}`} component={WordHero} />
      </Switch>
    </div>
  );
};

export default WordheroContainer;
