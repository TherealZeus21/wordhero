import { WordResult } from "./wordheroExercise";

export interface WordHeroShareGroup {
  id: number;
  groupName: string;
  type: string;
  wordHeroId?: string;
  update: Date;
}

export interface UserResultDetailsType {
  id: string;
  name: string;
  words: WordResult[];
}
