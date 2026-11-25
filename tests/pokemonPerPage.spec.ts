import { test, expect } from "@playwright/test";
import navigateToPokedexPage from "./test-utils/navigateToPokédexPage";

test.describe("testing the Pokémon per page selector", () => {
  test("the selector is visible within all the Pokédex pages", async ({
    page,
  }) => {
    // Navigate to the Gen I (Kanto) page
    await navigateToPokedexPage("kanto", page);

    // Assert the selector is present within the page
    await expect(page.getByLabel(/pokémon per page/i)).toHaveValue("8");

    // Navigate to the Gen II (Johto) page
    await navigateToPokedexPage("johto", page);

    // Assert the selector is present within the page
    await expect(page.getByLabel(/pokémon per page/i)).toHaveValue("8");

    // Navigate to the Gen III (Hoenn) page
    await navigateToPokedexPage("hoenn", page);

    // Assert the selector is present within the page
    await expect(page.getByLabel(/pokémon per page/i)).toHaveValue("8");

    // Navigate to the Gen IV (Sinnoh) page
    await navigateToPokedexPage("sinnoh", page);

    // Assert the selector is present within the page
    await expect(page.getByLabel(/pokémon per page/i)).toHaveValue("8");
  });

  test.describe("testing the selector functionality", () => {
    test.beforeEach(async ({ page }) => {
      // Navigate to a Pokédex page
      await navigateToPokedexPage("kanto", page);
    });

    test("another value can be selected", async ({ page }) => {
      const option = "4";

      // Select a value
      await page.getByLabel(/pokémon per page/i).selectOption(option);

      // Assert the selector has the correct selected value
      await expect(page.getByLabel(/pokémon per page/i)).toHaveValue(option);
    });

    test("selecting a value should update the URL params", async ({ page }) => {
      const option = "4";

      // Select a value
      await page.getByLabel(/pokémon per page/i).selectOption(option);

      // Assert the correct query param is present
      await expect(page).toHaveURL((url) => {
        const params = url.searchParams;
        return params.has("limit") && params.get("limit") === option;
      });
    });

    test("an invalid amount within the URL params should change to the default value", async ({
      page,
    }) => {
      const defaultValue = "8";
      await page.goto("/kanto?page=1&limit=20");

      // Assert the default value has been selected instead
      await expect(page.getByLabel(/pokémon per page/i)).toHaveValue(
        defaultValue,
      );

      // Confirm only the default amount of Pokémon entries are being displayed
      const results = page.getByRole("link", {
        name: "Pokémon list entry",
        exact: true,
      });
      await expect(results).toHaveCount(Number(defaultValue));
    });

    test("it should reflect on the amount of Pokémon entries being displayed", async ({
      page,
    }) => {
      const option = "4";

      // Select a value
      await page.getByLabel(/pokémon per page/i).selectOption(option);

      // Assert the selector has the correct selected value
      await expect(page.getByLabel(/pokémon per page/i)).toHaveValue(option);

      // Get all Pokémon entries being displayed
      const results = page.getByRole("link", {
        name: "Pokémon list entry",
        exact: true,
      });

      // Assert the amount of entries is correct
      await expect(results).toHaveCount(Number(option));
    });

    test("it should also affect the amount of search results being displayed per page", async ({
      page,
    }) => {
      const option = "4";

      // Type on the search bar
      await page
        .getByRole("searchbox", { name: "Search bar", exact: true })
        .fill("a");

      // Select a value
      await page.getByLabel(/pokémon per page/i).selectOption(option);

      // Assert the selector has the correct selected value
      await expect(page.getByLabel(/pokémon per page/i)).toHaveValue(option);

      // Get all Pokémon entries being displayed
      const results = page.getByRole("link", {
        name: "Pokémon list entry",
        exact: true,
      });

      // Assert the amount of entries is correct
      await expect(results).toHaveCount(Number(option));
    });
  });
});
