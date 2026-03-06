# Protohiro Effects

Protohiro Effects is a zero-wrapper React library for hard CSS effects on existing elements: gradient borders, spotlight reveal overlays, glass highlights, glow rings, and noise overlays.

Built for design systems and app UIs that need premium effects without extra DOM nodes, layout shifts, or runtime layout measurements.

## Live demo

[libs.protohiro.com/effects](https://libs.protohiro.com/effects/)

## Packages

- `@protohiro/effects-core`: shared runtime utilities.
- `@protohiro/effects`: React hooks and effect styles.
- `@protohiro/effects-demo`: local demo app.

## Quick start

```bash
pnpm install
pnpm build
```

```tsx
import { useGradientBorderEffect } from '@protohiro/effects';

function Button() {
  const ref = useGradientBorderEffect({ thickness: 2, angle: 90 });

  return <button ref={ref}>Click</button>;
}
```

## Why this exists

Most visual effects are easy to prototype and annoying to ship. Hand-rolled CSS often turns into:

- extra wrapper elements
- pseudo-element conflicts
- broken `border-radius` clipping
- SSR and hydration edge cases
- Safari-specific fallback work

Protohiro Effects packages those effects as React hooks that mutate only `classList` and CSS custom properties on a single existing element.

## Best-fit use cases

- `react gradient border` without wrappers
- `react spotlight reveal effect` on cards and CTAs
- `react glass highlight` for premium dark surfaces
- CSS effects for design systems and headless UI components
- composable single-element effects that preserve refs

## Hooks

### `useGradientBorderEffect(options)`

Single-element gradient border with `border-radius` support and a graceful Safari fallback.

Options:
- `thickness?: string | number`
- `radius?: string | number`
- `colors?: string`
- `angle?: string | number`
- `disabled?: boolean`

### `useGlassHighlightEffect(options)`

Adds a restrained glass highlight layer tuned for premium dark surfaces.

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

### `useGlowEffect(options)`

Lightweight supporting glow for composition. Useful, but simpler than the core hard effects.

Options:
- `color?: string`
- `blur?: string | number`
- `spread?: string | number`
- `opacity?: number`
- `disabled?: boolean`

### `useNoiseEffect(options)`

Noise overlay for textured surfaces and layered compositions.

Options:
- `size?: string | number`
- `intensity?: number`
- `disabled?: boolean`

### `useSpotlightEffect(options)`

Interactive spotlight and reveal effect for premium cards, media, and CTA surfaces.

Options:
- `mode?: 'glow' | 'reveal'`
- `size?: string | number`
- `intensity?: number`
- `color?: string`
- `softness?: number`
- `coreIntensity?: number`
- `x?: string | number`
- `y?: string | number`
- `followPointer?: boolean`
- `revealColor?: string`
- `revealImage?: string`
- `revealSize?: string | number`
- `revealOpacity?: number`
- `disabled?: boolean`

## Safari notes

`gradient-border` uses `mask-composite` for the preferred ring rendering path. Safari fallback uses a simplified border and layered background. The fallback keeps content readable and does not hide element content.

## Positioning

This library is strongest when you need effects that are awkward to ship by hand:

- gradient borders with correct clipping
- spotlight reveal overlays
- subtle glass highlights on existing components

`glow` and `noise` are supporting effects. The main value is shipping the harder UI effects safely on a single element.

## Composability

Hooks are composable because each effect writes only namespaced classes (`pe-*`) and CSS variables (`--pe-*`).

## Quality gates

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm test:visual
pnpm size
```
