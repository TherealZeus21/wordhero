import { BehaviorSubject } from "rxjs";
import * as WordHeroService from "../../services/wordheroService";
import { WordHeroType, LessonConfigType } from "../../models/Wordhero";
import { getCurrentDate } from "../../utils/date";

const wordHeroState = new BehaviorSubject<WordHeroState>({
  wordHero: {} as WordHeroType,
  isLoading: false,
});

export { wordHeroState };

export function updateTitle(title) {
  const state = wordHeroState.getValue();
  wordHeroState.next({
    ...state,
    wordHero: {
      ...state.wordHero,
      title,
    },
  });
}

export async function toogleWordHeroFavourite(
  isFavourite: boolean
): Promise<void> {
  const state = wordHeroState.getValue();
  wordHeroState.next({
    ...state,
    wordHero: {
      ...state.wordHero,
      isFavourite,
    },
  });

  await WordHeroService.changeFavourite(
    state.wordHero.id as string,
    isFavourite
  );
}

export function updateWord(newWords, newSpidegram) {
  const state = wordHeroState.getValue();

  wordHeroState.next({
    ...state,
    wordHero: {
      ...state.wordHero,
      words: newWords,
      spidegramData: newSpidegram,
    },
  });
}

export function updateSpidegram(newSpidegram) {
  const state = wordHeroState.getValue();

  wordHeroState.next({
    ...state,
    wordHero: {
      ...state.wordHero,
      spidegramData: newSpidegram,
    },
  });
}

export function updateQuestions(newQuestions) {
  const state = wordHeroState.getValue();
  wordHeroState.next({
    ...state,
    wordHero: {
      ...state.wordHero,
      questions: newQuestions,
    },
  });
}

export async function createNewWordHero() {
  wordHeroState.next({
    ...wordHeroState.value,
    isLoading: false,
    wordHero: {
      id: undefined,
      wordHeroConfig: {} as LessonConfigType,
      spidegramData: { nodes: [], edges: [] },
      title: "",
      createdAt: getCurrentDate(),
      isFavourite: false,
      words: [],
      questions: [],
    },
  });
}

export async function loadWordHero(id: string): Promise<void> {
  wordHeroState.next({
    ...wordHeroState.value,
    isLoading: true,
  });

  try {
    const wordHero = await WordHeroService.getWordHero(id);
    wordHeroState.next({
      ...wordHeroState.value,
      wordHero,
      isLoading: false,
    });
  } catch (err) {
    wordHeroState.next({
      ...wordHeroState.value,
      isLoading: false,
    });
  }
}

export async function updateWordHero(newWordHero) {
  wordHeroState.next({
    ...wordHeroState.value,
    isLoading: true,
  });

  try {
    const wordHero = await WordHeroService.updateWordHero(newWordHero);
    wordHeroState.next({
      ...wordHeroState.value,
      wordHero,
      isLoading: false,
    });
    return wordHero.id;
  } catch (err) {
    console.error(err);

    wordHeroState.next({
      ...wordHeroState.value,
      isLoading: false,
    });
  }
}

export function updateWordHeroConfig(config: LessonConfigType) {
  wordHeroState.next({
    ...wordHeroState.value,
    wordHero: {
      ...wordHeroState.value.wordHero,
      wordHeroConfig: config,
    },
  });
}

export interface WordHeroState {
  wordHero: WordHeroType;
  isLoading: boolean;
}
