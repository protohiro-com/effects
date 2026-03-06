# @protohiro/effects

## 0.3.1

### Patch Changes

- Refine `useGlassHighlightEffect` rendering to produce a more restrained premium-glass finish.

  Highlights:
  - Softens the glass sheen profile to avoid harsh central streaks and plastic-looking glare.
  - Rebalances edge light, tint layering, and fallback gradients for a calmer dark-glass presentation.
  - Keeps the hook contract and CSS variable API unchanged while improving the shipped visual baseline.

## 0.3.0

### Minor Changes

- Add a new `useGlassHighlightEffect` hook for premium glass-sheen surfaces.

  Highlights:
  - Adds a new glass highlight effect with configurable edge, sheen, tint, blur, inset, and saturation options.
  - Extends the shared effect stylesheet and demo coverage for the new effect.
  - Updates public docs and exports for the expanded hook surface.

## 0.2.0

### Minor Changes

- Add a new `useSpotlightEffect` hook with support for `glow` and `reveal` modes.

  Highlights:
  - Adds reveal-mode options (`revealColor`, `revealImage`, `revealSize`, `revealOpacity`) for spotlight content reveal.
  - Improves spotlight behavior and customization with `softness`, `coreIntensity`, and pointer-follow updates.
  - Extends demo coverage and documentation for spotlight usage.

## 0.1.1

### Patch Changes

- Patch release with documentation and deployment fixes, including live demo link updates.
- Updated dependencies
  - @protohiro/effects-core@0.1.1
