import { test, expect } from "@playwright/test";
import navigateToPokedexPage from "./test-utils/navigateToPokédexPage";
import type { Page } from "@playwright/test";

async function assertPaginationControls(page: Page) {
  // Assert the basic page controls are present within the page
  await expect(page.getByLabel(/page controls/i)).toBeVisible();

  await expect(page.getByLabel(/page controls/i)
    .filter({ hasText: "1"}))
    .toBeVisible();

  await expect(page.getByRole("button", { name: "►" })).toBeVisible();
}

test.describe("testing the pagination controls", () => {
  test("the page controls are visible within all the Pokédex pages", async ({ page }) => {
    // Navigate to the Gen I (Kanto) page
    await navigateToPokedexPage("kanto", page);

    // Confirm the page controls are present
    await assertPaginationControls(page);

    // Navigate to the Gen II (Johto) page
    await navigateToPokedexPage("johto", page);

    // Confirm the page controls are present
    await assertPaginationControls(page);

    // Navigate to the Gen III (Hoenn) page
    await navigateToPokedexPage("hoenn", page);

    // Confirm the page controls are present
    await assertPaginationControls(page);

    // Navigate to the Gen IV (Sinnoh) page
    await navigateToPokedexPage("sinnoh", page);

    // Confirm the page controls are present
    await assertPaginationControls(page);
  });

  test("an invalid page number on the URL params should be changed to 1", async ({ page }) => {
    // Navigate to an invalid page number
    await page.goto("/kanto?page=999");

    // Assert the first page is the one currently selected
    await expect(page.getByText('1', { exact: true })).toBeVisible();
    
    //  Confirm the first page Pokémon are being displayed
    await expect(page.getByRole("link", { name: "Pokémon list entry", exact: true })
        .filter({ hasText: /bulbasaur/i}))
        .toBeVisible();

    await expect(page.getByRole("link", { name: "Pokémon list entry", exact: true })
      .filter({ hasText: /charmander/i}))
      .toBeVisible();

    await expect(page.getByRole("link", { name: "Pokémon list entry", exact: true })
      .filter({ hasText: /squirtle/i}))
      .toBeVisible();
  });

  test.describe("testing the page controls functionality",() => {
    test.beforeEach(async ({ page }) => {
      // Navigate to the Gen I (Kanto) page
      await navigateToPokedexPage("kanto", page);
    });

    test("the next page button works", async({ page }) => {
      // Navigate to a Pokédex page
      await navigateToPokedexPage("kanto", page);

      // Assert a Pokémon from the second page is not currently visible
      await expect(page.getByRole("link", { name: "Pokémon list entry", exact: true })
        .filter({ hasText: /blastoise/i}))
        .not.toBeVisible();

      // Navigate to the second page
      await page.getByRole("button", { name: "►" }).click();

      // Assert the previous Pokémon is now visible within the current page
      await expect(page.getByRole("link", { name: "Pokémon list entry", exact: true })
        .filter({ hasText: /blastoise/i}))
        .toBeVisible();
    });

    test("choosing another page should update the URL params", async({ page }) => {
      // Navigate to a Pokédex page
      await navigateToPokedexPage("kanto", page);

      // Navigate to the second page
      await page.getByRole("button", { name: "2" }).click();

      // Assert the current selected page is present within the URL params
      await expect(page).toHaveURL(url => {
        const params = url.searchParams;
        return params.has("page") && params.get("page") === "2";
      });
    });
  });
});
