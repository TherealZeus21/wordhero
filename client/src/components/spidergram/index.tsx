import React, { Component } from "react";
import Graph from "../graph";
import Input from "../controls/input";
import { ElementDefinition } from "cytoscape";
import { LessonConfigType } from "../../models/Wordhero";

interface Props {
  elements: { [key: string]: ElementDefinition[] };
  onUpdate: (data: any) => void;
  config: LessonConfigType;
  isEdit: boolean;
  disabled: boolean;
}
interface State {
  addGroup: boolean;
  addGroupPositionPopup: null | {
    x: number;
    y: number;
  };
  addGroupPositionOnGraph: null | {
    x: number;
    y: number;
  };
  newGroupName: string;
}

export default class Spidergram extends Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      addGroup: false,
      addGroupPositionPopup: null,
      addGroupPositionOnGraph: null,
      newGroupName: "",
    };
  }
  componentDidMount(): void {
    document.addEventListener("keydown", this.onKeyDown);
  }

  componentWillUnmount(): void {
    document.removeEventListener("keydown", this.onKeyDown);
  }

  onKeyDown = (e: KeyboardEvent): void => {
    if (e.key === "Esc" || e.key === "Escape") {
      this.setState({
        addGroup: false,
        addGroupPositionPopup: null,
        addGroupPositionOnGraph: null,
        newGroupName: "",
      });
    }
  };

  toggleInput = (renderedPosition, position): void => {
    if (!this.props.isEdit) {
      return;
    }
    this.setState((state) => {
      return {
        addGroup: !state.addGroup,
        addGroupPositionPopup: {
          x: renderedPosition.x - 150,
          y: renderedPosition.y - 70,
        },
        addGroupPositionOnGraph: {
          x: position.x,
          y: position.y,
        },
      };
    });
  };

  onUpdate = (data): void => {
    this.props.onUpdate(data.elements);
  };

  addElement = (): void => {
    this.setState((state) => {
      const position = {
        x: state.addGroupPositionOnGraph?.x || 0,
        y: state.addGroupPositionOnGraph?.y || 0,
      };

      const newElement: ElementDefinition = {
        data: {
          id: state.newGroupName,
          label: state.newGroupName,
        },
        position: {
          x: position.x,
          y: position.y,
        },
        classes: "group-element item",
        group: "nodes",
      };

      const newElements = {
        ...this.props.elements,
        nodes: [...this.props.elements.nodes, newElement],
      };
      this.props.onUpdate(newElements);
      return {
        addGroup: false,
        addGroupPositionPopup: null,
        addGroupPositionOnGraph: null,
        newGroupName: "",
      };
    });
  };

  updateNewGroupName = (event) => {
    const newVal = event.target.value;
    this.setState({
      newGroupName: newVal,
    });
  };

  render(): JSX.Element {
    const {
      addGroup,
      addGroupPositionPopup: addGroupPosition,
      newGroupName,
    } = this.state;
    const { elements, config, isEdit, disabled } = this.props;
    return (
      <div className="spidegram">
        <Graph
          elements={elements}
          onTap={this.toggleInput}
          onUpdate={this.onUpdate}
          config={config}
          isEdit={isEdit}
          disabled={disabled}
        />
        {addGroup && (
          <form
            className="add-new-group"
            style={{ top: addGroupPosition?.y, left: addGroupPosition?.x }}
            onSubmit={(e) => {
              e.preventDefault();
              this.addElement();
            }}
          >
            <Input
              label="Add new group"
              type="text"
              value={newGroupName}
              onChange={this.updateNewGroupName}
              focus
            />
            <button type="button" onClick={this.addElement}>
              add
            </button>
          </form>
        )}
      </div>
    );
  }
}
