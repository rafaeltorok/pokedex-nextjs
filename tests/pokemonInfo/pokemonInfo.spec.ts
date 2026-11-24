import { test, expect } from "@playwright/test";

test.describe("testing the Pokémon info page", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to a Pokémon page
    await page.goto("/kanto/bulbasaur");

    // Confirm the current info page is the correct one
    await expect(page.getByText(/\# 1/i)).toBeVisible();
    await expect(page.getByText(/bulbasaur/i)).toBeVisible();
  });

  test("the Pokémon info sections should be displayed", async ({ page }) => {
    // Assert the basic info sections are being displayed
    await expect(page.getByText(/stats/i)).toBeVisible();
    await expect(page.getByText(/abilities/i)).toBeVisible();
    await expect(page.getByText(/evolution/i)).toBeVisible();
  });

  test("the Pokémon sprite should be visible", async ({ page }) => {
    // Assert the sprite picture is present within the info page
    await expect(page.getByRole('img', { name: 'Pokémon picture' })).toBeVisible();
  });
});
