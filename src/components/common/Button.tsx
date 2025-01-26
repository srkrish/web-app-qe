import { ButtonHTMLAttributes } from "react";
import "./Button.css";
import backPng from "assets/img/back-arrow.png";

export const BUTTON_TYPES = {
  ACTION: "action",
  BACK: "secondary back",
  PRIMARY: "primary",
  SECONDARY: "secondary",
} as const;

export const BUTTON_SIZES = {
  SMALL: "small",
  MEDIUM: "medium",
  LARGE: "large",
} as const;

type ButtonType = typeof BUTTON_TYPES[keyof typeof BUTTON_TYPES];
type ButtonSize = typeof BUTTON_SIZES[keyof typeof BUTTON_SIZES];

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  customClass?: string;
  label: string;
  onClick: () => void;
  size?: ButtonSize;
  testId?: string;
  type?: ButtonType;
}

const Button = ({
  customClass,
  label,
  onClick,
  size = BUTTON_SIZES.LARGE,
  testId,
  type = BUTTON_TYPES.PRIMARY,
  ...props
}: ButtonProps) => {
  const buttonTypeClass = ` btn_${type}`;
  const extraClass = customClass ? ` ${customClass}` : "";
  const buttonSize = ` btn_${size}`;

  const BackImage = () => (
    <img src={backPng} className="back-image" alt="Go back" />
  );

  return (
    <button
      type="button"
      className={`btn${buttonTypeClass}${buttonSize}${extraClass}`}
      {...(testId ? {
        "data-test": testId,
        id: testId,
        name: testId,
      } : {})}
      onClick={onClick}
      {...props}
    >
      {type === BUTTON_TYPES.BACK && <BackImage />}
      {label}
    </button>
  );
};

export default Button;