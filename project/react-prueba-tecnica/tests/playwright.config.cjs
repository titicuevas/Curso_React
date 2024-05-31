const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  use: {
    headless: true, // Puede ser true o false dependiendo si quieres ver el navegador en acción o no.
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
    baseURL: 'http://localhost:5173', // Asegúrate de que esta sea la URL correcta para tu servidor de desarrollo
  },
});
