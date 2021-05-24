import React, { Component } from "react";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { toast } from "react-toastify";
import {
  wordHeroState,
  toogleWordHeroFavourite,
} from "../../../redux/stories/wordheroStory";
import { WordHeroType } from "../../../models/Wordhero";
import { authState } from "../../../redux/stories/authStory";
import CreateDate from "../../createDate";
import Modal from "../../modal";
import HeartIcon from "../../icons/heartIcon";
import ShareContent from "../../modal/content/share/share";

interface State {
  modalIsOpen: boolean;
  wordHero: WordHeroType;
  showMenuOnMobile?: boolean;
}

interface Props {
  resultPanelOpen: boolean;
  configPanelOpen: boolean;
  questionsPanelOpen: boolean;
  onToggleConfigPanel: () => void;
  onToggleResultPanel: () => void;
  onToggleQuestionPanel: () => void;
}

export default class WordheroNav extends Component<Props, State> {
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(props) {
    super(props);
    this.state = {
      wordHero: {} as WordHeroType,
      modalIsOpen: false,
      showMenuOnMobile: undefined,
    };
  }

  componentDidMount(): void {
    wordHeroState.pipe(takeUntil(this.destroy$)).subscribe((state) => {
      this.setState({
        wordHero: state.wordHero,
      });
    });
  }

  componentWillUnmount(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  closeModal = (): void => {
    this.setState({
      modalIsOpen: false,
    });
  };

  shareLesson = (): void => {
    this.setState({
      modalIsOpen: true,
    });
  };

  toggleLike = (e: React.MouseEvent<HTMLDivElement>): void => {
    e.stopPropagation();
    const { wordHero } = this.state;
    if (wordHero.id === undefined) {
      toast.info("save word hero first");
      return;
    }

    toogleWordHeroFavourite(!wordHero.isFavourite);
  };

  toggleMobileMenu = () => {
    this.setState((state) => {
      return {
        ...state,
        showMenuOnMobile: !state.showMenuOnMobile,
      };
    });
  };

  render(): JSX.Element {
    const { familyName, givenName } = authState.getValue();
    const { modalIsOpen, wordHero, showMenuOnMobile } = this.state;
    const {
      onToggleConfigPanel,
      onToggleResultPanel,
      onToggleQuestionPanel,
      configPanelOpen,
      resultPanelOpen,
      questionsPanelOpen,
    } = this.props;

    return (
      <div className="header-wh-nav">
        <section className="wh-nav-title">
          <span>
            {`${familyName} ${givenName}`}
            {wordHero.id && " | "}
            {wordHero.id && <CreateDate createdAt={wordHero.createdAt} />}
          </span>
          <h2>{wordHero.title}</h2>
        </section>
        <section
          className={`wh-nav-links-container ${showMenuOnMobile === true &&
            "panel-reveal"}
            ${showMenuOnMobile === false && "panel-hide"}
          }`}
        >
          <div onClick={this.toggleMobileMenu} className="hamburger-box">
            <div className="hamburger-inner hamburger-inner-left"></div>
            <div className="hamburger-inner hamburger-inner-middle"></div>
            <div className="hamburger-inner hamburger-inner-right"></div>
          </div>
          <ul className="wh-nav-links">
            <li>
              <div onClick={onToggleResultPanel}>
                <img
                  src={require(`../../../assets/icons/results.svg`)}
                  alt="word hero img"
                />
                <button
                  className={resultPanelOpen ? "selected" : ""}
                  type="button"
                >
                  Results
                </button>
              </div>
            </li>
            <li>
              <div onClick={this.toggleLike}>
                <HeartIcon
                  fill={wordHero.isFavourite}
                  onClick={this.toggleLike}
                  disabled={wordHero.id === undefined}
                />
                <button disabled={wordHero.id === undefined} type="button">
                  Like
                </button>
              </div>
            </li>
            <li>
              <div onClick={this.shareLesson}>
                <img
                  src={require(`../../../assets/icons/share.svg`)}
                  alt="word hero img"
                />
                <button disabled={wordHero.id === undefined} type="button">
                  Share
                </button>
              </div>
            </li>
            <li>
              <div onClick={onToggleConfigPanel}>
                <img
                  src={require(`../../../assets/icons/edit.svg`)}
                  alt="word hero img"
                />
                <button
                  className={configPanelOpen ? "selected" : ""}
                  type="button"
                >
                  Edit
                </button>
              </div>
            </li>
            <li>
              <div onClick={onToggleQuestionPanel}>
                <img
                  src={require(`../../../assets/icons/edit.svg`)}
                  alt="word hero img"
                />
                <button
                  className={questionsPanelOpen ? "selected" : ""}
                  type="button"
                >
                  Questions
                </button>
              </div>
            </li>
          </ul>
        </section>

        <Modal isOpen={modalIsOpen} onClose={this.closeModal}>
          <ShareContent wordHeroId={this.state.wordHero.id} />
        </Modal>
      </div>
    );
  }
}
