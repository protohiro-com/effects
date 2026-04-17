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

Peer dependencies:

- `react: ^18 || ^19`
- `react-dom: ^18 || ^19`

## Quick start

```tsx
import { useGradientBorderEffect } from '@protohiro/effects';

export function Button() {
  const ref = useGradientBorderEffect({ thickness: 2, angle: 90, animated: true });
  return <button ref={ref}>Click</button>;
}
```

## Demo

[protohiro.com/labs/effects](https://protohiro.com/labs/effects)

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

Options:

- `thickness?: string | number`
- `radius?: string | number`
- `colors?: string`
- `angle?: string | number`
- `animated?: boolean`
- `speed?: number`
- `disabled?: boolean`

When `animated` is enabled, the gradient colors flow around the border with CSS only. `speed` is a multiplier: `1` is the default, values above `1` are faster, and values below `1` are slower. The effect respects `prefers-reduced-motion` and falls back to a static ring when motion is reduced.

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
[protohiro.com/labs/effects](https://protohiro.com/labs/effects)

For full docs and demos, see:
[github.com/protohiro-com/effects](https://github.com/protohiro-com/effects)
