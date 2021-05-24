import { Observable } from "rxjs";
import { filter, mapTo } from "rxjs/operators";

export const pingEpic = (action$: Observable<any>): Observable<any> =>
  action$.pipe(
    filter(action => action.type === "PING"),
    mapTo({ type: "PONG" })
  );

export default {
  pingEpic
};
