/* eslint no-underscore-dangle: ["error", { "allow": ["__REDUX_DEVTOOLS_EXTENSION__"] }] */

import { createStore, applyMiddleware, compose } from "redux";
import { createEpicMiddleware } from "redux-observable";
import rootReducer from "./reducers";
import { rootEpic } from "./epics";

const epicMiddleware = createEpicMiddleware();

// dev tools middleware
// const composeSetup =
//   process.env.NODE_ENV !== "production" &&
//   typeof window === "object" &&
//   (window as any).__REDUX_DEVTOOLS_EXTENSION__
//     ? (window as any).__REDUX_DEVTOOLS_EXTENSION__
//     : compose;

const store = createStore(
  rootReducer,
  compose(applyMiddleware(epicMiddleware))
  // compose(composeSetup(applyMiddleware(epicMiddleware)))
);

epicMiddleware.run(rootEpic);

export default store;
