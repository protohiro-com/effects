import { fireEvent, render } from '@testing-library/react';
import React, { StrictMode, act, useState } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { renderToString } from 'react-dom/server';

import { useGlowEffect, useGradientBorderEffect, useNoiseEffect, useSpotlightEffect } from './index';

function GradientProbe(props: { thickness?: number }) {
  const ref = useGradientBorderEffect({ thickness: props.thickness ?? 3, colors: '#f00, #00f' });
  return <button ref={ref}>Test</button>;
}

function NoiseProbe() {
  const ref = useNoiseEffect({ intensity: 0.2 });
  return <div ref={ref}>Noise</div>;
}

function SpotlightProbe(props: {
  followPointer?: boolean;
  x?: number;
  y?: number;
  mode?: 'glow' | 'reveal';
  revealColor?: string;
}) {
  const ref = useSpotlightEffect({
    followPointer: props.followPointer,
    x: props.x ?? 25,
    y: props.y ?? 40,
    mode: props.mode,
    revealColor: props.revealColor,
    intensity: 0.4,
  });
  return <div ref={ref}>Spotlight</div>;
}

function ComposedProbe() {
  const gradientRef = useGradientBorderEffect({ thickness: 2 });
  const glowRef = useGlowEffect({ opacity: 0.5 });

  return (
    <button
      ref={(node) => {
        gradientRef(node);
        glowRef(node);
      }}
      className="existing"
      style={{ color: 'red' }}
    >
      Combo
    </button>
  );
}

describe('react effect hooks', () => {
  it('attaches and detaches class and vars', () => {
    const { container, unmount } = render(<GradientProbe thickness={4} />);
    const button = container.querySelector('button');

    expect(button).not.toBeNull();
    expect(button?.classList.contains('pe-gradient-border')).toBe(true);
    expect(button?.style.getPropertyValue('--pe-gb-thickness')).toBe('4px');

    unmount();

    expect(button?.classList.contains('pe-gradient-border')).toBe(false);
    expect(button?.style.getPropertyValue('--pe-gb-thickness')).toBe('');
  });

  it('updates css vars on options change', () => {
    function Probe() {
      const [opacity, setOpacity] = useState(0.2);
      const ref = useGlowEffect({ opacity, color: '#00f' });

      return (
        <>
          <div ref={ref}>Glow</div>
          <button onClick={() => setOpacity(0.8)}>Update</button>
        </>
      );
    }

    const { container, getByRole } = render(<Probe />);
    const div = container.querySelector('div');

    expect(div?.style.getPropertyValue('--pe-glow-opacity')).toBe('0.2');
    fireEvent.click(getByRole('button'));
    expect(div?.style.getPropertyValue('--pe-glow-opacity')).toBe('0.8');
  });

  it('works without strict mode console errors', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => undefined);

    render(
      <StrictMode>
        <NoiseProbe />
      </StrictMode>,
    );

    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });

  it('passes SSR + hydration smoke test', () => {
    const html = renderToString(<GradientProbe thickness={2} />);
    const host = document.createElement('div');
    host.innerHTML = html;

    expect(() =>
      act(() => {
        hydrateRoot(host, <GradientProbe thickness={2} />);
      }),
    ).not.toThrow();
  });

  it('keeps existing className/style and allows composed effects', () => {
    const { container } = render(<ComposedProbe />);
    const button = container.querySelector('button');

    expect(button?.classList.contains('existing')).toBe(true);
    expect(button?.classList.contains('pe-gradient-border')).toBe(true);
    expect(button?.classList.contains('pe-glow')).toBe(true);
    expect(button?.style.color).toBe('red');
  });

  it('attaches spotlight class and vars', () => {
    const { container, unmount } = render(<SpotlightProbe x={20} y={60} />);
    const div = container.querySelector('div');

    expect(div).not.toBeNull();
    expect(div?.classList.contains('pe-spotlight')).toBe(true);
    expect(div?.style.getPropertyValue('--pe-spotlight-x')).toBe('20%');
    expect(div?.style.getPropertyValue('--pe-spotlight-y')).toBe('60%');

    unmount();

    expect(div?.classList.contains('pe-spotlight')).toBe(false);
    expect(div?.style.getPropertyValue('--pe-spotlight-x')).toBe('');
    expect(div?.style.getPropertyValue('--pe-spotlight-y')).toBe('');
  });

  it('updates spotlight position on pointer move and keeps last position on leave', () => {
    const { container } = render(<SpotlightProbe followPointer x={30} y={45} />);
    const div = container.querySelector('div');

    expect(div).not.toBeNull();
    if (!div) {
      return;
    }

    const moveEvent = new Event('pointermove', { bubbles: true });
    Object.defineProperty(moveEvent, 'offsetX', { value: 12 });
    Object.defineProperty(moveEvent, 'offsetY', { value: 26 });
    div.dispatchEvent(moveEvent);

    expect(div.style.getPropertyValue('--pe-spotlight-x')).toBe('12px');
    expect(div.style.getPropertyValue('--pe-spotlight-y')).toBe('26px');

    div.dispatchEvent(new Event('pointerleave', { bubbles: true }));

    expect(div.style.getPropertyValue('--pe-spotlight-x')).toBe('12px');
    expect(div.style.getPropertyValue('--pe-spotlight-y')).toBe('26px');
  });

  it('supports reveal mode class and reveal vars', () => {
    const { container, unmount } = render(<SpotlightProbe mode="reveal" revealColor="#4f46e5" />);
    const div = container.querySelector('div');

    expect(div).not.toBeNull();
    expect(div?.classList.contains('pe-spotlight')).toBe(true);
    expect(div?.classList.contains('pe-spotlight--reveal')).toBe(true);
    expect(div?.style.getPropertyValue('--pe-spotlight-reveal-color')).toBe('#4f46e5');

    unmount();

    expect(div?.classList.contains('pe-spotlight--reveal')).toBe(false);
    expect(div?.style.getPropertyValue('--pe-spotlight-reveal-color')).toBe('');
  });
});
