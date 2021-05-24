import React from "react";
import { Switch } from "react-router-dom";
import Header from "../components/header";
import LogoImg from "../components/header/logoImg";
import Dashboard from "../views/dashboard";
import ProtectedRoutes from "./ProtectedRoutes";
import NotFound from "../views/notFound";

const AuthRoute = (): JSX.Element => {
  return (
    <>
      <Header>
        <LogoImg />
        <Header.HeaderNav />
        <Header.OptionsNav />
      </Header>
      <Switch>
        <ProtectedRoutes path="/dashboard" component={Dashboard} />
        <ProtectedRoutes path="/" exact component={Dashboard} />
        <ProtectedRoutes path="**" exact component={NotFound} />
      </Switch>
    </>
  );
};

export default AuthRoute;
