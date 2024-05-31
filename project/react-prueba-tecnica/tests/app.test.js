import { test, expect } from '@playwright/test';

const mockCatFact = "Cats use their whiskers to detect if they can fit through a space.";
const mockImageUrl = "https://cataas.com/cat/says/Cats%20use%20their?size=50&color=red";

test.describe('App', () => {
  test.beforeEach(async ({ page }) => {
    // Mock fetch API response
    await page.route('https://catfact.ninja/fact', (route) =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ fact: mockCatFact }),
      })
    );

    // Mock the image URL generation in useCatImage hook
    await page.route('https://cataas.com/cat/says/*', (route) =>
      route.fulfill({
        status: 200,
        body: Buffer.from(mockImageUrl), // mock the image response
      })
    );

    // Navigate to the app
    await page.goto('http://localhost:5173'); // ajusta la URL si es necesario
  });

  test('renders initial cat fact and image', async ({ page }) => {
    // Verify that the fact and image are rendered correctly
    await expect(page.locator('text=Cargando imagen...')).toBeVisible();

    await expect(page.locator('text=' + mockCatFact)).toBeVisible();
    const image = page.locator('img');
    await expect(image).toHaveAttribute('src', mockImageUrl);
  });

  test('fetches and displays new cat fact and image on button click', async ({ page }) => {
    // Click the button to fetch new data
    await page.click('text=Nuevos Datos');

    // Verify that the fact and image are updated
    await expect(page.locator('text=' + mockCatFact)).toBeVisible();
    const image = page.locator('img');
    await expect(image).toHaveAttribute('src', mockImageUrl);
  });

  test('displays error message on fetch failure', async ({ page }) => {
    // Mock fetch API to return an error
    await page.route('https://catfact.ninja/fact', (route) =>
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Internal Server Error' }),
      })
    );

    // Click the button to fetch new data
    await page.click('text=Nuevos Datos');

    // Verify that the error message is displayed
    await expect(page.locator('text=No se ha podido recuperar la cita')).toBeVisible();
  });
});
