# ProtoEffects – AGENTS.md

## Mission

ProtoEffects builds a React library for hard CSS effects (for example: `gradient-border`, glow ring, noise overlays, sheen, spotlight) without wrappers and without layout hacks.

Core rules:
- no extra DOM nodes
- no layout shifts
- no runtime layout measurements
- CSS-first, variables-driven
- composable effects

Every effect MUST:
- work on a single existing element
- preserve forwarded refs
- support SSR + hydration
- mutate only `classList` and CSS custom properties
- clean up classes/variables on unmount

---

## Architecture Rules

1. Effects are hooks, never wrapper components.
2. Hook output is a `ref` (or ref merger helper), never JSX.
3. Global CSS for an effect is injected once per app lifetime.
4. Runtime options map to CSS variables only.
5. No JS animation loops for MVP (`requestAnimationFrame` disallowed unless explicitly approved).
6. No `ResizeObserver` unless an effect is impossible without geometry tracking.
7. Avoid forced sync layout (`offset*`, `getBoundingClientRect`) in render/update paths.
8. Do not break existing user `className`, `style`, or `data-*` attributes.

---

## Effect Contract

Each effect must define:
- a unique class namespace (`pe-<effect>`)
- documented CSS variables (`--pe-...`)
- defaults that produce a visible but non-invasive output
- cleanup logic for removed variables/classes
- fallback behavior for unsupported CSS features

Canonical structure:

`useXEffect(options)`:
1. create/receive target ref
2. ensure global CSS is present
3. attach effect class
4. set effect variables from options
5. cleanup on unmount/options change
6. return ref

---

## CSS Constraints

- Respect `border-radius: inherit` or equivalent visual clipping.
- Must work in light and dark themes.
- Must not require parent wrappers.
- Must not require arbitrary `z-index` changes unless documented.
- Max one pseudo-element per effect (`::before` or `::after`) for MVP.
- Prefer `@supports` guards for advanced features (`mask-composite`, `conic-gradient`, etc.).
- If an effect cannot fully degrade, fail gracefully (no broken visuals, no hidden content).

---

## Browser Targets

- Chrome: latest 2
- Firefox: latest 2
- Safari: latest 2
- Edge: latest 2

Safari policy:
- add fallback path when behavior differs
- document exact limitation and affected versions
- include visual baseline screenshot for fallback mode

---

## API Design Guidelines

- Option names are semantic (`thickness`, `radiusMode`, `intensity`, `speed`), not implementation-specific.
- Expose safe defaults; avoid required options unless essential.
- Accept token-friendly values (string/number where reasonable).
- Avoid options that require element measurement for interpretation.
- Keep hook signatures stable and additive.

---

## Testing Matrix (Required Per Effect)

Run visual + behavior checks on:
- `button`
- `div`
- card-like component with padding + radius
- element inside `display: flex`
- element inside `display: grid`
- element with `overflow: hidden`
- element with `transform`
- element with existing pseudo-element styles
- SSR render + hydration

Minimum assertions:
- class attached/removed correctly
- CSS variables updated on option change
- no hydration mismatch warnings
- no console errors in Strict Mode

---

## Performance Budget

- One global style injection per effect package load.
- No layout recalculation loops.
- No forced reflow in hot paths.
- No per-frame JS work for visual animation in MVP.
- Bundle increase per new effect should stay within ~1 kB gzip unless justified.

---

## PR Acceptance Checklist

Each PR adding/changing an effect must include:
- demo usage (`button`, `card`, dark mode example)
- before/after screenshots (including Safari fallback when applicable)
- browser test notes (Chrome/Firefox/Safari/Edge)
- SSR/hydration verification note
- brief performance note (what changed, why it is safe)
- docs for options + CSS variables + known limitations

---

## Roadmap

- layered/composed effects
- preset packs
- optional motion variants
- theme-driven APIs
- potential framework adapters beyond React

---

## Non-Goals

- not a component library
- not a Tailwind replacement
- not a CSS framework
- not a canvas/WebGL renderer (for now)
