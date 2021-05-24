import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { DashboardGroupType } from "../../models/dashboard";

const dashboardState = new BehaviorSubject<DashboardStore>({
  groupSelected: DashboardGroupType.All,
});

export function changeSelectedGroup(newType: DashboardGroupType): void {
  dashboardState.next({
    ...dashboardState,
    groupSelected: newType,
  });
}

export function select<R>(item: (value: DashboardStore) => R): Observable<R> {
  return dashboardState.pipe(map(item));
}

export interface DashboardStore {
  groupSelected: DashboardGroupType;
}
