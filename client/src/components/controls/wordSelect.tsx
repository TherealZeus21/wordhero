import React, { Component } from "react";

import CreatableSelect from "react-select/creatable";
import { WordType } from "../../models/Wordhero";
import { uuidv4 } from "../../utils/helpers";

interface Props {
  words: WordType[];
  onChange: (word: WordType) => void;
  onRemove: Function;
}
interface State {
  editingWord: string;
  inputValue: string;
}

export default class WordSelect extends Component<Props, State> {
  state = {
    inputValue: "",
    editingWord: "",
  };

  setEditingValue = (val) => {
    this.setState({ editingWord: val });
  };

  handleEditChange = (inputValue, data) => {
    this.props.onChange({
      id: data.id,
      value: inputValue,
    });

    this.setState({ editingWord: "" });
  };

  components = {
    DropdownIndicator: null,
    MultiValueLabel: ({ data }) => {
      if (this.state.editingWord && this.state.editingWord === data.value) {
        return (
          <input
            type="text"
            className="select-item-input"
            defaultValue={data.value}
            onKeyDown={(ev) => {
              ev.stopPropagation();
              if (ev.key === "Enter" || ev.key === "Tab") {
                this.handleEditChange(ev.currentTarget.value, data);
              }
            }}
            onBlur={(ev) => {
              this.handleEditChange(ev.currentTarget.value, data);
            }}
            autoFocus
          />
        );
      }
      return (
        <button
          className="select-item"
          onClick={() => {
            this.setEditingValue(data.value);
          }}
        >
          {data.value}
        </button>
      );
    },
  };

  handleChange = (value: any, actionMeta: any) => {
    debugger;
    if (actionMeta.removedValue) {
      this.props.onRemove(actionMeta.removedValue.id);
    }
  };
  handleInputChange = (inputValue: string) => {
    this.setState({ inputValue });
  };

  handleKeyDown = (event) => {
    const { inputValue } = this.state;
    if (!inputValue) return;
    switch (event.key) {
      case "Enter":
      case "Tab":
        this.props.onChange({
          id: uuidv4(),
          value: inputValue,
        });
        this.setState({
          inputValue: "",
        });
        event.preventDefault();
    }
  };
  render() {
    const { inputValue } = this.state;
    const value = this.props.words;

    const colourStyles = {
      control: (styles) => ({
        ...styles,
        border: "none",
        boxShadow: "none",
      }),
      multiValue: (styles) => ({
        ...styles,
        margin: "2px",
        padding: "2px",
        borderRadius: "32.5px",
        backgroundColor: "#f6f5f8",
        color: "#4f34c7",
      }),
    };

    return (
      <>
        <div className="custom-input">
          <label htmlFor="hero-words">Words</label>
          <CreatableSelect
            id="hero-words"
            components={this.components}
            inputValue={inputValue}
            isClearable={false}
            isMulti
            menuIsOpen={false}
            onChange={this.handleChange}
            onInputChange={this.handleInputChange}
            onKeyDown={this.handleKeyDown}
            placeholder="Type something and press enter..."
            value={value}
            getOptionLabel={(v) => v.value}
            getOptionValue={(v) => v.id}
            styles={colourStyles}
          />
        </div>
      </>
    );
  }
}
