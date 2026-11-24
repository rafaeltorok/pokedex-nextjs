import { test, expect } from '@playwright/test';

test.describe("testing the Pokédex pages", () => {
  test("the Kanto Pokédex page should display the correct Pokémon", async ({ page }) => {
    // Navigate to a Pokédex page
    await page.goto("/kanto");

    // Confirm it is the correct one
    await expect(page).toHaveURL("/kanto");
    await expect(page.getByText(/kanto pokédex/i)).toBeVisible();

    // Assert the Pokémon from the current generation are the ones being displayed
    await expect(page.getByText(/bulbasaur/i)).toBeVisible();
    await expect(page.getByText(/charmander/i)).toBeVisible();
    await expect(page.getByText(/squirtle/i)).toBeVisible();
  });

  test("the Johto Pokédex page should display the correct Pokémon", async ({ page }) => {
    // Navigate to a Pokédex page
    await page.goto("/johto");

    // Confirm it is the correct one
    await expect(page).toHaveURL("/johto");
    await expect(page.getByText(/johto pokédex/i)).toBeVisible();

    // Assert the Pokémon from the current generation are the ones being displayed
    await expect(page.getByText(/chikorita/i)).toBeVisible();
    await expect(page.getByText(/cyndaquil/i)).toBeVisible();
    await expect(page.getByText(/totodile/i)).toBeVisible();
  });

  test("the Hoenn Pokédex page should display the correct Pokémon", async ({ page }) => {
    // Navigate to a Pokédex page
    await page.goto("/hoenn");

    // Confirm it is the correct one
    await expect(page).toHaveURL("/hoenn");
    await expect(page.getByText(/hoenn pokédex/i)).toBeVisible();

    // Assert the Pokémon from the current generation are the ones being displayed
    await expect(page.getByText(/treecko/i)).toBeVisible();
    await expect(page.getByText(/torchic/i)).toBeVisible();
    await expect(page.getByText(/mudkip/i)).toBeVisible();
  });

  test("the Sinnoh Pokédex page should display the correct Pokémon", async ({ page }) => {
    // Navigate to a Pokédex page
    await page.goto("/sinnoh");

    // Confirm it is the correct one
    await expect(page).toHaveURL("/sinnoh");
    await expect(page.getByText(/sinnoh pokédex/i)).toBeVisible();

    // Assert the Pokémon from the current generation are the ones being displayed
    await expect(page.getByText(/turtwig/i)).toBeVisible();
    await expect(page.getByText(/chimchar/i)).toBeVisible();
    await expect(page.getByText(/piplup/i)).toBeVisible();
  });
  
  test("a Pokémon entry can be clicked on", async ({ page }) => {
    // Navigate to a Pokédex page
    await page.goto("/kanto");

    // Click on a Pokémon entry on the list
    await page.getByRole("link", { name: "Pokémon list entry", exact: true })
      .filter({ hasText: /bulbasaur/i })
      .click();

    // Confirm the correct Pokémon info is being displayed
    await expect(page.getByText(/\# 1/i)).toBeVisible();
    await expect(page.getByText("Bulbasaur", { exact: true })).toBeVisible();
    await expect(page.getByRole("button", { name: /grass/i })).toBeVisible();
    await expect(page.getByRole("button", { name: /poison/i })).toBeVisible();
  });
});
