import React, { ChangeEvent } from "react";
import "./Select.css";

interface Option {
  key: string;
  value: string;
}

interface SelectProps {
  activeOption: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
  testId?: string;
}

const Select: React.FC<SelectProps> = ({ activeOption, onChange, options, testId }) => {
  return (
    <span className="select_container">
      <span className="active_option" data-test="active-option">
        {options[options.findIndex((option: Option) => option.key === activeOption)]
          .value}
      </span>
      <select
        onChange={onChange}
        className="product_sort_container"
        value={activeOption}
        {...(testId ? { "data-test": testId } : {})}
      >
        {options.map(({ key, value }: Option) => (
          <option value={key} key={key}>
            {value}
          </option>
        ))}
      </select>
    </span>
  );
};

export default Select;