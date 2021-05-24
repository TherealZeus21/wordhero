import { WordHeroList } from "../../../models/Wordhero";
import { DashboardGroupType } from "../../../models/dashboard";

export function filterLesson(
  lessons: WordHeroList[],
  group: DashboardGroupType
): WordHeroList[] {
  if (group === DashboardGroupType.Favorites) {
    return lessons.filter((x) => x.isFavourite);
  }

  if (group === DashboardGroupType.Recent) {
    return lessons.filter((x) => isInLastWeek(x.createdAt));
  }

  return lessons;
}

function isInLastWeek(date: Date): boolean {
  const heroDate = new Date(date);
  const lastWeek = new Date();
  lastWeek.setHours(lastWeek.getDay() - 7);
  return heroDate > lastWeek;
}
