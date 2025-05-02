import type { ConfettiConfig } from "./Confetti";
import type { LauncherConfig } from "./Launcher";

export interface Preset {
  launcher: LauncherConfig;
  confettis: ConfettiConfig[];
  customCode?: string;
}
