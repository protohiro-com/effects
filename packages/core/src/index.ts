export type CssVars = Record<string, string | undefined>;
export type RefLike<T> = ((value: T | null) => void) | { current: T | null } | null | undefined;

export function ensureGlobalStyle(styleId: string, cssText: string): void {
  if (typeof document === 'undefined') {
    return;
  }

  const selector = `style[data-protohiro-effects-style="${styleId}"]`;
  if (document.head.querySelector(selector)) {
    return;
  }

  const node = document.createElement('style');
  node.setAttribute('data-protohiro-effects-style', styleId);
  node.textContent = cssText;
  document.head.appendChild(node);
}

export function assignRef<T>(ref: RefLike<T>, value: T | null): void {
  if (!ref) {
    return;
  }

  if (typeof ref === 'function') {
    ref(value);
    return;
  }

  ref.current = value;
}

export function mergeRefs<T>(...refs: Array<RefLike<T>>): (value: T | null) => void {
  return (value) => {
    for (const ref of refs) {
      assignRef(ref, value);
    }
  };
}

export function applyEffectClass(element: HTMLElement, className: string): () => void {
  const hadClass = element.classList.contains(className);
  if (!hadClass) {
    element.classList.add(className);
  }

  return () => {
    if (!hadClass) {
      element.classList.remove(className);
    }
  };
}

export function applyCssVars(element: HTMLElement, vars: CssVars): () => void {
  const previous = new Map<string, string>();

  for (const [name, value] of Object.entries(vars)) {
    previous.set(name, element.style.getPropertyValue(name));

    if (value === undefined) {
      element.style.removeProperty(name);
    } else {
      element.style.setProperty(name, value);
    }
  }

  return () => {
    for (const [name, value] of previous.entries()) {
      if (value) {
        element.style.setProperty(name, value);
      } else {
        element.style.removeProperty(name);
      }
    }
  };
}

export function toCssLength(value: string | number | undefined): string | undefined {
  if (value === undefined) {
    return undefined;
  }

  return typeof value === 'number' ? `${value}px` : value;
}

export function toCssAngle(value: string | number | undefined): string | undefined {
  if (value === undefined) {
    return undefined;
  }

  return typeof value === 'number' ? `${value}deg` : value;
}

export function toCssTime(value: string | number | undefined): string | undefined {
  if (value === undefined) {
    return undefined;
  }

  return typeof value === 'number' ? `${value}s` : value;
}

export function toCssNumber(value: number | undefined): string | undefined {
  if (value === undefined) {
    return undefined;
  }

  return String(value);
}
