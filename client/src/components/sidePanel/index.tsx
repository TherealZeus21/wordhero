import React, { Component } from "react";
import { Header } from "./header";

interface Props {
  isOpen: boolean;
}
interface State {}

export default class SidePanel extends Component<Props, State> {
  state = {};

  static Header = Header;

  render() {
    return (
      <div
        className={
          "side-panel full-height " + (this.props.isOpen ? "reveal" : "hide")
        }
      >
        <div className="content">{this.props.children}</div>
      </div>
    );
  }
}
