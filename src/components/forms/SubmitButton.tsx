import React from "react";
import { SubmitButtonProps } from "./types";
import "./SubmitButton.css";

const SubmitButton: React.FC<SubmitButtonProps> = ({ 
  customClass = "",
  testId,
  value,
  ...props 
}) => {
  const extraClass = customClass ? ` ${customClass}` : "";
  
  return (
    <input
      type="submit"
      className={`submit-button${extraClass}`}
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
  );
};

export default SubmitButton;