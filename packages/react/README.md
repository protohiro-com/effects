# @protoeffects/react

Zero-wrapper React hooks for composable CSS effects.

## Install

```bash
npm install @protoeffects/react
```

## Quick start

```tsx
import { useGradientBorderEffect } from '@protoeffects/react';

export function Button() {
  const ref = useGradientBorderEffect({ thickness: 2, angle: 90 });
  return <button ref={ref}>Click</button>;
}
```

## Hooks

- `useGradientBorderEffect`
- `useGlowEffect`
- `useNoiseEffect`

For full docs and demos, see:
https://github.com/snwol/protoeffects
