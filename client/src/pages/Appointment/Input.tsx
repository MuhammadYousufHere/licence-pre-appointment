import { Field } from "formik";
import React, { FC } from "react";

import ErrorMessage from "../../components/Form/ErrorMessage";
import "./inputStyles.scss";
export interface InputProps {
  name: string;
  label?: string;
  type?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  id?: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  icon?: React.ReactNode | JSX.Element;
  onToggle?: () => void;
  pattern?: string;
  countryCode?: string;
}
const Input: FC<InputProps> = (props) => {
  const {
    label,
    id,
    type,
    name,
    value,
    onChange,
    onToggle,
    icon,
    pattern,
    error,
  } = props;
  return (
    <section className="ui-input-container">
      <div className="input-group">
        <label htmlFor={id}>{label}</label>
        <div className="input-box">
          <Field
            type={type}
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            pattern={pattern}
          />

          {icon && (
            <div onClick={onToggle} className="input-icon">
              {icon}
            </div>
          )}
        </div>
      </div>
      {error && <ErrorMessage message={error} />}
    </section>
  );
};

export default Input;
