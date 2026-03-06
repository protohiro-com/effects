export interface EffectBaseOptions {
  disabled?: boolean;
  className?: string;
}

export interface GradientBorderOptions extends EffectBaseOptions {
  thickness?: string | number;
  radius?: string | number;
  colors?: string;
  angle?: string | number;
}

export interface GlowOptions extends EffectBaseOptions {
  color?: string;
  blur?: string | number;
  spread?: string | number;
  opacity?: number;
}

export interface GlassHighlightOptions extends EffectBaseOptions {
  color?: string;
  edgeOpacity?: number;
  sheenOpacity?: number;
  tintOpacity?: number;
  angle?: string | number;
  blur?: string | number;
  radius?: string | number;
  inset?: string | number;
  saturate?: number;
}

export interface NoiseOptions extends EffectBaseOptions {
  size?: string | number;
  intensity?: number;
}

export interface SpotlightOptions extends EffectBaseOptions {
  mode?: 'glow' | 'reveal';
  size?: string | number;
  intensity?: number;
  color?: string;
  softness?: number;
  coreIntensity?: number;
  x?: string | number;
  y?: string | number;
  followPointer?: boolean;
  revealColor?: string;
  revealImage?: string;
  revealSize?: string | number;
  revealOpacity?: number;
}
