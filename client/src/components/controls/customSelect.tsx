/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/destructuring-assignment */
import React from "react";
import Select, { components } from "react-select";

interface Props {
  options: string[];
  propName: string;
  propValue: string;
  onChange: (any) => void;
}

const Option = (props: any): JSX.Element => {
  return (
    <div style={{ fontFamily: props.value }}>
      <components.Option {...props} />
    </div>
  );
};

const CustomSelect = ({
  options,
  propName,
  propValue,
  onChange,
}: Props): JSX.Element => {
  const fontOptions = options.map((opt) => ({ value: opt, label: opt }));
  const handleChange = (e): void => {
    onChange({ [propName]: e.value, font: e.value });
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
      <label htmlFor="fontSelector">{propName}</label>
      <Select
        id="fontSelector"
        className="basic-single"
        classNamePrefix="select"
        name="color"
        options={fontOptions}
        defaultValue={fontOptions.find((x) => x.value === propValue)}
        onChange={handleChange}
        components={{ Option }}
        styles={colourStyles}
      />
    </div>
  );
};

export default CustomSelect;
