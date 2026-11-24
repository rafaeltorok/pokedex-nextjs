import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";
import { navigateToPokémonPage } from "../test-utils/navigateToPokemonPage";

// Helper functions
async function assertEvolutionRow(page: Page, type: string, name: string, description: string, index: number) {
  // Get all of the evolution rows
  const evolutionRows = page.locator("div[aria-label='Evolution row']");

  // Confirm if all sections for the evolution are correct
  const evolutionType = evolutionRows.nth(index).locator("p[aria-label='Evolution type']");
  await expect(evolutionType).toHaveText(new RegExp(type, "i"));
  
  const evolutionName = evolutionRows.nth(index).locator("p[aria-label='Evolution name']");
  await expect(evolutionName).toHaveText(new RegExp(name, "i"));

  const evolutionDescription = evolutionRows.nth(index).locator("p[aria-label='Evolution description']")
  await expect(evolutionDescription).toHaveText(new RegExp(description, "i"));
}

// Tests
test.describe("the Pokémon evolution chain", () => {
  test("a Pokémon that does not evolve should display a proper message", async ({ page }) => {
    // Navigate to a Pokémon that does not evolve
    await navigateToPokémonPage(page, "151", "mew");

    // Assert the message is present within the evolution section
    await expect(page.locator("div[aria-label='Evolution row']").nth(0)).toHaveText(/does not evolve/i);
  });

  test("the first form of an evolution chain should display only the next evolution", async ({ page }) => {
    // Navigate to a Pokémon info page
    await navigateToPokémonPage(page, "1", "bulbasaur");

    // Assert it only contains the "To" row for the next evolution form
    const evolutionRows = page.locator("div[aria-label='Evolution row']");
    await expect(evolutionRows).toHaveCount(1);

    // Confirm each section of the evolution details is correct
    await assertEvolutionRow(page, "to", "ivysaur", "lv. 16", 0);
  });

  test("the middle form of an evolution chain should display both the previous and next evolutions", async ({ page }) => {
    // Navigate to a Pokémon info page
    await navigateToPokémonPage(page, "2", "ivysaur");

    // Assert it contains both the "From" and "To" rows
    const evolutionRows = page.locator("div[aria-label='Evolution row']");
    await expect(evolutionRows).toHaveCount(2);

    // Confirm if all sections from the previous evolution are correct
    await assertEvolutionRow(page, "from", "bulbasaur", "lv. 16", 0);

    // Confirm if all sections from the next evolution are correct
    await assertEvolutionRow(page, "to", "venusaur", "lv. 32", 1);
  });

  test("the final form of an evolution chain should display only the previous evolution", async ({ page }) => {
    // Navigate to a Pokémon info page
    await navigateToPokémonPage(page, "3", "venusaur");

    // Assert it contains only the "From" row
    const evolutionRows = page.locator("div[aria-label='Evolution row']");
    await expect(evolutionRows).toHaveCount(1);

    // Confirm if all sections from the previous evolution are correct
    await assertEvolutionRow(page, "from", "ivysaur", "lv. 32", 0);
  });

  test("multiple evolutions should all be displayed within the evolution section", async ({ page }) => {
    // Navigate to a Pokémon info page
    await navigateToPokémonPage(page, "133", "eevee");

    // Assert it contains all of the available evolutions
    const evolutionRows = page.locator("div[aria-label='Evolution row']");
    await expect(evolutionRows).toHaveCount(8);

    // Confirm all of the evolutions are after the current Pokémon form
    for (let i = 0; i < 8; i++) {
      const evolutionType = evolutionRows.nth(i).locator("p[aria-label='Evolution type']");
      await expect(evolutionType).toHaveText(/to/i);
    }

    // Assert each individual evolution is being listed correctly
    let evolutionName = evolutionRows.nth(0).locator("p[aria-label='Evolution name']");
    await expect(evolutionName).toHaveText(/vaporeon/i);

    evolutionName = evolutionRows.nth(1).locator("p[aria-label='Evolution name']");
    await expect(evolutionName).toHaveText(/jolteon/i);

    evolutionName = evolutionRows.nth(2).locator("p[aria-label='Evolution name']");
    await expect(evolutionName).toHaveText(/flareon/i);

    evolutionName = evolutionRows.nth(3).locator("p[aria-label='Evolution name']");
    await expect(evolutionName).toHaveText(/espeon/i);

    evolutionName = evolutionRows.nth(4).locator("p[aria-label='Evolution name']");
    await expect(evolutionName).toHaveText(/umbreon/i);

    evolutionName = evolutionRows.nth(5).locator("p[aria-label='Evolution name']");
    await expect(evolutionName).toHaveText(/leafeon/i);

    evolutionName = evolutionRows.nth(6).locator("p[aria-label='Evolution name']");
    await expect(evolutionName).toHaveText(/glaceon/i);

    evolutionName = evolutionRows.nth(7).locator("p[aria-label='Evolution name']");
    await expect(evolutionName).toHaveText(/sylveon/i);
  });

  test("stone evolutions should be properly displayed", async ({ page }) => {
    // Testing a Moon stone evolution
    await navigateToPokémonPage(page, "33", "nidorino");

    // Confirm if all sections for the Moon stone evolution are correct
    await assertEvolutionRow(page, "to", "nidoking", "moon-stone", 1);

    // Testing a Fire stone evolution
    await navigateToPokémonPage(page, "58", "growlithe");

    // Confirm if all sections for the Fire stone evolution are correct
    await assertEvolutionRow(page, "to", "arcanine", "fire-stone", 0);

    // Testing a Water stone evolution
    await navigateToPokémonPage(page, "120", "staryu");

    // Confirm if all sections for the Water stone evolution are correct
    await assertEvolutionRow(page, "to", "starmie", "water-stone", 0);

    // Testing a Leaf stone evolution
    await navigateToPokémonPage(page, "44", "gloom");

    // Confirm if all sections for the Leaf stone evolution are correct
    await assertEvolutionRow(page, "to", "vileplume", "leaf-stone", 1);
  });

  test("trade evolutions should be properly displayed", async ({ page }) => {
    // Navigate to a Pokémon info page
    await navigateToPokémonPage(page, "64", "kadabra");

    // Confirm if all sections for the trade evolution are correct
    await assertEvolutionRow(page, "to", "alakazam", "trade", 1);
  });
});
