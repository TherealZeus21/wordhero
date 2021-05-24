import { toast } from "react-toastify";
import { getTokenPopup } from "../services/authProvider";

const defaultFetchOptions: any = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

export function handleErrors(response: Response) {
  if (!response.ok) {
    console.error(response);
    if (response.status === 401) {
      toast.error("You are not authorized to access this page");
    } else {
      toast.error("An error has occurred please try again later");
    }
  }

  if (response.ok && response.status >= 500) {
    toast.error(
      "Network error: There is a problem connecting to server. Please try again later"
    );
  }

  return response;
}

export async function getDefaultFetchOptions() {
  const token = await getTokenPopup();
  defaultFetchOptions.headers.Authorization = `Bearer ${token}`;

  return defaultFetchOptions;
}
