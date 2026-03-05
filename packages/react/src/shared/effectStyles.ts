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

.pe-spotlight {
  position: relative;
  isolation: isolate;
}

.pe-spotlight::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  opacity: var(--pe-spotlight-intensity, 0.45);
  background:
    radial-gradient(
      circle at var(--pe-spotlight-x, 50%) var(--pe-spotlight-y, 50%),
      color-mix(
          in srgb,
          var(--pe-spotlight-color, #7dd3fc) calc(var(--pe-spotlight-core-intensity, 0.58) * 100%),
          white
        )
        0%,
      color-mix(
          in srgb,
          var(--pe-spotlight-color, #7dd3fc) calc((0.48 + var(--pe-spotlight-core-intensity, 0.58) * 0.32) * 100%),
          white
        )
        calc(var(--pe-spotlight-size, 180px) * 0.14),
      color-mix(in srgb, var(--pe-spotlight-color, #7dd3fc) 38%, transparent) calc(var(--pe-spotlight-size, 180px) * 0.4),
      color-mix(in srgb, var(--pe-spotlight-color, #7dd3fc) 20%, transparent) var(--pe-spotlight-size, 180px),
      transparent calc(var(--pe-spotlight-size, 180px) * 1.45)
    ),
    radial-gradient(
      circle at var(--pe-spotlight-x, 50%) var(--pe-spotlight-y, 50%),
      color-mix(in srgb, var(--pe-spotlight-color, #7dd3fc) 16%, transparent) 0%,
      color-mix(in srgb, var(--pe-spotlight-color, #7dd3fc) 8%, transparent) calc(var(--pe-spotlight-size, 180px) * 1.2),
      transparent calc(var(--pe-spotlight-size, 180px) * 1.8)
    );
  mix-blend-mode: screen;
  filter: blur(calc(1px + var(--pe-spotlight-softness, 0.72) * 6px)) saturate(128%);
  transition: background 120ms ease-out, opacity 120ms ease-out;
}

@supports ((-webkit-mask-image: radial-gradient(white, black)) or (mask-image: radial-gradient(white, black))) {
  .pe-spotlight.pe-spotlight--reveal::before {
    opacity: var(--pe-spotlight-reveal-opacity, 0.92);
    background-image:
      var(
        --pe-spotlight-reveal-image,
        url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 220'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0%25' stop-color='%236d28d9'/%3E%3Cstop offset='52%25' stop-color='%230ea5e9'/%3E%3Cstop offset='100%25' stop-color='%2322d3ee'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='320' height='220' fill='url(%23g)'/%3E%3Ccircle cx='86' cy='74' r='52' fill='rgba(255,255,255,0.24)'/%3E%3Ccircle cx='252' cy='154' r='70' fill='rgba(255,255,255,0.14)'/%3E%3C/svg%3E")
      ),
      linear-gradient(var(--pe-spotlight-reveal-color, #38bdf8), var(--pe-spotlight-reveal-color, #38bdf8));
    background-size: var(--pe-spotlight-reveal-size, cover), cover;
    background-position: center;
    background-repeat: no-repeat;
    mix-blend-mode: normal;
    filter: saturate(120%);
    -webkit-mask-image: radial-gradient(
      circle at var(--pe-spotlight-x, 50%) var(--pe-spotlight-y, 50%),
      rgba(0, 0, 0, 1) 0,
      rgba(0, 0, 0, 1) calc(var(--pe-spotlight-size, 180px) * 0.36),
      rgba(0, 0, 0, 0.75) calc(var(--pe-spotlight-size, 180px) * 0.72),
      transparent calc(var(--pe-spotlight-size, 180px) * 1.22)
    );
    mask-image: radial-gradient(
      circle at var(--pe-spotlight-x, 50%) var(--pe-spotlight-y, 50%),
      rgba(0, 0, 0, 1) 0,
      rgba(0, 0, 0, 1) calc(var(--pe-spotlight-size, 180px) * 0.36),
      rgba(0, 0, 0, 0.75) calc(var(--pe-spotlight-size, 180px) * 0.72),
      transparent calc(var(--pe-spotlight-size, 180px) * 1.22)
    );
  }
}

@supports not (color: color-mix(in srgb, white, black)) {
  .pe-spotlight::before {
    background:
      radial-gradient(
        circle at var(--pe-spotlight-x, 50%) var(--pe-spotlight-y, 50%),
        rgba(255, 255, 255, 0.86) 0%,
        rgba(255, 255, 255, 0.56) calc(var(--pe-spotlight-size, 180px) * 0.14),
        rgba(255, 255, 255, 0.3) calc(var(--pe-spotlight-size, 180px) * 0.4),
        rgba(255, 255, 255, 0.16) var(--pe-spotlight-size, 180px),
        transparent calc(var(--pe-spotlight-size, 180px) * 1.45)
      ),
      radial-gradient(
        circle at var(--pe-spotlight-x, 50%) var(--pe-spotlight-y, 50%),
        rgba(255, 255, 255, 0.16) 0%,
        rgba(255, 255, 255, 0.08) calc(var(--pe-spotlight-size, 180px) * 1.2),
        transparent calc(var(--pe-spotlight-size, 180px) * 1.8)
      );
  }

  .pe-spotlight.pe-spotlight--reveal::before {
    background-image:
      var(--pe-spotlight-reveal-image, linear-gradient(135deg, rgba(109, 40, 217, 0.9), rgba(14, 165, 233, 0.95))),
      linear-gradient(var(--pe-spotlight-reveal-color, #38bdf8), var(--pe-spotlight-reveal-color, #38bdf8));
  }
}

@media (prefers-reduced-motion: reduce) {
  .pe-noise::after {
    opacity: calc(var(--pe-noise-opacity, 0.28) * 0.9);
  }
}
`;
