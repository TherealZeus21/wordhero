import { LessonConfigType } from "./Wordhero";
import { ElementDefinition } from "cytoscape";

export interface WordHeroExerciseType {
  wordHeroId: string;
  name: string;
  wordHeroConfig: LessonConfigType;
  words: string[];
}

export interface StudentResult {
  id?: string;
  studentName: string;
  groupName: string;
  result: WordResult[];
  wordHeroId: string;
  updateTime: Date;
}

export interface WordResult {
  word: string;
  useCount: number;
}

export interface ShareSpidegramType {
  id: string;
  name: string;
  wordHeroConfig: LessonConfigType;
  spidegramData: { [key: string]: ElementDefinition[] };
  questions: string[];
}
