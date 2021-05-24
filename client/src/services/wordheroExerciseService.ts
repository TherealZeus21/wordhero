import { BASE_URL } from "../config";
import { getDefaultFetchOptions, handleErrors } from "../utils/request";
import {
  WordHeroExerciseType,
  StudentResult,
  ShareSpidegramType,
} from "../models/wordheroExercise";
import {
  UserResultDetailsType,
  WordHeroShareGroup,
} from "../models/wordheroResult";

const WORDHERO_BASE_URL = `${BASE_URL}/WordHeroExercise`;

export async function getWordHeroExercise(
  group: string,
  id: string
): Promise<WordHeroExerciseType> {
  return fetch(`${WORDHERO_BASE_URL}/${id}/${group}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then(handleErrors)
    .then((resp) => resp.json())
    .then((data) => {
      return {
        ...data,
        wordHeroConfig: {
          ...data.wordHeroConfig,
          preferences: JSON.parse(data.wordHeroConfig.preferences),
        },
      };
    });
}

export async function sendWordHeroExerciseResult(
  group: string,
  id: string,
  exerciseResult: StudentResult
): Promise<StudentResult> {
  return fetch(`${WORDHERO_BASE_URL}/${id}/${group}`, {
    method: "POST",
    body: JSON.stringify(exerciseResult),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then(handleErrors)
    .then((resp) => resp.json());
}

export async function getWordHeroSpidegram(
  id: string,
  group: string
): Promise<ShareSpidegramType> {
  return fetch(`${WORDHERO_BASE_URL}/${id}/${group}/spidegram`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then(handleErrors)
    .then((resp) => resp.json())
    .then((data) => {
      return {
        ...data,
        wordHeroConfig: {
          ...data.wordHeroConfig,
          preferences: JSON.parse(data.wordHeroConfig.preferences),
        },
        spidegramData: JSON.parse(data.spidegramData),
      };
    });
}

export async function getHeroShareData(
  wordheroId: string
): Promise<WordHeroShareGroup[]> {
  const defaultFetchOptions = await getDefaultFetchOptions();

  return fetch(`${WORDHERO_BASE_URL}/groups/${wordheroId}`, {
    ...defaultFetchOptions,
  })
    .then(handleErrors)
    .then((resp) => resp.json());
}

export async function getHeroResultDetails(
  wordheroId: string,
  groupId: any
): Promise<UserResultDetailsType[]> {
  const defaultFetchOptions = await getDefaultFetchOptions();

  return fetch(`${WORDHERO_BASE_URL}/results/${wordheroId}/${groupId}`, {
    ...defaultFetchOptions,
  })
    .then(handleErrors)
    .then((resp) => resp.json());
}

export async function getExistingResult(
  groupName: string,
  wordHeroId: string,
  studentId: string
): Promise<StudentResult> {
  return fetch(
    `${WORDHERO_BASE_URL}/${wordHeroId}/${groupName}/${studentId}/result`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  )
    .then(handleErrors)
    .then((resp) => resp.json());
}
