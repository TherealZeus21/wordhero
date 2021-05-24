export interface DashboardItem {
  Topic: string;
  NumOfWords: number;
}

export enum DashboardGroupType {
  All,
  Recent,
  Favorites,
}
