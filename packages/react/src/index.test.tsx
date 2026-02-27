import { fireEvent, render } from '@testing-library/react';
import React, { StrictMode, act, useState } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { renderToString } from 'react-dom/server';

import { useGlowEffect, useGradientBorderEffect, useNoiseEffect } from './index';

function GradientProbe(props: { thickness?: number }) {
  const ref = useGradientBorderEffect({ thickness: props.thickness ?? 3, colors: '#f00, #00f' });
  return <button ref={ref}>Test</button>;
}

function NoiseProbe() {
  const ref = useNoiseEffect({ intensity: 0.2 });
  return <div ref={ref}>Noise</div>;
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
});
