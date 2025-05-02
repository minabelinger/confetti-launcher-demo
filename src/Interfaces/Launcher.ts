import type { ConfettiConfig } from "./Confetti";

export interface LauncherConfig {
  position?: {
    x: number;
    y: number;
  };
  direction?: {
    start: number;
    end: number;
  };
  duration?: number;
  delay?: number;
  amount?: [number, number];
  strength?: [number, number];
  colors?: string[];
  destroyDistance?: number;
  light_dir?: [number, number, number];
}
