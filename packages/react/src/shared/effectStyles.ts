export const EFFECT_STYLES = `
.pe-gradient-border {
  position: relative;
  isolation: isolate;
  border-radius: var(--pe-gb-radius, inherit);
  border-color: transparent;
}

.pe-gradient-border::before {
  content: '';
  position: absolute;
  z-index: -1;
  inset: calc(var(--pe-gb-thickness, 2px) * -1);
  border-radius: calc(var(--pe-gb-radius, 0px) + var(--pe-gb-thickness, 2px));
  box-sizing: border-box;
  padding: var(--pe-gb-thickness, 2px);
  background: linear-gradient(var(--pe-gb-angle, 120deg), var(--pe-gb-colors, #5eead4, #0ea5e9));
  pointer-events: none;

  /* Hollow out the center so only the ring remains. */
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  mask-composite: exclude;
}

@supports not ((-webkit-mask-composite: xor) or (mask-composite: exclude)) {
  .pe-gradient-border::before {
    z-index: -1;
    inset: calc(var(--pe-gb-thickness, 2px) * -1);
    border-radius: calc(var(--pe-gb-radius, 0px) + var(--pe-gb-thickness, 2px));
    padding: 0;
    border: var(--pe-gb-thickness, 2px) solid;
    border-image: linear-gradient(var(--pe-gb-angle, 120deg), var(--pe-gb-colors, #5eead4, #0ea5e9)) 1;
  }
}

.pe-glow {
  box-shadow:
    0 0 var(--pe-glow-blur, 24px)
      color-mix(in srgb, var(--pe-glow-color, #38bdf8) calc(var(--pe-glow-opacity, 0.4) * 100%), transparent),
    0 0 var(--pe-glow-spread, 2px)
      color-mix(in srgb, var(--pe-glow-color, #38bdf8) calc(var(--pe-glow-opacity, 0.2) * 100%), transparent);
}

.pe-noise {
  position: relative;
}

.pe-noise::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 160 160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='2' seed='13' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: var(--pe-noise-size, 80px) var(--pe-noise-size, 80px);
  background-repeat: repeat;
  image-rendering: pixelated;
  filter: contrast(190%) brightness(110%);
  opacity: var(--pe-noise-opacity, 0.28);
  pointer-events: none;
}

@media (prefers-reduced-motion: reduce) {
  .pe-noise::after {
    opacity: calc(var(--pe-noise-opacity, 0.28) * 0.9);
  }
}
`;
