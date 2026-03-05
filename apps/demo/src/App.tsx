import {
  useGlowEffect,
  useGradientBorderEffect,
  useNoiseEffect,
  useSpotlightEffect,
} from '@protohiro/effects';
import { useMemo, useState, type CSSProperties, type RefCallback } from 'react';
import revealImageAsset from './assets/reveal.jpeg';

type DemoOption = string | number | boolean;
type DemoOptions = Record<string, DemoOption>;
type ControlType = 'text' | 'number' | 'range' | 'checkbox' | 'color' | 'select';
type PreviewElement = 'button' | 'div' | 'article';
type EffectHook = (options: DemoOptions) => RefCallback<HTMLElement>;

type DemoControl = {
  key: string;
  label: string;
  type: ControlType;
  selectOptions?: string[];
  min?: number;
  max?: number;
  step?: number;
};

type EffectStory = {
  id: string;
  title: string;
  description: string;
  hookName: string;
  componentName: string;
  previewText: string;
  previewElement: PreviewElement;
  previewStyle?: CSSProperties;
  hook: EffectHook;
  defaults: DemoOptions;
  controls: DemoControl[];
};

function useGradientStoryHook(options: DemoOptions): RefCallback<HTMLElement> {
  return useGradientBorderEffect(options);
}

function useGlowStoryHook(options: DemoOptions): RefCallback<HTMLElement> {
  return useGlowEffect(options);
}

function useNoiseStoryHook(options: DemoOptions): RefCallback<HTMLElement> {
  return useNoiseEffect(options);
}

function useSpotlightStoryHook(options: DemoOptions): RefCallback<HTMLElement> {
  return useSpotlightEffect(options);
}

const STORIES: EffectStory[] = [
  {
    id: 'gradient-border',
    title: 'Gradient Border',
    description: 'Border effect without extra wrappers.',
    hookName: 'useGradientBorderEffect',
    componentName: 'GradientBorderButton',
    previewText: 'Gradient Border Button',
    previewElement: 'button',
    previewStyle: {
      '--pe-bg-fill': '#020617',
      color: '#f8fafc',
    } as CSSProperties,
    hook: useGradientStoryHook,
    defaults: {
      thickness: 2,
      radius: 14,
      colors: '#f59e0b, #22d3ee, #a78bfa',
      angle: '135deg',
    },
    controls: [
      { key: 'thickness', label: 'Thickness', type: 'number', min: 1, max: 12, step: 1 },
      { key: 'radius', label: 'Radius', type: 'number', min: 0, max: 32, step: 1 },
      { key: 'angle', label: 'Angle', type: 'text' },
      { key: 'colors', label: 'Colors', type: 'text' },
      { key: 'disabled', label: 'Disabled', type: 'checkbox' },
    ],
  },
  {
    id: 'glow',
    title: 'Glow',
    description: 'Glow layer with no layout impact.',
    hookName: 'useGlowEffect',
    componentName: 'GlowCard',
    previewText: 'Glow Card',
    previewElement: 'div',
    hook: useGlowStoryHook,
    defaults: {
      color: '#1aaec1',
      blur: 30,
      spread: 3,
      opacity: 0.45,
    },
    controls: [
      { key: 'color', label: 'Color', type: 'color' },
      { key: 'blur', label: 'Blur', type: 'number', min: 0, max: 80, step: 1 },
      { key: 'spread', label: 'Spread', type: 'number', min: 0, max: 24, step: 1 },
      { key: 'opacity', label: 'Opacity', type: 'range', min: 0, max: 1, step: 0.01 },
      { key: 'disabled', label: 'Disabled', type: 'checkbox' },
    ],
  },
  {
    id: 'noise',
    title: 'Noise',
    description: 'Noise overlay with adjustable intensity.',
    hookName: 'useNoiseEffect',
    componentName: 'NoiseCard',
    previewText: 'Noise Effect',
    previewElement: 'article',
    previewStyle: {
      background: "linear-gradient(135deg, #f43f5e 0%, #2563eb 100%)",
      color: '#f8fafc',
    },
    hook: useNoiseStoryHook,
    defaults: {
      size: 100,
      intensity: 0.52,
    },
    controls: [
      { key: 'size', label: 'Size', type: 'number', min: 8, max: 240, step: 1 },
      { key: 'intensity', label: 'Intensity', type: 'range', min: 0, max: 1, step: 0.01 },
      { key: 'disabled', label: 'Disabled', type: 'checkbox' },
    ],
  },
  {
    id: 'spotlight',
    title: 'Spotlight',
    description: 'Interactive light cone with cinematic falloff and pointer tracking.',
    hookName: 'useSpotlightEffect',
    componentName: 'SpotlightCard',
    previewText: 'Move pointer across the card',
    previewElement: 'article',
    previewStyle: {
      background:
        'radial-gradient(circle at 8% 12%, rgba(99, 102, 241, 0.26), transparent 34%), radial-gradient(circle at 90% 82%, rgba(45, 212, 191, 0.12), transparent 42%), linear-gradient(150deg, #090617 0%, #0a1023 48%, #070b1a 100%)',
      color: '#f5f3ff',
      border: '1px solid rgba(129, 140, 248, 0.32)',
      boxShadow:
        'inset 0 1px 0 rgba(255, 255, 255, 0.1), inset 0 -24px 45px rgba(12, 8, 35, 0.42), 0 24px 70px rgba(3, 6, 19, 0.58)',
    },
    hook: useSpotlightStoryHook,
    defaults: {
      mode: 'reveal',
      color: '#2a2079',
      size: 50,
      intensity: 0.3,
      softness: 0.9,
      coreIntensity: 0.35,
      x: 36,
      y: 32,
      followPointer: true,
      revealColor: '#38bdf8',
      revealImage: revealImageAsset,
      revealOpacity: 0.9,
    },
    controls: [
      { key: 'mode', label: 'Mode', type: 'select', selectOptions: ['reveal', 'glow'] },
      { key: 'color', label: 'Color', type: 'color' },
      { key: 'size', label: 'Size', type: 'number', min: 0, max: 280, step: 1 },
      { key: 'intensity', label: 'Intensity', type: 'range', min: 0, max: 1, step: 0.01 },
      { key: 'softness', label: 'Softness', type: 'range', min: 0, max: 1, step: 0.01 },
      { key: 'coreIntensity', label: 'Core intensity', type: 'range', min: 0, max: 1, step: 0.01 },
      { key: 'revealColor', label: 'Reveal color', type: 'color' },
      { key: 'revealOpacity', label: 'Reveal opacity', type: 'range', min: 0, max: 1, step: 0.01 },
      { key: 'x', label: 'X', type: 'range', min: 0, max: 100, step: 1 },
      { key: 'y', label: 'Y', type: 'range', min: 0, max: 100, step: 1 },
      { key: 'followPointer', label: 'Follow pointer', type: 'checkbox' },
      { key: 'disabled', label: 'Disabled', type: 'checkbox' },
    ],
  },
];

function formatOptionValue(value: DemoOption): string {
  if (typeof value === 'string') {
    return JSON.stringify(value);
  }

  return String(value);
}

function createHookSnippet(story: EffectStory, options: DemoOptions): string {
  const optionLines = Object.entries(options)
    .filter(([key, value]) => !(key === 'disabled' && value === false))
    .map(([key, value]) => `    ${key}: ${formatOptionValue(value)},`);

  const optionsCode =
    optionLines.length > 0
      ? `{\n${optionLines.join('\n')}\n  }`
      : '{}';

  return `import { ${story.hookName} } from '@protohiro/effects';

export function ${story.componentName}() {
  const ref = ${story.hookName}(${optionsCode});

  return <${story.previewElement} ref={ref}>${story.previewText}</${story.previewElement}>;
}`;
}

function EffectPlayground({ story }: { story: EffectStory }) {
  const [options, setOptions] = useState<DemoOptions>(story.defaults);
  const useEffectHook = story.hook;
  const ref = useEffectHook(options);
  const PreviewTag = story.previewElement;
  const previewClassName = story.id === 'spotlight' ? 'demo-card demo-card-spotlight' : 'demo-card';
  const hookSnippet = useMemo(() => createHookSnippet(story, options), [options, story]);

  const controls = useMemo(
    () =>
      story.controls.map((control) => {
        const value = options[control.key];
        const inputId = `${story.id}-${control.key}`;

        if (control.type === 'checkbox') {
          return (
            <label key={control.key} className="demo-control demo-control-toggle" htmlFor={inputId}>
              <span>{control.label}</span>
              <input
                id={inputId}
                type="checkbox"
                checked={Boolean(value)}
                onChange={(event) => {
                  setOptions((current) => ({
                    ...current,
                    [control.key]: event.target.checked,
                  }));
                }}
              />
            </label>
          );
        }

        if (control.type === 'select') {
          return (
            <label key={control.key} className="demo-control" htmlFor={inputId}>
              <span>{control.label}</span>
              <select
                id={inputId}
                value={String(value ?? '')}
                onChange={(event) => {
                  setOptions((current) => ({
                    ...current,
                    [control.key]: event.target.value,
                  }));
                }}
              >
                {(control.selectOptions ?? []).map((optionValue) => (
                  <option key={optionValue} value={optionValue}>
                    {optionValue}
                  </option>
                ))}
              </select>
            </label>
          );
        }

        return (
          <label key={control.key} className="demo-control" htmlFor={inputId}>
            <span>{control.label}</span>
            <input
              id={inputId}
              type={control.type}
              min={control.min}
              max={control.max}
              step={control.step}
              value={String(value ?? '')}
              onChange={(event) => {
                const nextValue =
                  control.type === 'number' || control.type === 'range'
                    ? Number(event.target.value)
                    : event.target.value;

                setOptions((current) => ({
                  ...current,
                  [control.key]: nextValue,
                }));
              }}
            />
          </label>
        );
      }),
    [options, story.controls, story.id],
  );

  return (
    <section className="demo-row">
      <div className="demo-preview-pane">
        <header className="demo-panel-header">
          <div className="demo-title-row">
            <h2>{story.title}</h2>
            <code>{story.hookName}</code>
          </div>
          <p>{story.description}</p>
        </header>
        <div className="demo-preview">
          <PreviewTag ref={ref} className={previewClassName} style={story.previewStyle}>
            {story.previewText}
          </PreviewTag>
        </div>
      </div>
      <div className="demo-controls-pane">
        <div className="demo-controls">{controls}</div>
        <button
          type="button"
          className="demo-reset"
          onClick={() => {
            setOptions({ ...story.defaults });
          }}
        >
          Reset
        </button>
        <section className="demo-dev-notes" aria-label={`${story.title} developer usage`}>
          <h3>Live snippet</h3>
          <pre>
            <code>{hookSnippet}</code>
          </pre>
        </section>
      </div>
    </section>
  );
}

export function App() {
  return (
    <main className="demo-page">
      <header className="demo-hero">
        <h1>Protohiro Effects Playground</h1>
        <p>
          Pick an effect hook, tune its options in real time, then copy the generated snippet into your
          component. This demo shows implementation details, not only visuals.
        </p>
        <div className="demo-badges" aria-label="developer highlights">
          <span className="demo-badge">No extra DOM nodes</span>
          <span className="demo-badge">Ref-based hooks</span>
          <span className="demo-badge">CSS variables only</span>
        </div>
      </header>
      <section className="demo-usage">
        <h2>How to use Protohiro Effects</h2>
        <ol>
          <li>
            Install package: <code>pnpm add @protohiro/effects</code>
          </li>
          <li>Use an effect hook inside your component and pass semantic options.</li>
          <li>Attach returned ref to your existing element (no wrapper, no layout hacks).</li>
        </ol>
      </section>

      <section className="demo-grid">
        {STORIES.map((story) => (
          <EffectPlayground key={story.id} story={story} />
        ))}
      </section>
    </main>
  );
}
