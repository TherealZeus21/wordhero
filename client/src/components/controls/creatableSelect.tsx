/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/destructuring-assignment */
import React from "react";
import Creatable from "react-select/creatable";
import { components } from "react-select";

interface Props {
  options: string[];
  propName: string;
  propValue: string;
  onChange: (any) => void;
  onCreateNew: (newGroup) => void;
}

const Option = (props: any): JSX.Element => {
  return (
    <div style={{ fontFamily: props.value }}>
      <components.Option {...props} />
    </div>
  );
};

const CreatableSelect = ({
  options,
  propName,
  propValue,
  onChange,
  onCreateNew,
}: Props): JSX.Element => {
  const createdOptions = options.map((opt) => ({ value: opt, label: opt }));
  const handleChange = (e): void => {
    if (e.value) {
      onChange(e.value);
    }
  };

  const colourStyles = {
    control: (styles) => ({
      ...styles,
      border: "none",
      boxShadow: "none",
    }),
  };

  return (
    <div className="custom-input">
      <Creatable
        id="fontSelector"
        className="basic-single"
        classNamePrefix="select"
        name="color"
        placeholder="Type group name and press enter..."
        options={createdOptions}
        value={createdOptions.find((x) => x.label === propValue)}
        onChange={handleChange}
        components={{ Option }}
        styles={colourStyles}
        onCreateOption={onCreateNew}
      />
    </div>
  );
};

export default CreatableSelect;
