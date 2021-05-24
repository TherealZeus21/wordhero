import React, { PureComponent } from "react";
import Card from "../../components/card";
import NewCard from "../../components/newCard";
import LeftPanel from "./left-panel";
import { getDashboard } from "../../services/dashboard";
import {
  removeWordHero,
  cloneWordHero,
  changeFavourite,
} from "../../services/wordheroService";
import { WordHeroList } from "../../models/Wordhero";
import Loading from "../../components/loading";
import * as dashboardStory from "../../redux/stories/dashboardStory";
import { DashboardGroupType } from "../../models/dashboard";
import { takeUntil } from "rxjs/operators";
import { Observable } from "rxjs";
import { filterLesson } from "./helpers/filters";

interface State {
  lessons: WordHeroList[];
  filteredLessons: WordHeroList[];
  isLoading: boolean;
  selectedGroup: DashboardGroupType;
}

export default class Dashboard extends PureComponent<any, State> {
  destroyed$ = new Observable<boolean>();

  constructor(props) {
    super(props);
    this.state = {
      lessons: [],
      filteredLessons: [],
      isLoading: true,
      selectedGroup: DashboardGroupType.All,
    };
  }

  async componentDidMount(): Promise<void> {
    await this.loadDashboard();
    dashboardStory
      .select((x) => x.groupSelected)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((group) => {
        const filteredLessons = filterLesson(this.state.lessons, group);
        this.setState({ selectedGroup: group, filteredLessons });
      });
  }

  onRemove = async (heroId, heroName): Promise<void> => {
    await removeWordHero(heroId, heroName);
    await this.loadDashboard();
  };

  onClone = async (heroId): Promise<void> => {
    await cloneWordHero(heroId);
    await this.loadDashboard();
  };

  onFavourite = async (heroId, isFavourite): Promise<void> => {
    await changeFavourite(heroId, isFavourite);
    await this.loadDashboard();
  };

  filtrLessons = (filter) => {
    const { lessons } = this.state;

    this.setState({
      filteredLessons: lessons.filter(filter),
    });
  };

  async loadDashboard(): Promise<void> {
    const lessons = await getDashboard();
    this.setState({
      lessons,
      filteredLessons: lessons,
      isLoading: false,
    });
  }

  render(): JSX.Element {
    const { isLoading, filteredLessons, selectedGroup, lessons } = this.state;

    if (isLoading) {
      return <Loading />;
    }

    const cards = filteredLessons.map((lesson: WordHeroList) => (
      <Card
        key={`lesson-${lesson.id}`}
        id={lesson.id}
        name={lesson.name}
        createdAt={lesson.createdAt}
        wordCount={lesson.wordsCount}
        isFavourite={lesson.isFavourite}
        onRemove={this.onRemove}
        onClone={this.onClone}
        onFavourite={this.onFavourite}
      />
    ));

    return (
      <article className="dashboard">
        <LeftPanel />
        <section>
          <h1>
            {`${DashboardGroupType[selectedGroup]}`}{" "}
            {selectedGroup !== DashboardGroupType.All && (
              <span>
                <span title="filtered cards">{filteredLessons.length}</span>
                <span>/</span>
                <span title="all cards">{lessons.length}</span>
              </span>
            )}
          </h1>
          <div className="card-container">
            <NewCard />
            {cards}
          </div>
        </section>
      </article>
    );
  }
}
