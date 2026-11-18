import { test, expect } from '@playwright/test';

test.describe('Realistic Cinematic Smoke Entrance Suite', () => {
  // Test 1: Complete entrance sequence (loading, movement, reveal, dissipation, completion)
  test('Complete entrance sequence executes naturally from movement to dissipation and returns to website', async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        const text = msg.text();
        if (!text.includes('favicon') && !text.includes('warning X3595')) {
          consoleErrors.push(text);
        }
      }
    });

    // 1. Visit homepage
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    // Entrance container should be present initially
    const entrance = page.locator('#cinematic-smoke-entrance');
    await expect(entrance).toBeAttached();

    // Verify stage starts at 'movement' or 'loading'
    const initialStage = await page.evaluate(() => (window as any).__smokeEntranceStage);
    expect(['movement', 'reveal']).toContain(initialStage);

    // Skip button should be present and visible
    const skipBtn = page.locator('button:has-text("Skip")');
    await expect(skipBtn).toBeVisible();

    // Verify ZERO audio tags
    const audioTags = await page.locator('audio').count();
    expect(audioTags).toBe(0);

    // 2. Wait for reveal phase (around 1.8s - 2.5s)
    await page.waitForTimeout(2000);
    const revealStage = await page.evaluate(() => (window as any).__smokeEntranceStage);
    expect(['reveal', 'dissipation', 'completed']).toContain(revealStage);

    // 3. Wait for full dissipation and return to original website (around 4.2s)
    await page.waitForTimeout(2500);

    // Entrance should be completed and unmounted from DOM
    const isCompleted = await page.evaluate(() => (window as any).__smokeEntranceStage === 'completed');
    expect(isCompleted).toBe(true);
    await expect(entrance).not.toBeAttached();

    // Verify the original website elements are fully interactive
    const viewWorkBtn = page.locator('a:has-text("View work")').first();
    await expect(viewWorkBtn).toBeVisible();

    const downloadCvBtn = page.locator('a:has-text("Download CV")').first();
    await expect(downloadCvBtn).toBeVisible();

    // Verify no console errors
    expect(consoleErrors).toEqual([]);
  });

  // Test 2: Skip button bypasses entrance immediately
  test('Skip button immediately terminates entrance and persists in sessionStorage', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    const skipBtn = page.locator('button:has-text("Skip")');
    await expect(skipBtn).toBeVisible();

    // Click skip
    await skipBtn.click();
    await page.waitForTimeout(450);

    // Entrance must be unmounted
    const entrance = page.locator('#cinematic-smoke-entrance');
    await expect(entrance).not.toBeAttached();

    // Verify sessionStorage has saved the seen flag
    const seen = await page.evaluate(() => sessionStorage.getItem('portfolio_smoke_entrance_seen'));
    expect(seen).toBe('true');
  });

  // Test 3: Escape key skips entrance
  test('Pressing Escape key skips the cinematic entrance', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    const entrance = page.locator('#cinematic-smoke-entrance');
    await expect(entrance).toBeAttached();

    // Wait for component to mount and attach keydown listener
    const skipBtn = page.locator('button:has-text("Skip")');
    await expect(skipBtn).toBeVisible({ timeout: 5000 });

    // Press Escape
    await page.keyboard.press('Escape');
    await page.waitForTimeout(500);

    await expect(entrance).not.toBeAttached();
  });

  // Test 4: Does not replay unexpectedly when navigating between sections
  test('Entrance does not replay unexpectedly when navigating between sections', async ({ page }) => {
    // 1. Visit homepage and wait for skip button to mount, then skip
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    const skipBtn = page.locator('button:has-text("Skip")');
    await expect(skipBtn).toBeVisible({ timeout: 5000 });
    await skipBtn.click();
    await page.waitForTimeout(450);

    const entrance = page.locator('#cinematic-smoke-entrance');
    await expect(entrance).not.toBeAttached();

    // Verify sessionStorage recorded seen state
    const seen = await page.evaluate(() => sessionStorage.getItem('portfolio_smoke_entrance_seen'));
    expect(seen).toBe('true');

    // 2. Client-side navigation via Navbar link to /about
    const aboutLink = page.locator('header nav a[href="/about"]').first();
    if (await aboutLink.isVisible()) {
      await aboutLink.click();
    } else {
      await page.goto('/about', { waitUntil: 'domcontentloaded' });
    }
    await page.waitForTimeout(300);
    const entranceOnAbout = page.locator('#cinematic-smoke-entrance');
    await expect(entranceOnAbout).not.toBeAttached();

    // 3. Navigate back to / (homepage) via Navbar brand/logo
    const brandLink = page.locator('header a[href="/"]').first();
    if (await brandLink.isVisible()) {
      await brandLink.click();
    } else {
      await page.goto('/', { waitUntil: 'domcontentloaded' });
    }
    await page.waitForTimeout(300);

    // Entrance must NOT replay on return to homepage
    const entranceOnReturn = page.locator('#cinematic-smoke-entrance');
    await expect(entranceOnReturn).not.toBeAttached();
  });

  // Test 5: Mobile viewport layout (390px)
  test('Mobile viewport (390px) displays entrance properly with no horizontal scroll', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    // Check no horizontal scroll
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 2);

    // Skip button accessible on mobile
    const skipBtn = page.locator('button:has-text("Skip")');
    await expect(skipBtn).toBeVisible();
    await skipBtn.click();
    await page.waitForTimeout(450);

    // Website renders cleanly on mobile
    const heroHeading = page.locator('h1');
    await expect(heroHeading).toBeVisible();
  });

  // Test 6: Verify specified elements are removed and entrance triggers on refresh
  test('Replay Smoke button and telemetry text are removed, and entrance triggers automatically on refresh', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    // 1. Verify 'AKASH MALVIYA // INTERACTIVE PORTFOLIO' text is completely removed
    const telemetryText = page.locator('text="AKASH MALVIYA // INTERACTIVE PORTFOLIO"');
    await expect(telemetryText).toHaveCount(0);

    // 2. Wait for dissipation or skip to inspect hero CTAs
    const skipBtn = page.locator('button:has-text("Skip")');
    await expect(skipBtn).toBeVisible({ timeout: 5000 });
    await skipBtn.click();
    await page.waitForTimeout(450);

    // 3. Verify Replay Smoke button is completely removed
    const replayBtn = page.locator('button:has-text("Replay Smoke")');
    await expect(replayBtn).toHaveCount(0);

    // 4. Verify existing CTAs (View work & Download CV) are present and intact
    const viewWork = page.locator('a:has-text("View work")').first();
    await expect(viewWork).toBeVisible();
    const downloadCv = page.locator('a:has-text("Download CV")').first();
    await expect(downloadCv).toBeVisible();

    // 5. Browser refresh automatically restarts the smoke entrance
    await page.reload({ waitUntil: 'domcontentloaded' });
    const freshEntrance = page.locator('#cinematic-smoke-entrance');
    await expect(freshEntrance).toBeAttached();
  });
});
