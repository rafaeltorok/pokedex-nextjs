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

test.describe("testing the page controls", () => {
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
    await expect(page.getByLabel(/page controls/i)
      .filter({ hasText: "1"}))
      .toBeVisible();
    
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

  test.describe("testing the page controls functionality", () => {
    test.beforeEach(async ({ page }) => {
      // Navigate to the Gen I (Kanto) page
      await navigateToPokedexPage("kanto", page);
    });

    test("the next page button works", async ({ page }) => {
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

    test("the previous page button should be disabled when on the first page", async ({ page }) => {
      // Navigate to the first page of the Pokédex
      await page.goto("/kanto?page=1&limit=8");

      // Confirm it is currently on the first page
      await expect(page.getByRole("link", { name: "Pokémon list entry", exact: true })
        .filter({ hasText: /bulbasaur/i}))
        .toBeVisible();

      // Assert the previous page button is disabled and only the next one is active
      await expect(page.getByRole("button", { name: "◄" })).not.toBeVisible();
      await expect(page.getByRole("button", { name: "►" })).toBeVisible();
    });

    test("the next page button should be disabled when on the last page", async ({ page }) => {
      // Navigate to the last page of the Pokédex
      await page.goto("/kanto?page=19&limit=8");

      // Confirm it is currently on the last page
      await expect(page.getByRole("link", { name: "Pokémon list entry", exact: true })
        .filter({ hasText: /mewtwo/i}))
        .toBeVisible();

      // Assert the next page button is disabled and only the previous one is active
      await expect(page.getByRole("button", { name: "►" })).not.toBeVisible();
      await expect(page.getByRole("button", { name: "◄" })).toBeVisible();
    });

    test("both the previous and next page buttons should be disabled when there is only 1 page", async ({ page }) => {
      // Navigate to the Pokédex page
      await page.goto("/kanto?query=pikachu");

      // Confirm the search term is present within the search bar input field
      await expect(page.getByRole("searchbox", { name: "Search bar", exact: true })).toHaveValue("pikachu");

      // Assert there is only one page available
      await expect(page.getByRole("button", { name: "2" })).not.toBeVisible();
      await expect(page.getByLabel(/page controls/i)
        .filter({ hasText: "1"}))
        .toBeVisible();

      // Assert both buttons have been disabled
      await expect(page.getByRole("button", { name: "►" })).not.toBeVisible();
      await expect(page.getByRole("button", { name: "◄" })).not.toBeVisible();
    });

    test("changing the amount of Pokémon per page should affect the total number of pages", async ({ page }) => {
      // Navigate to the Pokédex page
      await page.goto("/kanto?limit=12");

      // Assert the selector has the correct selected value
      await expect(page.getByLabel(/pokémon per page/i)).toHaveValue("12");

      // Assert the last page number has changed
      await expect(page.getByRole("button", { name: "19" })).not.toBeVisible(); // Last page with the default limit of 8
      await expect(page.getByRole("button", { name: "13" })).toBeVisible();
    });

    test("the amount of search results should affect the total number of pages", async ({ page }) => {
      // Navigate to the Pokédex page
      await page.goto("/kanto?query=pikachu");

      // Confirm the search term is present within the search bar input field
      await expect(page.getByRole("searchbox", { name: "Search bar", exact: true })).toHaveValue("pikachu");

      // Assert the amount of pages has changed
      await expect(page.getByRole("button", { name: "2" })).not.toBeVisible();
      await expect(page.getByLabel(/page controls/i)
        .filter({ hasText: "1"}))
        .toBeVisible();
    });

    test("the page controls should not be visible when there are no Pokémon available", async ({ page }) => {
      // Navigate to the Pokédex page
      await page.goto("/kanto?query=missigno");

      // Confirm the search term is present within the search bar
      await expect(page.getByRole("searchbox", { name: "Search bar", exact: true })).toHaveValue("missigno");

      // Confirm no Pokémon entries are available
      await expect(page.getByRole("link", { name: "Pokémon list entry", exact: true })).toHaveCount(0);

      // Assert a no results message is present within the page
      await expect(page.getByRole("heading", { name: "No pokémon found" })).toBeVisible();

      // Assert the page controls are not present within the page
      await expect(page.getByLabel(/page controls/i)).not.toBeVisible();
    });
  });
});
