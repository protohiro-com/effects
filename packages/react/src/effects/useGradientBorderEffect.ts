import { toCssAngle, toCssLength } from '@protohiro/effects-core';
import { useMemo } from 'react';

import type { GradientBorderOptions } from '../types';
import { EFFECT_STYLES } from '../shared/effectStyles';
import { useCssEffect } from '../shared/useCssEffect';

const STYLE_ID = 'protohiro-effects-base';

export function useGradientBorderEffect<T extends HTMLElement = HTMLElement>(
  options: GradientBorderOptions = {},
) {
  const speed = typeof options.speed === 'number' && Number.isFinite(options.speed) ? options.speed : 1;
  const resolvedSpeed = speed > 0 ? speed : 1;
  const animationDuration = `${6 / resolvedSpeed}s`;

  const vars = useMemo(
    () => ({
      '--pe-gb-thickness': toCssLength(options.thickness),
      '--pe-gb-radius': toCssLength(options.radius),
      '--pe-gb-colors': options.colors,
      '--pe-gb-angle': toCssAngle(options.angle),
      '--pe-gb-animation-duration': animationDuration,
      '--pe-gb-animation-name': options.animated ? 'pe-gradient-border-flow' : 'none',
    }),
    [options.thickness, options.radius, options.colors, options.angle, animationDuration, options.animated],
  );

  return useCssEffect<T>({
    className: 'pe-gradient-border',
    userClassName: options.className,
    vars,
    disabled: options.disabled,
    styleId: STYLE_ID,
    styleText: EFFECT_STYLES,
  });
}
