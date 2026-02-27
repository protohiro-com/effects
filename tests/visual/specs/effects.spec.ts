import { expect, test } from '@playwright/test';

test('button/div/card visual baseline', async ({ page }) => {
  await page.goto('/');
  const grid = page.locator('.demo-grid');
  const buffer = await grid.screenshot();
  expect(buffer.byteLength).toBeGreaterThan(1024);
});

test('flex and transformed probes', async ({ page }) => {
  await page.goto('/');

  await page.evaluate(() => {
    const cards = document.querySelectorAll('.demo-card');
    if (cards[1]) {
      (cards[1] as HTMLElement).style.transform = 'rotate(-1.5deg)';
    }
    if (cards[2]) {
      (cards[2] as HTMLElement).style.overflow = 'hidden';
    }
  });

  const section = page.locator('.demo-grid');
  const buffer = await section.screenshot();
  expect(buffer.byteLength).toBeGreaterThan(1024);
});
