import React, { Component, ReactElement, ReactNode } from "react";
import OptionsNav from "./nav/OptionsNav";
import HeaderNav from "./nav/HeaderNav";
import WordHeroNav from "./nav/WordheroNav";

interface Props {
  children: ReactNode;
}
interface State {}

export default class Header extends Component<Props, State> {
  static OptionsNav = OptionsNav;

  static HeaderNav = HeaderNav;

  static WordheroNav = WordHeroNav;

  render(): ReactElement {
    const { children } = this.props;

    return <header>{children}</header>;
  }
}
