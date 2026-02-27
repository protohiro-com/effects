import { toCssAngle, toCssLength } from '@protoeffects/core';
import { useMemo } from 'react';

import type { GradientBorderOptions } from '../types';
import { EFFECT_STYLES } from '../shared/effectStyles';
import { useCssEffect } from '../shared/useCssEffect';

const STYLE_ID = 'protoeffects-base';

export function useGradientBorderEffect<T extends HTMLElement = HTMLElement>(
  options: GradientBorderOptions = {},
) {
  const vars = useMemo(
    () => ({
      '--pe-gb-thickness': toCssLength(options.thickness),
      '--pe-gb-radius': toCssLength(options.radius),
      '--pe-gb-colors': options.colors,
      '--pe-gb-angle': toCssAngle(options.angle),
    }),
    [options.thickness, options.radius, options.colors, options.angle],
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
