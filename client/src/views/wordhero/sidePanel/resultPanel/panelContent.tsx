import React, { Component } from "react";
import {
  WordHeroShareGroup,
  UserResultDetailsType,
} from "../../../../models/wordheroResult";
import { Subscription } from "rxjs/internal/Subscription";
import Loading from "../../../../components/loading";
import GroupItem from "./groupItem";
import UserDetails from "./groupDetails";
import { showUserResult, sidePanelState } from "../sidepaneStory";
import { map } from "rxjs/operators";
import { WordResult } from "../../../../models/wordheroExercise";
import {
  getHeroResultDetails,
  getHeroShareData,
} from "../../../../services/wordheroExerciseService";

interface Props {
  wordHeroId: string;
}
interface State {
  isLoading: boolean;
  selectedGroup?: WordHeroShareGroup;
  wordHeroResults: WordHeroShareGroup[];
  usersResultDetails: UserResultDetailsType[];
  selectedUserResultId?: string;
}

export default class PanelContent extends Component<Props, State> {
  subs: Subscription[] = [];
  groupsTimerID: any;
  detailsTimerID: any;

  constructor(props) {
    super(props);
    this.state = {
      selectedGroup: undefined,
      isLoading: true,
      wordHeroResults: [] as WordHeroShareGroup[],
      usersResultDetails: [],
    };
  }

  async componentDidMount(): Promise<void> {
    this.setState({
      isLoading: true,
    });

    const results = await getHeroShareData(this.props.wordHeroId);
    this.setState({ wordHeroResults: results });

    this.setState({
      isLoading: false,
    });

    await this.setIntervalFetchResults();
    this.subs.push(
      sidePanelState.pipe(map((x) => x.userResult)).subscribe((userResult) => {
        this.setState({
          selectedUserResultId: userResult?.name,
        });
      })
    );
  }

  async setIntervalFetchResults(): Promise<void> {
    this.groupsTimerID = setInterval(async () => {
      try {
        const results = await getHeroShareData(this.props.wordHeroId);
        this.setState({ wordHeroResults: results });
      } catch (err) {
        clearInterval(this.groupsTimerID);
      }
    }, 10000);
  }

  componentWillUnmount() {
    this.subs.forEach((sub) => sub.unsubscribe());
    clearInterval(this.groupsTimerID);
  }

  unselectGroup = () => {
    this.setState({
      selectedGroup: undefined,
      usersResultDetails: [],
    });

    showUserResult(null);
  };

  selectGroup = async (name: string) => {
    const selectedGroup = this.state.wordHeroResults.find(
      (x) => x.groupName === name
    );

    this.setState({
      isLoading: true,
    });
    const details = await getHeroResultDetails(
      this.props.wordHeroId,
      selectedGroup?.groupName
    );
    this.setState({
      selectedGroup: selectedGroup,
      isLoading: false,
      usersResultDetails: details,
    });
  };

  selectUserResult = (resultId: string): void => {
    const result = this.state.usersResultDetails.find(
      (x) => x.name === resultId
    );
    showUserResult(result);
  };

  selectSummaryResult = (): void => {
    let summary = {
      id: "summary",
      name: "summary",
      words: [] as WordResult[],
    } as UserResultDetailsType;

    this.state.usersResultDetails.forEach((userResult) => {
      userResult.words.forEach((word) => {
        let sum = summary.words.find((w) => w.word === word.word);
        if (!sum) {
          summary.words.push({
            word: word.word,
            useCount: word.useCount,
          } as WordResult);
        } else {
          sum.useCount = sum.useCount + word.useCount;
        }
      });
    });

    showUserResult(summary);
  };

  wordToUseMap(words: WordResult[]): number {
    let used = 0;
    words.forEach((word) => {
      if (word.useCount !== 0) {
        used += 1;
      }
    });

    return used;
  }

  groupUsedWords(): number {
    const { usersResultDetails } = this.state;

    let dictionary = new Map<string, number>();
    usersResultDetails.forEach((results) => {
      results.words.forEach((word) => {
        if (!word.useCount) {
          return;
        }
        if (!dictionary.has(word.word)) {
          dictionary.set(word.word, 1);
        } else {
          dictionary.set(word.word, word.useCount + 1);
        }
      });
    });
    return dictionary.size;
  }

  render() {
    const {
      wordHeroResults,
      isLoading,
      usersResultDetails: groupDetails,
      selectedGroup,
      selectedUserResultId,
    } = this.state;

    if (isLoading) {
      return <Loading />;
    }

    if (!!selectedGroup) {
      const groupItems = groupDetails.map((item) => (
        <UserDetails
          key={`user-${item.name}-result`}
          name={item.name}
          used={this.wordToUseMap(item.words)}
          onSelect={this.selectUserResult}
          selected={item.name === selectedUserResultId}
        />
      ));

      groupItems.unshift(
        <UserDetails
          key={`user-summary-result`}
          name="Summary"
          used={this.groupUsedWords()}
          onSelect={this.selectSummaryResult}
          selected={"summary" === selectedUserResultId}
        />
      );

      return (
        <section className="result-panel">
          <h2>
            <i className="back-icon" onClick={this.unselectGroup}>
              &lt;
            </i>
            {selectedGroup.groupName}
          </h2>

          <section>
            <ul>{groupItems}</ul>
          </section>
        </section>
      );
    }

    const groupItems = wordHeroResults.map((item) => (
      <GroupItem
        key={`group-result-${item.groupName}`}
        name={item.groupName}
        update={item.update}
        onClick={this.selectGroup}
      />
    ));
    return (
      <section className="result-panel">
        <h2>Results</h2>

        <section>
          <ul>{groupItems}</ul>
        </section>
      </section>
    );
  }
}
