import React, { useEffect } from "react";

interface Props {
  label: string;
  type: "text";
  value: string;
  onChange: (event) => void;
  focus?: boolean;
  disabled?: boolean;
  onRemove?: () => void;
}

const Input = (props: Props) => {
  const inputRef = React.useRef<any>(null);

  useEffect(() => {
    if (inputRef.current && props.focus) {
      inputRef.current.focus();
    }
  });

  const { label, type, value, onChange, disabled, onRemove } = props;
  const elId = `el${label}`;

  return (
    <div className="custom-input">
      <label htmlFor={elId}>{label}</label>
      <input
        ref={inputRef}
        type={type}
        value={value}
        id={elId}
        onChange={onChange}
        disabled={disabled}
      />
      {onRemove && (
        <img
          title="remove"
          src={require(`../../assets/icons/delete.svg`)}
          alt="word hero img"
          className="trash-icon wh-icon white active remove-button"
          onClick={onRemove}
        />
      )}
    </div>
  );
};

export default Input;
