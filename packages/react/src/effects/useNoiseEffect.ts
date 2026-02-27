import { toCssLength, toCssNumber } from '@protoeffects/core';
import { useMemo } from 'react';

import type { NoiseOptions } from '../types';
import { EFFECT_STYLES } from '../shared/effectStyles';
import { useCssEffect } from '../shared/useCssEffect';

const STYLE_ID = 'protoeffects-base';

function clampUnit(value: number | undefined): number | undefined {
  if (value === undefined) {
    return undefined;
  }

  if (Number.isNaN(value)) {
    return undefined;
  }

  return Math.max(0, Math.min(1, value));
}

export function useNoiseEffect<T extends HTMLElement = HTMLElement>(options: NoiseOptions = {}) {
  const intensity = clampUnit(options.intensity);

  const vars = useMemo(
    () => ({
      '--pe-noise-size': toCssLength(options.size ?? 120),
      '--pe-noise-opacity': toCssNumber(intensity ?? 0.2),
    }),
    [options.size, intensity],
  );

  return useCssEffect<T>({
    className: 'pe-noise',
    userClassName: options.className,
    vars,
    disabled: options.disabled,
    styleId: STYLE_ID,
    styleText: EFFECT_STYLES,
  });
}
