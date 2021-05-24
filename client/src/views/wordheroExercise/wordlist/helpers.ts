import { WordResult } from "../../../models/wordheroExercise";

export function wordMapper(
  words: string[],
  result: WordResult[] = []
): Map<string, number> {
  const wordMap = new Map<string, number>();
  const sortedWords = words.sort();
  sortedWords.forEach((word) =>
    wordMap.set(word, result.find((x) => x.word === word)?.useCount || 0)
  );
  return wordMap;
}
