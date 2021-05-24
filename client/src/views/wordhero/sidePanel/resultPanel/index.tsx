import React, { Component } from "react";
import SidePanel from "../../../../components/sidePanel";
import { sidePanelState, toogleResultPanel } from "../sidepaneStory";
import { Subscription } from "rxjs";
import PanelContent from "./panelContent";

interface Props {
  wordHeroId: string;
}
interface State {
  isOpen: boolean;
}

export default class ResultPanel extends Component<Props, State> {
  subs: Subscription[] = [];
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  async componentDidMount(): Promise<void> {
    this.subs.push(
      sidePanelState.subscribe((newState) => {
        this.setState({
          isOpen: newState.resultOpen,
        });
      })
    );
  }

  componentWillUnmount(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }

  closePanel = (): void => {
    toogleResultPanel();
  };

  render(): JSX.Element {
    const { isOpen } = this.state;
    const { wordHeroId } = this.props;

    return (
      <SidePanel isOpen={isOpen}>
        {isOpen && (
          <>
            <button className="middle eclipse close-btn" onClick={this.closePanel}>
              close
            </button>
            <PanelContent wordHeroId={wordHeroId} />
          </>
        )}
      </SidePanel>
    );
  }
}
