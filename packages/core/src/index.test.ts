import { applyCssVars, applyEffectClass, ensureGlobalStyle, mergeRefs } from './index';

describe('ensureGlobalStyle', () => {
  it('injects style only once per id', () => {
    ensureGlobalStyle('pe-test', '.pe-test{color:red;}');
    ensureGlobalStyle('pe-test', '.pe-test{color:red;}');

    const nodes = document.head.querySelectorAll('style[data-protohiro-effects-style="pe-test"]');
    expect(nodes).toHaveLength(1);
  });
});

describe('applyEffectClass', () => {
  it('removes class on cleanup when class was absent', () => {
    const el = document.createElement('div');
    const cleanup = applyEffectClass(el, 'pe-glow');

    expect(el.classList.contains('pe-glow')).toBe(true);
    cleanup();
    expect(el.classList.contains('pe-glow')).toBe(false);
  });

  it('keeps pre-existing class on cleanup', () => {
    const el = document.createElement('div');
    el.classList.add('pe-glow');

    const cleanup = applyEffectClass(el, 'pe-glow');
    cleanup();

    expect(el.classList.contains('pe-glow')).toBe(true);
  });
});

describe('applyCssVars', () => {
  it('restores previous inline style values', () => {
    const el = document.createElement('div');
    el.style.setProperty('--pe-test', '10px');

    const cleanup = applyCssVars(el, {
      '--pe-test': '20px',
      '--pe-new': '1',
    });

    expect(el.style.getPropertyValue('--pe-test')).toBe('20px');
    expect(el.style.getPropertyValue('--pe-new')).toBe('1');

    cleanup();

    expect(el.style.getPropertyValue('--pe-test')).toBe('10px');
    expect(el.style.getPropertyValue('--pe-new')).toBe('');
  });
});

describe('mergeRefs', () => {
  it('updates object and callback refs', () => {
    const objectRef: { current: HTMLDivElement | null } = { current: null };
    const callback = vi.fn();
    const node = document.createElement('div');

    mergeRefs(objectRef, callback)(node);

    expect(objectRef.current).toBe(node);
    expect(callback).toHaveBeenCalledWith(node);
  });
});
