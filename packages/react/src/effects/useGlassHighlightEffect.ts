import { toCssAngle, toCssLength, toCssNumber } from '@protohiro/effects-core';
import { useMemo } from 'react';

import type { GlassHighlightOptions } from '../types';
import { EFFECT_STYLES } from '../shared/effectStyles';
import { useCssEffect } from '../shared/useCssEffect';

const STYLE_ID = 'protohiro-effects-base';

function clampUnit(value: number | undefined): number | undefined {
  if (value === undefined || Number.isNaN(value)) {
    return undefined;
  }

  return Math.max(0, Math.min(1, value));
}

export function useGlassHighlightEffect<T extends HTMLElement = HTMLElement>(
  options: GlassHighlightOptions = {},
) {
  const edgeOpacity = clampUnit(options.edgeOpacity);
  const sheenOpacity = clampUnit(options.sheenOpacity);
  const tintOpacity = clampUnit(options.tintOpacity);
  const saturate =
    options.saturate === undefined || Number.isNaN(options.saturate)
      ? undefined
      : Math.max(0, options.saturate);

  const vars = useMemo(
    () => ({
      '--pe-gh-color': options.color,
      '--pe-gh-edge-opacity': toCssNumber(edgeOpacity),
      '--pe-gh-sheen-opacity': toCssNumber(sheenOpacity),
      '--pe-gh-tint-opacity': toCssNumber(tintOpacity),
      '--pe-gh-angle': toCssAngle(options.angle),
      '--pe-gh-blur': toCssLength(options.blur),
      '--pe-gh-radius': toCssLength(options.radius),
      '--pe-gh-inset': toCssLength(options.inset),
      '--pe-gh-saturate': toCssNumber(saturate),
    }),
    [
      options.color,
      edgeOpacity,
      sheenOpacity,
      tintOpacity,
      options.angle,
      options.blur,
      options.radius,
      options.inset,
      saturate,
    ],
  );

  return useCssEffect<T>({
    className: 'pe-glass-highlight',
    userClassName: options.className,
    vars,
    disabled: options.disabled,
    styleId: STYLE_ID,
    styleText: EFFECT_STYLES,
  });
}
