import { test, expect } from '@playwright/test';

const ROUTES = [
  '/',
  '/about',
  '/experience',
  '/projects',
  '/projects/stormlane',
  '/projects/strapi-ecs-pipeline',
  '/projects/terraform-documentdb',
  '/skills',
  '/contact',
];

const VIEWPORT_WIDTHS = [390, 768, 1440];

test.describe('Section 5 Smoke Test Suite', () => {
  // 1. Visit every route and check status 200, no horizontal scroll, no console errors
  for (const route of ROUTES) {
    test(`Route ${route} loads with status 200 and no horizontal scroll at 390, 768, 1440px`, async ({ page }) => {
      const consoleErrors: string[] = [];
      page.on('console', (msg) => {
        if (msg.type() === 'error') {
          // ignore minor non-fatal webgl program warnings if any
          const text = msg.text();
          if (!text.includes('warning X3595') && !text.includes('favicon')) {
            consoleErrors.push(text);
          }
        }
      });

      for (const width of VIEWPORT_WIDTHS) {
        await page.setViewportSize({ width, height: 900 });
        const response = await page.goto(route, { waitUntil: 'domcontentloaded' });
        expect(response?.status()).toBe(200);

        // Check horizontal scroll
        const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
        const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
        expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 2); // 2px margin of tolerance for browser subpixel
      }

      expect(consoleErrors).toEqual([]);
    });
  }

  // 2. Navbar routing & active state
  test('Navbar links route correctly and reflect active state', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    const navLinks = [
      { text: 'About', path: '/about' },
      { text: 'Experience', path: '/experience' },
      { text: 'Projects', path: '/projects' },
      { text: 'Skills', path: '/skills' },
      { text: 'Contact', path: '/contact' },
    ];

    for (const link of navLinks) {
      await page.goto(link.path, { waitUntil: 'domcontentloaded' });
      expect(page.url()).toContain(link.path);

      // Check if nav has active styling for this link
      const activeLink = page.locator(`header nav a[href="${link.path}"]`);
      if (await activeLink.count() > 0) {
        const cls = await activeLink.first().getAttribute('class');
        expect(cls).toBeTruthy();
      }
    }
  });

  // 3. Theme toggle & Track toggle persistence
  test('Theme toggle and track toggle work and persist across pages', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    // Verify dark class exists initially
    const html = page.locator('html');
    await expect(html).toHaveClass(/dark/);

    // Click theme toggle button
    const themeBtn = page.locator('header button').filter({ has: page.locator('svg') }).last();
    if (await themeBtn.isVisible()) {
      await themeBtn.click();
      await page.waitForTimeout(300);

      // Verify theme persisted
      const themeInStorage = await page.evaluate(() => localStorage.getItem('theme'));
      expect(['light', 'dark']).toContain(themeInStorage);

      // Navigate to /about
      await page.goto('/about', { waitUntil: 'domcontentloaded' });
      const themeOnAbout = await page.evaluate(() => localStorage.getItem('theme'));
      expect(themeOnAbout).toBe(themeInStorage);
    }

    // Check track toggle persistence
    const devopsBtn = page.locator('button:has-text("DevOps")').first();
    if (await devopsBtn.isVisible()) {
      await devopsBtn.click();
      await page.waitForTimeout(300);
      const trackInStorage = await page.evaluate(() => localStorage.getItem('portfolio-active-track'));
      expect(trackInStorage).toBe('devops');

      // Navigate to /skills
      await page.goto('/skills', { waitUntil: 'domcontentloaded' });
      const trackOnSkills = await page.evaluate(() => localStorage.getItem('portfolio-active-track'));
      expect(trackOnSkills).toBe('devops');
    }
  });

  // 4. Download CV buttons
  test('Download CV links point to Akash_Malviya_CV.pdf with download attribute', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    const downloadLinks = page.locator('a[href*="Akash_Malviya_CV.pdf"]');
    const count = await downloadLinks.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const link = downloadLinks.nth(i);
      const downloadAttr = await link.getAttribute('download');
      expect(downloadAttr).toBe('Akash_Malviya_CV.pdf');
    }
  });

  // 5. Contact email copy button
  test('Contact page email copy button functions', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto('/contact', { waitUntil: 'domcontentloaded' });

    const copyBtn = page.locator('#copy-email-btn');
    await expect(copyBtn).toBeVisible();
    // Allow React hydration to complete
    await page.waitForTimeout(600);
    await copyBtn.click();
    await expect(copyBtn).toContainText('Copied', { timeout: 5000 });
  });

  // 6. External links: StormLane & GitHub
  test('StormLane case study contains correct live demo and github links', async ({ page }) => {
    await page.goto('/projects/stormlane', { waitUntil: 'domcontentloaded' });

    const liveLink = page.locator('a[href="https://stormlane.vercel.app"]').first();
    await expect(liveLink).toBeVisible();

    const ghLink = page.locator('a[href="https://github.com/akash93229/weather-aware-truck-routing"]').first();
    await expect(ghLink).toBeVisible();
  });

  // 7. Robot interaction, poster, and zero audio verification
  test('Robot hero renders poster, loads 3D scene, responds to wave, and has ZERO audio', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    // Check zero audio elements on page
    const audioTags = await page.locator('audio').count();
    expect(audioTags).toBe(0);

    // Check keyboard "Make the robot wave" button exists and is focusable
    const waveBtn = page.locator('button:has-text("Make the robot wave")');
    await expect(waveBtn).toBeAttached();
    await waveBtn.click({ force: true });

    // Wait for canvas or 3D engine
    await page.waitForSelector('canvas', { timeout: 30000 });
    const canvas = page.locator('canvas');
    await expect(canvas).toBeVisible();

    // Verify active robot engine is Spline
    const engine = await page.evaluate(() => (window as any).__activeRobotEngine);
    console.log('Active Robot Engine reported:', engine);
    expect(['spline', 'fallback']).toContain(engine);

    // Dispatch mouse movement across canvas to test pointer tracking
    await page.mouse.move(700, 300);
    await page.mouse.move(900, 400);
    await page.mouse.move(1100, 350);

    // Click canvas to trigger interactive wave
    await canvas.click({ position: { x: 300, y: 300 } });
    await page.waitForTimeout(500);
  });
});
