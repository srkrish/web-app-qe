import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { InputErrorProps, INPUT_TYPES } from "./types";
import "./InputError.css";

const InputError: React.FC<InputErrorProps> = ({
  isError = false,
  onChange,
  placeholder = "",
  testId = undefined,
  type = INPUT_TYPES.TEXT,
  value = "",
  ...props
}) => {
  return (
    <div className="form_group">
      <input
        className={`input_error form_input${isError ? " error" : ""}`}
        placeholder={placeholder}
        onChange={onChange}
        type={type}
        value={value}
        {...(testId
          ? {
              "data-test": testId,
              id: testId,
              name: testId,
            }
          : {})}
        {...props}
      />
      {isError && (
        <FontAwesomeIcon icon={faTimesCircle} className="error_icon" />
      )}
    </div>
  );
};

export default InputError;