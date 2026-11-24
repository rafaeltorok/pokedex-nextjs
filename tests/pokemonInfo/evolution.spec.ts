import { test, expect } from "@playwright/test";

test.describe("the Pokémon evolution chain", () => {
  test("a Pokémon that does not evolve should display a proper message", async ({ page }) => {
    // Navigate to a Pokémon that does not evolve
    await page.goto("/kanto/mew");

    // Confirm it is the correct page
    await expect(page.getByText(/\# 151/i)).toBeVisible();
    await expect(page.getByText(/mew/i)).toBeVisible();

    // Assert the message is present within the evolution section
    await expect(page.locator("div[aria-label='Evolution row']").nth(0)).toHaveText(/does not evolve/i);
  });

  test("the first form of an evolution chain should display only the next evolution", async ({ page }) => {
    // Navigate to a Pokémon info page
    await page.goto("/kanto/bulbasaur");

    // Confirm it is the correct page
    await expect(page.getByText(/\# 1/i)).toBeVisible();
    await expect(page.getByText(/bulbasaur/i)).toBeVisible();

    // Assert it only contains the "To" row for the next evolution form
    const evolutionRows = page.locator("div[aria-label='Evolution row']");
    await expect(evolutionRows).toHaveCount(1);

    // Confirm each section of the evolution details is correct
    const evolutionType = evolutionRows.nth(0).locator("p[aria-label='Evolution type']");
    await expect(evolutionType).toHaveText(/to/i);
    
    const evolutionName = evolutionRows.nth(0).locator("p[aria-label='Evolution name']");
    await expect(evolutionName).toHaveText(/ivysaur/i);

    const evolutionDescription = evolutionRows.nth(0).locator("p[aria-label='Evolution description']")
    await expect(evolutionDescription).toHaveText(/lv. 16/i);
  });

  test("the middle form of an evolution chain should display both the previous and next evolutions", async ({ page }) => {
    // Navigate to a Pokémon info page
    await page.goto("/kanto/ivysaur");

    // Confirm it is the correct page
    await expect(page.getByText(/\# 2/i)).toBeVisible();
    await expect(page.getByText(/ivysaur/i)).toBeVisible();

    // Assert it contains both the "From" and "To" rows
    const evolutionRows = page.locator("div[aria-label='Evolution row']");
    await expect(evolutionRows).toHaveCount(2);

    // Confirm if all sections from the previous evolution are correct
    const previousEvolutionType = evolutionRows.nth(0).locator("p[aria-label='Evolution type']");
    await expect(previousEvolutionType).toHaveText(/from/i);
    
    const previousEvolutionName = evolutionRows.nth(0).locator("p[aria-label='Evolution name']");
    await expect(previousEvolutionName).toHaveText(/bulbasaur/i);

    const previousEvolutionDescription = evolutionRows.nth(0).locator("p[aria-label='Evolution description']")
    await expect(previousEvolutionDescription).toHaveText(/lv. 16/i);

    // Confirm if all sections from the next evolution are correct
    const nextEvolutionType = evolutionRows.nth(1).locator("p[aria-label='Evolution type']");
    await expect(nextEvolutionType).toHaveText(/to/i);
    
    const nextEvolutionName = evolutionRows.nth(1).locator("p[aria-label='Evolution name']");
    await expect(nextEvolutionName).toHaveText(/venusaur/i);

    const nextEvolutionDescription = evolutionRows.nth(1).locator("p[aria-label='Evolution description']")
    await expect(nextEvolutionDescription).toHaveText(/lv. 32/i);
  });

  test("the final form of an evolution chain should display only the previous evolution", async ({ page }) => {
    // Navigate to a Pokémon info page
    await page.goto("/kanto/venusaur");

    // Confirm it is the correct page
    await expect(page.getByText(/\# 3/i)).toBeVisible();
    await expect(page.getByText(/venusaur/i)).toBeVisible();

    // Assert it contains only the "From" row
    const evolutionRows = page.locator("div[aria-label='Evolution row']");
    await expect(evolutionRows).toHaveCount(1);

    // Confirm if all sections from the previous evolution are correct
    const previousEvolutionType = evolutionRows.nth(0).locator("p[aria-label='Evolution type']");
    await expect(previousEvolutionType).toHaveText(/from/i);
    
    const previousEvolutionName = evolutionRows.nth(0).locator("p[aria-label='Evolution name']");
    await expect(previousEvolutionName).toHaveText(/ivysaur/i);

    const previousEvolutionDescription = evolutionRows.nth(0).locator("p[aria-label='Evolution description']")
    await expect(previousEvolutionDescription).toHaveText(/lv. 32/i);
  });
});
