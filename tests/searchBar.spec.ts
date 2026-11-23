import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";

// Helper functions
async function navigateToPokedexPage(region: string, page: Page): Promise<void> {
  const regex = new RegExp(`${region} pokédex`, "i");

  // Navigate to the Pokédex page
  await page.goto(`/${region}`);
  
  // Confirm it is the correct one
  await expect(page).toHaveURL(`/${region}`);
  await expect(page.getByText(regex)).toBeVisible();
}

// Tests
test.describe("testing the Search bar component", () => {
  test("the search bar should be present within all of the Pokédex pages", async ({ page }) => {
    // Navigate to the Gen I (Kanto) Pokédex page
    await navigateToPokedexPage("kanto", page);

    // Assert the search bar is visible
    await expect(page.getByRole("searchbox", { name: "Search bar", exact: true })).toBeVisible();

    // Navigate to the Gen II (Johto) Pokédex page
    await navigateToPokedexPage("johto", page);

    // Assert the search bar is visible
    await expect(page.getByRole("searchbox", { name: "Search bar", exact: true })).toBeVisible();

    // Navigate to the Gen III (Hoenn) Pokédex page
    await navigateToPokedexPage("hoenn", page);

    // Assert the search bar is visible
    await expect(page.getByRole("searchbox", { name: "Search bar", exact: true })).toBeVisible();

    // Navigate to the Gen IV (Sinnoh) Pokédex page
    await navigateToPokedexPage("sinnoh", page);

    // Assert the search bar is visible
    await expect(page.getByRole("searchbox", { name: "Search bar", exact: true })).toBeVisible();
  });

  test("the search bar can be typed on", async ({ page }) => {
    // Navigate to a Pokédex page
    await navigateToPokedexPage("kanto", page);

    // Type on the search bar
    await page.getByRole("searchbox", { name: "Search bar", exact: true }).fill("pikachu");

    // Confirm the search term is present within the search field
    await expect(page.getByRole("searchbox")).toHaveValue("pikachu");
  });

  test("the search input should be placed within the URL params", async ({ page }) => {
    // Navigate to a Pokédex page
    await navigateToPokedexPage("kanto", page);

    // Type on the search bar
    await page.getByRole("searchbox", { name: "Search bar", exact: true }).fill("pikachu");

    // Assert the correct query param is present
    await expect(page).toHaveURL(url => {
      const params = url.searchParams;
      return params.has("query") && params.get("query") === "pikachu";
    });
  });

  test("the search input should filter the current Pokédex", async ({ page }) => {
    // Navigate to a Pokédex page
    await navigateToPokedexPage("kanto", page);

    // Type on the search bar
    await page.getByRole("searchbox", { name: "Search bar", exact: true }).fill("saur");

    // Assert only the filtered results are being displayed
    const results = page.getByRole("link", { name: "Pokémon list entry", exact: true });
    
    // Check the amount of search results
    await expect(results).toHaveCount(3);

    // Check if each individual result is correct
    await expect(results.nth(0)).toHaveText(/bulbasaur/i);
    await expect(results.nth(1)).toHaveText(/ivysaur/i);
    await expect(results.nth(2)).toHaveText(/venusaur/i);
  });

  test("should display a proper message when no search results have been found", async ({ page }) => {
    // Navigate to a Pokédex page
    await navigateToPokedexPage("kanto", page);

    // Type on the search bar
    await page.getByRole("searchbox", { name: "Search bar", exact: true }).fill("missigno");

    // Confirm no Pokémon entries are available
    await expect(page.getByRole("link", { name: "Pokémon list entry", exact: true })).toHaveCount(0);

    // Assert the message is present within the page
    await expect(page.getByRole("heading", { name: "No pokémon found" })).toBeVisible();
  });

  test("the filtering should be case insensitive", async ({ page }) => {
    // Navigate to a Pokédex page
    await navigateToPokedexPage("kanto", page);

    // Type on the search bar
    await page.getByRole("searchbox", { name: "Search bar", exact: true }).fill("PIKACHU");

    // Assert only the filtered results are being displayed
    const results = page.getByRole("link", { name: "Pokémon list entry", exact: true });
    
    // Check the amount of search results
    await expect(results).toHaveCount(1);

    // Check if each individual result is correct
    await expect(results.nth(0)).toHaveText(/pikachu/i);
  });

  test("the filtering should ignore leading whitespaces", async ({ page }) => {
    // Navigate to a Pokédex page
    await navigateToPokedexPage("kanto", page);

    // Type on the search bar
    await page.getByRole("searchbox", { name: "Search bar", exact: true }).fill("   pikachu");

    // Assert only the filtered results are being displayed
    const results = page.getByRole("link", { name: "Pokémon list entry", exact: true });
    
    // Check the amount of search results
    await expect(results).toHaveCount(1);

    // Check if each individual result is correct
    await expect(results.nth(0)).toHaveText(/pikachu/i);
  });
});
