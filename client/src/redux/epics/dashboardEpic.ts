import { Observable, from, of } from "rxjs";
import { filter, switchMap, map, catchError, takeUntil } from "rxjs/operators";
import { isActionOf } from "typesafe-actions";
import { fetchDashboardAsync } from "../actions/dashboard";
import { getDashboard } from "../../services/dashboard";

export const fetchDashboardItem = (action$: Observable<any>): Observable<any> =>
  action$.pipe(
    filter(isActionOf(fetchDashboardAsync.request)),
    switchMap(() =>
      from(getDashboard()).pipe(
        map(fetchDashboardAsync.success),
        catchError(message => of(fetchDashboardAsync.failure(message))),
        takeUntil(action$.pipe(filter(isActionOf(fetchDashboardAsync.cancel))))
      )
    )
  );

export default {
  fetchDashboardAsync
};
