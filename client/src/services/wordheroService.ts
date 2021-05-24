import { toast } from "react-toastify";
import { getDefaultFetchOptions, handleErrors } from "../utils/request";
import { BASE_URL } from "../config";
import { WordHeroType } from "../models/Wordhero";
const WORDHERO_BASE_URL = `${BASE_URL}/WordHero`;

export async function removeWordHero(id: string, heroName: string) {
  const defaultFetchOptions = await getDefaultFetchOptions();

  return fetch(`${WORDHERO_BASE_URL}/${id}`, {
    ...defaultFetchOptions,
    method: "DELETE",
  }).then((resp) => {
    toast.success(`Word hero ${heroName} has been removed`);
    return resp;
  });
}
export async function cloneWordHero(id: string) {
  const hero = await getWordHero(id);
  hero.id = undefined;
  hero.title += " clone";
  return await updateWordHero(hero);
}

export async function getWordHero(id: string): Promise<WordHeroType> {
  const defaultFetchOptions = await getDefaultFetchOptions();

  return fetch(`${WORDHERO_BASE_URL}/${id}`, {
    ...defaultFetchOptions,
  })
    .then(handleErrors)
    .then((resp) => resp.json())
    .then((resp) => {
      return {
        ...resp,
        wordHeroConfig: {
          ...resp.wordHeroConfig,
          preferences: JSON.parse(resp.wordHeroConfig.preferences),
        },
        spidegramData: JSON.parse(resp.spidegramData),
      };
    });
}

export async function changeFavourite(
  wordHeroId: string,
  isFavourite: boolean
) {
  const defaultFetchOptions = await getDefaultFetchOptions();

  return fetch(`${WORDHERO_BASE_URL}/favourite/${wordHeroId}/${isFavourite}`, {
    ...defaultFetchOptions,
    method: "PUT",
  }).then(handleErrors);
}

export async function updateWordHero(wordHero: WordHeroType) {
  const defaultFetchOptions = await getDefaultFetchOptions();

  const data = JSON.stringify({
    ...wordHero,
    wordHeroConfig: {
      ...wordHero.wordHeroConfig,
      preferences: JSON.stringify(wordHero.wordHeroConfig.preferences),
    },
    spidegramData: JSON.stringify(wordHero.spidegramData),
  });

  if (wordHero.id) {
    return fetch(`${WORDHERO_BASE_URL}/${wordHero.id}`, {
      ...defaultFetchOptions,
      method: "PUT",
      body: data,
    })
      .then(handleErrors)
      .then((resp) => resp.json())
      .then((resp) => {
        toast.success(`Word hero ${resp.title} has been updated`);
        return {
          ...resp,
          wordHeroConfig: {
            ...resp.wordHeroConfig,
            preferences: JSON.parse(resp.wordHeroConfig.preferences),
          },
          spidegramData: JSON.parse(resp.spidegramData),
        };
      });
  } else {
    return fetch(`${WORDHERO_BASE_URL}`, {
      ...defaultFetchOptions,
      method: "POST",
      body: data,
    })
      .then(handleErrors)
      .then((resp) => resp.json())
      .then((resp) => {
        toast.success(`Word hero ${resp.title} has been created`);
        return {
          ...resp,
          wordHeroConfig: {
            ...resp.wordHeroConfig,
            preferences: JSON.parse(resp.wordHeroConfig.preferences),
          },
          spidegramData: JSON.parse(resp.spidegramData),
        };
      });
  }
}
