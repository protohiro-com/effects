# ProtoEffects

ProtoEffects is a zero-wrapper React library for hard CSS effects like gradient borders, glow rings, and noise overlays.

## Packages

- `@protoeffects/core`: shared runtime utilities.
- `@protoeffects/react`: React hooks and effect styles.
- `@protoeffects/demo`: local demo app.

## Quick start

```bash
pnpm install
pnpm build
```

```tsx
import { useGradientBorderEffect } from '@protoeffects/react';

function Button() {
  const ref = useGradientBorderEffect({ thickness: 2, angle: 90 });

  return <button ref={ref}>Click</button>;
}
```

## Hooks

### `useGradientBorderEffect(options)`

Options:
- `thickness?: string | number`
- `radius?: string | number`
- `colors?: string`
- `angle?: string | number`
- `disabled?: boolean`

### `useGlowEffect(options)`

Options:
- `color?: string`
- `blur?: string | number`
- `spread?: string | number`
- `opacity?: number`
- `disabled?: boolean`

### `useNoiseEffect(options)`

Options:
- `size?: string | number`
- `intensity?: number`
- `disabled?: boolean`

## Safari notes

`gradient-border` uses `mask-composite` for the preferred ring rendering path. Safari fallback uses a simplified border and layered background. The fallback keeps content readable and does not hide element content.

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
