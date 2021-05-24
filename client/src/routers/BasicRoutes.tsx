import React, { ReactElement } from "react";
import { Route } from "react-router-dom";

import Header from "../components/header";
import LogoImg from "../components/header/logoImg";
import Home from "../views/home";
import NotFound from "../views/notFound";

export default function BasicRoute(): ReactElement {
  return (
    <>
      <Header>
        <LogoImg />
        <Header.HeaderNav />
        <Header.OptionsNav />
      </Header>
      <Route path="/" exact component={Home} />
      <Route path="**" exact component={NotFound} />
    </>
  );
}
