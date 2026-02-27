import { applyCssVars, applyEffectClass, ensureGlobalStyle } from '@protoeffects/core';
import { useCallback, useEffect, useState } from 'react';

type UseCssEffectInput = {
  className: string;
  userClassName?: string;
  vars: Record<string, string | undefined>;
  disabled?: boolean;
  styleId: string;
  styleText: string;
};

export function useCssEffect<T extends HTMLElement>(input: UseCssEffectInput) {
  const [node, setNode] = useState<T | null>(null);

  useEffect(() => {
    if (!node || input.disabled) {
      return;
    }

    ensureGlobalStyle(input.styleId, input.styleText);

    const cleanups: Array<() => void> = [];
    cleanups.push(applyEffectClass(node, input.className));

    if (input.userClassName) {
      cleanups.push(applyEffectClass(node, input.userClassName));
    }

    cleanups.push(applyCssVars(node, input.vars));

    return () => {
      for (const cleanup of cleanups.reverse()) {
        cleanup();
      }
    };
  }, [
    node,
    input.className,
    input.userClassName,
    input.disabled,
    input.styleId,
    input.styleText,
    input.vars,
  ]);

  return useCallback((next: T | null) => {
    setNode(next);
  }, []);
}
