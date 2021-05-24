import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { ElementDefinition } from "cytoscape";
import { Subscription } from "rxjs";

import SidePanel from "../../../../components/sidePanel";
import Input from "../../../../components/controls/input";
import WordSelect from "../../../../components/controls/wordSelect";
import { WordHeroType, WordType } from "../../../../models/Wordhero";
import * as WordHeroStory from "../../../../redux/stories/wordheroStory";
import BackgroudOptions from "./backgroudOptions";
import { sidePanelState, toogleConfigPanel } from "../sidepaneStory";
import CustomSelect from "../../../../components/controls/customSelect";
import { fonts } from "./options";

interface Props extends RouteComponentProps {
  wordHero: WordHeroType;
  selectedType: "spidergram" | "wordcloud";
  switchType: (type) => void;
}

interface State {
  isOpen: boolean;
}

class ConfigPanel extends Component<Props, State> {
  subs: Subscription[] = [];

  constructor(props) {
    super(props);
    this.state = { isOpen: false };
  }

  componentDidMount(): void {
    this.subs.push(
      sidePanelState.subscribe((newState) => {
        this.setState({
          isOpen: newState.configOpen,
        });
      })
    );
  }

  componentWillUnmount(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }

  removeWord = (word: string): void => {
    const { wordHero } = this.props;
    const newWords = wordHero.words.filter((x) => x.id !== word);
    const newSpidegram = { ...wordHero.spidegramData };

    newSpidegram.edges =
      newSpidegram.edges &&
      newSpidegram.edges.filter(
        (edge) => edge.data.source !== word && edge.data.target !== word
      );
    newSpidegram.nodes = newSpidegram.nodes.filter(
      (item) => item.data.id !== word
    );

    WordHeroStory.updateWord(newWords, newSpidegram);
  };

  saveChanges = async (): Promise<void> => {
    const { wordHero, history } = this.props;
    const newId = await WordHeroStory.updateWordHero(wordHero);
    if (!wordHero.id) {
      history.replace(`/wordhero/${newId}`);
    }
  };

  changePreferences = (style): void => {
    const { wordHero } = this.props;
    const config = wordHero.wordHeroConfig;

    config.preferences = { ...config.preferences, ...style };
    WordHeroStory.updateWordHeroConfig(config);
  };

  wordsChange = (newWord: WordType): void => {
    const { wordHero } = this.props;
    const words = [...wordHero.words];
    const newSpidegram = { ...wordHero.spidegramData };
    const existWord = words.find((x) => x.id === newWord.id);
    if (existWord) {
      existWord.value = newWord.value;
      const nodes = newSpidegram.nodes;
      nodes.forEach((node) => {
        if (node.data.id === newWord.id) {
          node.data.label = newWord.value;
        }
      });
    } else {
      words.push(newWord);
      const newElement: ElementDefinition = {
        data: {
          id: newWord.id,
          label: newWord.value,
        },
        group: "nodes",
        classes: "item",
      };
      newSpidegram.nodes.push(newElement);
    }
    WordHeroStory.updateWord(words, newSpidegram);
  };

  render() {
    const { wordHero, switchType, selectedType } = this.props;
    const { isOpen } = this.state;

    const mapedWord = wordHero.words;

    return (
      <SidePanel isOpen={isOpen}>
        <SidePanel.Header
          onClose={toogleConfigPanel}
          onSave={this.saveChanges}
          topic="Edit"
        />
        <section className="config-panel">
          <Input
            label="Word hero title"
            type="text"
            value={wordHero.title}
            onChange={(e) => {
              WordHeroStory.updateTitle(e.target.value);
            }}
          />

          <WordSelect
            words={mapedWord}
            onChange={this.wordsChange}
            onRemove={this.removeWord}
          />

          <CustomSelect
            options={fonts}
            onChange={this.changePreferences}
            propName="font"
            propValue={
              wordHero.wordHeroConfig.preferences
                ? wordHero.wordHeroConfig.preferences.font
                : ""
            }
          />

          {/* <CustomSelect
            options={colors}
            onChange={this.changePreferences}
            propName="color"
            propValue={
              wordHero.wordHeroConfig.preferences
                ? wordHero.wordHeroConfig.preferences.color
                : ""
            }
          /> */}

          <BackgroudOptions
            background={
              wordHero.wordHeroConfig.preferences
                ? wordHero.wordHeroConfig.preferences.background
                : ""
            }
            onChange={this.changePreferences}
          />

          <div className="display-type-container">
            <div
              className={`display-type ${
                selectedType === "wordcloud" ? "selected" : ""
              }`}
              onClick={() => switchType("wordcloud")}
            >
              <div className="box">
                <img
                  src={require(`../../../../assets/icons/wordcloud${
                    selectedType === "wordcloud" ? "_selected" : ""
                  }.svg`)}
                  alt="wordcloud"
                />
              </div>
              <div className="text">wordcloud</div>
            </div>

            <div
              className={`display-type ${
                selectedType === "spidergram" ? "selected" : ""
              }`}
              onClick={() => switchType("spidergram")}
            >
              <div className="box">
                <img
                  src={require(`../../../../assets/icons/spidegram${
                    selectedType === "spidergram" ? "_selected" : ""
                  }.svg`)}
                  alt="wordcloud"
                />
              </div>
              <div className="text">spidergram</div>
            </div>
          </div>
        </section>
      </SidePanel>
    );
  }
}

export default withRouter(ConfigPanel);
