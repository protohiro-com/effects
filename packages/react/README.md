# @protohiro/effects

React hooks for hard CSS effects on existing elements without wrappers.

Best for:

- `react gradient border`
- `react spotlight reveal effect`
- `react glass highlight`
- composable effects in design systems

The library targets effects that are awkward to ship by hand because of pseudo-elements, `border-radius`, Safari fallback behavior, SSR, and ref composition.

## Install

```bash
npm install @protohiro/effects
```

## Quick start

```tsx
import { useGradientBorderEffect } from '@protohiro/effects';

export function Button() {
  const ref = useGradientBorderEffect({ thickness: 2, angle: 90 });
  return <button ref={ref}>Click</button>;
}
```

## Why use it

- no extra DOM nodes
- no layout measurements
- SSR and hydration friendly
- preserves existing refs and class names
- effects compose through namespaced classes and CSS variables

## Hooks

- `useGradientBorderEffect`
- `useGlassHighlightEffect`
- `useGlowEffect`
- `useNoiseEffect`
- `useSpotlightEffect`

## Core effects

### `useGradientBorderEffect(options)`

Gradient border ring on a single existing element with `border-radius` support and graceful fallback behavior.

### `useSpotlightEffect(options)`

Interactive spotlight and reveal overlay for cards, media surfaces, and CTA blocks.

### `useGlassHighlightEffect(options)`

Adds a restrained glass highlight layer with edge light, soft sheen, tint, and optional backdrop blur for dark premium surfaces.

Options:
- `color?: string`
- `edgeOpacity?: number`
- `sheenOpacity?: number`
- `tintOpacity?: number`
- `angle?: string | number`
- `blur?: string | number`
- `radius?: string | number`
- `inset?: string | number`
- `saturate?: number`
- `disabled?: boolean`

Live demo:
[libs.protohiro.com/effects](https://libs.protohiro.com/effects/)

For full docs and demos, see:
[github.com/protohiro-com/effects](https://github.com/protohiro-com/effects)
