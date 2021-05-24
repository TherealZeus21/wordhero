import { ElementDefinition } from "cytoscape";

export interface WordHeroType {
  id?: string;
  title: string;
  words: WordType[];
  createdAt: Date;
  isFavourite: boolean;
  spidegramData: { [key: string]: ElementDefinition[] };
  wordHeroConfig: LessonConfigType;
  questions: string[];
}

export interface WordType {
  id: string;
  value: string;
}

export interface WordHeroList {
  id: string;
  name: string;
  createdAt: Date;
  isFavourite: boolean;
  wordsCount: number;
}

export interface WordsType {}

export interface LessonConfigType {
  id: string;
  preferences: any;
  isPublic: boolean;
}
