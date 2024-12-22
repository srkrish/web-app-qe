export type ValidUsername = 
  | "standard_user"
  | "locked_out_user"
  | "problem_user"
  | "performance_glitch_user"
  | "error_user"
  | "visual_user";

export interface Credentials {
  username: string;
  password: string;
}

export interface InventoryItem {
  id: number;
  name: string;
  desc: string;
  price: number;
  image_url: string;
}

export interface CartListener {
  forceUpdate: () => void;
}