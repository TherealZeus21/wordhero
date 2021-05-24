import { combineEpics } from "redux-observable";
import { fetchDashboardItem } from "./dashboardEpic";
import { pingEpic } from "./pongEpic";

export const rootEpic = combineEpics(fetchDashboardItem, pingEpic);

export default {
  rootEpic
};
