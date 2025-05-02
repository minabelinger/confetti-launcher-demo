export interface ConfettiConfig {
  velocity?: ConfettiVelocity;
  quaternion?: Quaternion;
  quaternionVelocity?: Quaternion;
  color?: string;
  randomColor?: boolean;
  randomRotation?: boolean;
  shading?: boolean;
  shapeOptions?: ShapeOptions;
  lifetime?: Lifetime;
}

interface ConfettiVelocity {
  x: number;
  y: number;
  maxFallspeed: number;
  gravity: number;
  airdrag: number;
}

interface Quaternion {
  w: number;
  x: number;
  y: number;
  z: number;
}

interface ShapeOptions {
  type: string;
  width: number;
  height: number;
  shininess?: number;
  shadows?: number;
  image?: {
    src: string;
    composition: string;
  };
}

interface Lifetime {
  enabled: boolean;
  onset: number;
  duration: number;
  current: number;
}
