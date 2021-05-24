import React, { ReactElement } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import BasicRoutes from "./BasicRoutes";
import AuthRoute from "./AuthRoute";
import WordheroContainer from "../views/wordhero/wordheroContainer";
import ProtectedRoutes from "./ProtectedRoutes";
import WordHeroExercise from "../views/wordheroExercise";
import ShareSpidegram from "../views/shareSpidegram";
import EmptySpidegram from "../views/shareSpidegram/EmptySpidegram";

const AppRouter = (): ReactElement => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/hero/:id/:group" component={WordHeroExercise} />
        <Route path="/spidegram-done/:id/:group" component={ShareSpidegram} />
        <Route path="/spidegram/:id/:group" component={EmptySpidegram} />
        <ProtectedRoutes path="/wordhero" component={WordheroContainer} />

        <AuthRoute />
        <BasicRoutes />
      </Switch>
    </BrowserRouter>
  );
};

export default AppRouter;
