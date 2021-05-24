import React, { useState, useEffect } from "react";
import * as dashboardStory from "../../../redux/stories/dashboardStory";
import { DashboardGroupType } from "../../../models/dashboard";

const LeftPanel = () => {
  const [selectedGroup, setSelectedGroup] = useState<DashboardGroupType>();

  useEffect(() => {
    const subscription = dashboardStory
      .select((x) => x.groupSelected)
      .subscribe((group) => {
        setSelectedGroup(group);
      });
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <ul className="left-panel">
      <li>
        <button
          className={selectedGroup === DashboardGroupType.All ? "selected" : ""}
          onClick={() =>
            dashboardStory.changeSelectedGroup(DashboardGroupType.All)
          }
          type="button"
        >
          All
        </button>
      </li>
      <li>
        <button
          className={
            selectedGroup === DashboardGroupType.Recent ? "selected" : ""
          }
          onClick={() =>
            dashboardStory.changeSelectedGroup(DashboardGroupType.Recent)
          }
          type="button"
        >
          Recent
        </button>
      </li>
      <li>
        <button
          className={
            selectedGroup === DashboardGroupType.Favorites ? "selected" : ""
          }
          onClick={() =>
            dashboardStory.changeSelectedGroup(DashboardGroupType.Favorites)
          }
          type="button"
        >
          Favorites
        </button>
      </li>
    </ul>
  );
};

export default LeftPanel;
