import { test, expect } from '@playwright/test';

test.describe("testing the home page", () => {
  test.beforeEach(async ({ page }) => {
    // Access the main page
    await page.goto("");
  });

  test("main page can be accessed", async ({ page }) => {
    // Assert the main title is visible
    await expect(page).toHaveTitle(/pokédex next/i);
  });

  test("the info and instructions section is rendered", async ({ page }) => {
    // Assert the main section is present within the home page
    await expect(page.getByText(/built with next.js and tailwind css./i)).toBeVisible();
    await expect(page.getByText(/features:/i)).toBeVisible();
    await expect(page.getByText(/pokémon info:/i)).toBeVisible();
  });

  test.describe("testing the navigation bar", () => {
    test("the navigation bar is visible", async ({ page }) => {
      // Assert the navigation links are visible
      await expect(page.getByRole("link", { name: /home/i })).toBeVisible();
      await expect(page.getByRole("link", { name: /gen i \(kanto\)/i })).toBeVisible();
      await expect(page.getByRole("link", { name: /gen ii \(johto\)/i })).toBeVisible();
      await expect(page.getByRole("link", { name: /gen iii \(hoenn\)/i })).toBeVisible();
      await expect(page.getByRole("link", { name: /gen iv \(sinnoh\)/i })).toBeVisible();
    });

    test("the nav bar works", async ({ page }) => {
      // Click on a nav bar link
      await page.getByRole("link", { name: /gen i \(kanto\)/i }).click();

      // Assert the URL matches the respective Pokémon generation selected
      await expect(page).toHaveURL(/kanto/);

      // Confirm the correct current page title is visible
      await expect(page).toHaveTitle(/kanto pokédex/i);

      // Return to the main page
      await page.getByRole("link", { name: /home/i }).click();

      // Assert the home page title is visible
      await expect(page).toHaveTitle(/pokédex next/i);
    });

    test("the nav bar should be visible on the Pokémon list pages", async ({ page }) => {
      // Navigate to a Pokémon list page
      await page.goto("/kanto");

      // Confirm the correct Pokémon list is being displayed
      await expect(page).toHaveTitle(/kanto pokédex/i);

      // Assert the nav bar links are visible
      await expect(page.getByRole("link", { name: /home/i })).toBeVisible();
      await expect(page.getByRole("link", { name: /gen i \(kanto\)/i })).toBeVisible();
      await expect(page.getByRole("link", { name: /gen ii \(johto\)/i })).toBeVisible();
      await expect(page.getByRole("link", { name: /gen iii \(hoenn\)/i })).toBeVisible();
      await expect(page.getByRole("link", { name: /gen iv \(sinnoh\)/i })).toBeVisible();
    });

    test("the nav bar should be visible on the Pokémon info pages", async ({ page }) => {
      // Navigate to a Pokémon info page
      await page.goto("/kanto/bulbasaur");

      // Confirm the correct Pokémon info is being displayed
      await expect(page.getByText(/\# 1/i)).toBeVisible();
      await expect(page.getByText(/bulbasaur/i)).toBeVisible();

      // Assert the nav bar links are visible
      await expect(page.getByRole("link", { name: /home/i })).toBeVisible();
      await expect(page.getByRole("link", { name: /gen i \(kanto\)/i })).toBeVisible();
      await expect(page.getByRole("link", { name: /gen ii \(johto\)/i })).toBeVisible();
      await expect(page.getByRole("link", { name: /gen iii \(hoenn\)/i })).toBeVisible();
      await expect(page.getByRole("link", { name: /gen iv \(sinnoh\)/i })).toBeVisible();
    });
  });

  test.describe("testing the footer element", () => {
    test("the footer is visible on the main page", async ({ page }) => {
      // Assert the footer text content is visible
      await expect(page.getByText(/developed by rafael g. torok/i)).toBeVisible();
      await expect(page.getByText(/powered by the poké api⇗/i)).toBeVisible();
    });

    test("the footer should be visible on the Pokémon list pages", async ({ page }) => {
      // Navigate to a Pokémon list page
      await page.goto("/kanto");

      // Confirm the correct Pokémon list is being displayed
      await expect(page).toHaveTitle(/kanto pokédex/i);

      // Assert the footer text content is visible
      await expect(page.getByText(/developed by rafael g. torok/i)).toBeVisible();
      await expect(page.getByText(/powered by the poké api⇗/i)).toBeVisible();
    });

    test("the footer should be visible on the Pokémon info pages", async ({ page }) => {
      // Navigate to a Pokémon info page
      await page.goto("/kanto/bulbasaur");

      // Confirm the correct Pokémon info is being displayed
      await expect(page.getByText(/\# 1/i)).toBeVisible();
      await expect(page.getByText(/bulbasaur/i)).toBeVisible();

      // Assert the footer text content is visible
      await expect(page.getByText(/developed by rafael g. torok/i)).toBeVisible();
      await expect(page.getByText(/powered by the poké api⇗/i)).toBeVisible();
    });
  });
});
