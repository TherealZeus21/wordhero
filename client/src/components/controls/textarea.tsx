import React, { useEffect } from "react";
interface Props {
  label: string;
  value?: string;
  onChange: (event) => void;
  [x: string]: any;
  onRemove?: () => void;
}

const Textarea = (props: Props) => {
  const inputRef = React.useRef<any>(null);

  useEffect(() => {
    if (inputRef.current && props.focus) {
      inputRef.current.focus();
    }
  });

  const { label, value, onChange, onRemove, ...rest } = props;
  const elId = `el${label}`;

  return (
    <div>
      <div className="custom-input">
        <label htmlFor={elId}>{label}</label>
        <textarea
          rows={4}
          id={elId}
          {...rest}
          value={value}
          onChange={onChange}
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
    </div>
  );
};

export default Textarea;
