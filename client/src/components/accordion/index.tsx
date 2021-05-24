import React, { Component } from "react";
import AccordionHeader from "./header";
import AccordionItem from "./item";

interface Props {
  children: JSX.Element[];
}
interface State {
  isExpand: boolean;
}

export default class Accordion extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      isExpand: false,
    };
  }

  static Header = AccordionHeader;
  static Item = AccordionItem;

  onClick = () => {
    this.setState((state) => {
      return {
        isExpand: !state.isExpand,
      };
    });
  };

  render() {
    const { children } = this.props;
    const header = children.find((child) => child.type === Accordion.Header);
    const items = children.filter((child) => child.type === Accordion.Item);
    return (
      <article className="accordion">
        <section className="header" onClick={this.onClick}>
          {header}
        </section>
        <section
          className={`content ${this.state.isExpand ? "reveal" : "hidden"}`}
        >
          <ul>{items}</ul>
        </section>
      </article>
    );
  }
}
