import { DashboardItem } from "../../models/dashboard";

const initialState = {
  isLoading: false,
  isSidePanelOpen: false,
  dashboardData: {} as DashboardItem,
};

export default (state = initialState, action: any): typeof initialState => {
  switch (action.type) {
    default:
      return state;
  }
};
