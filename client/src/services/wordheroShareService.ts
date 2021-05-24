import { BASE_URL } from "../config";
import { getDefaultFetchOptions, handleErrors } from "../utils/request";
import { WordHeroShareGroup } from "../models/wordheroResult";
import { toast } from "react-toastify";

const WORDHERO_BASE_URL = `${BASE_URL}/wordheroshare`;

export async function addShareGroup(group: WordHeroShareGroup) {
  const defaultFetchOptions = await getDefaultFetchOptions();

  return fetch(`${WORDHERO_BASE_URL}`, {
    ...defaultFetchOptions,
    method: "POST",
    body: JSON.stringify(group),
  })
    .then(handleErrors)
    .then((resp) => {
      toast.success(`Group has been created`);
    });
}

export async function getHeroGroups(
  heroId: string
): Promise<WordHeroShareGroup[]> {
  const defaultFetchOptions = await getDefaultFetchOptions();

  return fetch(`${WORDHERO_BASE_URL}/${heroId}`, {
    ...defaultFetchOptions,
  })
    .then(handleErrors)
    .then((resp) => resp.json());
}
