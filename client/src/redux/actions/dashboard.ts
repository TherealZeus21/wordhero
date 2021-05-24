import { createAsyncAction } from "typesafe-actions";
import { DashboardItem } from "../../models/dashboard";

export const fetchDashboardAsync = createAsyncAction(
  "FETCH_DASHBOARD",
  "FETCH_DASHBOARD_SUCCESS",
  "FETCH_DASHBOARD_FAILED",
  "FETCH_DASHBOARD_CANCEL"
)<undefined, DashboardItem, Error>();

export default {
  fetchDashboardAsync,
};
