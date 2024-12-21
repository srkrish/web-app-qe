import { InputHTMLAttributes, ChangeEvent } from "react";

export const INPUT_TYPES = {
  TEXT: "text",
  PASSWORD: "password",
} as const;

export type InputTypes = typeof INPUT_TYPES[keyof typeof INPUT_TYPES];

export interface BaseInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'type'> {
  /**
   * The on change handler
   */
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  /**
   * The placeholder of the input
   */
  placeholder?: string;
  /**
   * The test id
   */
  testId?: string;
  /**
   * What type of field is it
   */
  type?: InputTypes;
  /**
   * The value of the input
   */
  value: string; // Made required since it's controlled
}

export interface InputErrorProps extends BaseInputProps {
  /**
   * If this is an error field yes or no
   */
  isError?: boolean; // Optional since it has a default value
}

export interface SubmitButtonProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'value'> {
    /**
     * A custom class to be added to the button
     */
    customClass?: string;
    /**
     * The test id for testing purposes
     */
    testId?: string;
    /**
     * The text to display on the button
     */
    value: string;
  }