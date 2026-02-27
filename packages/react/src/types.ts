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

export interface NoiseOptions extends EffectBaseOptions {
  size?: string | number;
  intensity?: number;
}
