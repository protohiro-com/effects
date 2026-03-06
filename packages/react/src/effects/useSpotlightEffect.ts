import {
  applyCssVars,
  applyEffectClass,
  ensureGlobalStyle,
  toCssLength,
  toCssNumber,
} from '@protohiro/effects-core';
import { useCallback, useEffect, useMemo, useState } from 'react';

import type { SpotlightOptions } from '../types';
import { EFFECT_STYLES } from '../shared/effectStyles';

const STYLE_ID = 'protohiro-effects-base';

function clampUnit(value: number | undefined): number | undefined {
  if (value === undefined || Number.isNaN(value)) {
    return undefined;
  }

  return Math.max(0, Math.min(1, value));
}

function toCssPosition(value: string | number | undefined): string | undefined {
  if (value === undefined) {
    return undefined;
  }

  return typeof value === 'number' ? `${value}%` : value;
}

function toCssImage(value: string | undefined): string | undefined {
  if (!value) {
    return undefined;
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return undefined;
  }

  if (
    trimmed.startsWith('url(') ||
    trimmed.startsWith('linear-gradient(') ||
    trimmed.startsWith('radial-gradient(') ||
    trimmed.startsWith('conic-gradient(')
  ) {
    return trimmed;
  }

  return `url("${trimmed.replace(/"/g, '\\"')}")`;
}

function normalizeSpotlightSize(
  value: string | number | undefined,
): string | number | undefined {
  if (value === undefined || typeof value !== 'number') {
    return value;
  }

  return Math.max(0, value);
}

function clampPointerOffset(value: number, max: number): number {
  return Math.max(0, Math.min(value, max));
}

export function useSpotlightEffect<T extends HTMLElement = HTMLElement>(
  options: SpotlightOptions = {},
) {
  const [node, setNode] = useState<T | null>(null);
  const isRevealMode = options.mode === 'reveal';
  const size = normalizeSpotlightSize(options.size);
  const intensity = clampUnit(options.intensity);
  const softness = clampUnit(options.softness);
  const coreIntensity = clampUnit(options.coreIntensity);
  const revealOpacity = clampUnit(options.revealOpacity);
  const x = toCssPosition(options.x);
  const y = toCssPosition(options.y);
  const revealImage = toCssImage(options.revealImage);

  const vars = useMemo(
    () => ({
      '--pe-spotlight-size': toCssLength(size),
      '--pe-spotlight-intensity': toCssNumber(intensity),
      '--pe-spotlight-color': options.color,
      '--pe-spotlight-softness': toCssNumber(softness),
      '--pe-spotlight-core-intensity': toCssNumber(coreIntensity),
      '--pe-spotlight-x': x,
      '--pe-spotlight-y': y,
      '--pe-spotlight-reveal-color': options.revealColor,
      '--pe-spotlight-reveal-image': revealImage,
      '--pe-spotlight-reveal-size': toCssLength(options.revealSize),
      '--pe-spotlight-reveal-opacity': toCssNumber(revealOpacity),
    }),
    [
      size,
      intensity,
      softness,
      coreIntensity,
      options.color,
      x,
      y,
      options.revealColor,
      revealImage,
      options.revealSize,
      revealOpacity,
    ],
  );

  useEffect(() => {
    if (!node || options.disabled) {
      return;
    }

    ensureGlobalStyle(STYLE_ID, EFFECT_STYLES);

    const cleanups: Array<() => void> = [];
    cleanups.push(applyEffectClass(node, 'pe-spotlight'));
    if (isRevealMode) {
      cleanups.push(applyEffectClass(node, 'pe-spotlight--reveal'));
    }

    if (options.className) {
      cleanups.push(applyEffectClass(node, options.className));
    }

    cleanups.push(applyCssVars(node, vars));

    return () => {
      for (const cleanup of cleanups.reverse()) {
        cleanup();
      }
    };
  }, [node, options.disabled, options.className, isRevealMode, vars]);

  useEffect(() => {
    if (!node || options.disabled || !options.followPointer) {
      return;
    }

    const onPointerMove = (event: PointerEvent) => {
      // Pointer-follow spotlight needs host-relative coordinates; this is the minimal geometry read for that mode.
      // eslint-disable-next-line no-restricted-syntax
      const rect = node.getBoundingClientRect();
      const nextX = clampPointerOffset(event.clientX - rect.left, rect.width);
      const nextY = clampPointerOffset(event.clientY - rect.top, rect.height);

      node.style.setProperty('--pe-spotlight-x', `${nextX}px`);
      node.style.setProperty('--pe-spotlight-y', `${nextY}px`);
    };

    node.addEventListener('pointermove', onPointerMove);

    return () => {
      node.removeEventListener('pointermove', onPointerMove);
    };
  }, [node, options.disabled, options.followPointer]);

  return useCallback((next: T | null) => {
    setNode(next);
  }, []);
}
