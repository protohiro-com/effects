# Contributing

## Branching

Use `codex/<lane>-<task>` branch names.

## PR lane guidance

Keep PRs single-lane:
- infra/core
- single effect
- tests/visuals
- docs/demo

## Definition of done

Every PR must include:
- green CI
- before/after screenshots
- browser test notes (Chrome/Firefox/Safari/Edge)
- bundle/performance impact note
- updated docs for API and variables

## Merge order

1. infra
2. core runtime
3. effects
4. visual tests
5. docs/demo
6. release
