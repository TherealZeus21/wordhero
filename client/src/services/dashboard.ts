import { BASE_URL } from "../config";
import { getDefaultFetchOptions, handleErrors } from "../utils/request";

export async function getDashboard(): Promise<any> {
  const defaultFetchOptions = await getDefaultFetchOptions();
  return await fetch(`${BASE_URL}/dashboard`, {
    ...defaultFetchOptions,
  })
    .then(handleErrors)
    .then((resp) => resp.json());
}
