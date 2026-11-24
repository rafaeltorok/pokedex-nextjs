import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";
import { navigateToPokémonPage } from "../test-utils/navigateToPokemonPage";

// Helper functions
async function assertStatRow(name: string, value: string, page: Page) {
  // Get all of the stat rows
  const statRows = page.locator("div[aria-label='Stat row']");

  // Get the row to be asserted
  const currentRow = statRows.filter({
    has: page.locator("p[aria-label='Stat name']").getByText(name, { exact: true }),
  });

  // Select the stat value from the row
  const statValue = currentRow.locator("p[aria-label='Stat value']");

  // Assert the value is correct
  await expect(statValue).toHaveText(value);
}

test.describe("the Pokémon stats", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to a Pokémon page
    await navigateToPokémonPage(page, "1", "bulbasaur");
  });

  test("each stat value should be displayed correctly", async ({ page }) => {
    // Assert each one has their respective values correct
    await assertStatRow("Hp", "45", page);
    await assertStatRow("Attack", "49", page);
    await assertStatRow("Defense", "49", page);
    await assertStatRow("Special-attack", "65", page);
    await assertStatRow("Special-defense", "65", page);
    await assertStatRow("Speed", "45", page);
    await assertStatRow("Total", "318", page);
  });
});
