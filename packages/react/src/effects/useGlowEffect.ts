import { toCssLength, toCssNumber } from '@protoeffects/core';
import { useMemo } from 'react';

import type { GlowOptions } from '../types';
import { EFFECT_STYLES } from '../shared/effectStyles';
import { useCssEffect } from '../shared/useCssEffect';

const STYLE_ID = 'protoeffects-base';

export function useGlowEffect<T extends HTMLElement = HTMLElement>(options: GlowOptions = {}) {
  const vars = useMemo(
    () => ({
      '--pe-glow-color': options.color,
      '--pe-glow-blur': toCssLength(options.blur),
      '--pe-glow-spread': toCssLength(options.spread),
      '--pe-glow-opacity': toCssNumber(options.opacity),
    }),
    [options.color, options.blur, options.spread, options.opacity],
  );

  return useCssEffect<T>({
    className: 'pe-glow',
    userClassName: options.className,
    vars,
    disabled: options.disabled,
    styleId: STYLE_ID,
    styleText: EFFECT_STYLES,
  });
}
