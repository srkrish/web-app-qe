import { ValidUsername } from './types';

export const FONT_FAMILY = "Roboto, Arial, Helvetica, sans-serif";

export const VALID_USERNAMES: ValidUsername[] = [
  "standard_user",
  "locked_out_user",
  "problem_user",
  "performance_glitch_user",
  "error_user",
  "visual_user",
];

export const VALID_PASSWORD = "secret_sauce";

export const ROUTES = {
  LOGIN: "/",
  INVENTORY: "/inventory",
  INVENTORY_LONG: "/inventory-long",
  INVENTORY_LIST: "/inventory-item",
  CART: "/cart",
  CHECKOUT_STEP_ONE: "/checkout-step-one",
  CHECKOUT_STEP_TWO: "/checkout-step-two",
  CHECKOUT_COMPLETE: "/checkout-complete",
} as const;

export type Routes = typeof ROUTES[keyof typeof ROUTES];

export const CART_CONTENTS = "cart-contents";
export const SESSION_USERNAME = "session-username";