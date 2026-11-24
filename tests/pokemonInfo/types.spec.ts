import { test, expect } from "@playwright/test";
import { navigateToPokémonPage } from "../test-utils/navigateToPokemonPage";

test.describe("the Pokémon types", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to a Pokémon page
    await navigateToPokémonPage(page, "1", "bulbasaur");
  });

  test("both types should be present", async ({ page }) => {
    // Get the types row
    const typesRow = page.locator("div[aria-label='Types row']");

    // Assert each Pokémon type name is being correctly displayed
    await expect(typesRow.locator("button[aria-label='Type name']").nth(0)).toHaveText(/grass/i);
    await expect(typesRow.locator("button[aria-label='Type name']").nth(1)).toHaveText(/poison/i);
  });

  test("clicking on a type should display its damage relations", async ({ page }) => {
    // Get the types row
    const typesRow = page.locator("div[aria-label='Types row']");

    // Click on one of the types
    const grassButton = typesRow
      .locator("button[aria-label='Type name']")
      .filter({ hasText: /^grass$/i });

    await grassButton.click();

    // Confirm the main sections are present
    await expect(page.getByLabel("Attack damage relations").getByText(/attack/i)).toBeVisible();
    await expect(page.getByLabel("Defense damage relations").getByText(/defense/i)).toBeVisible();

    // Confirm the damage sub-sections are present
    await expect(page.getByText(/no damage to/i)).toBeVisible();
    await expect(page.getByText(/1\/2 damage to/i)).toBeVisible();
    await expect(page.getByText(/2x damage to/i)).toBeVisible();

    await expect(page.getByText(/no damage from/i)).toBeVisible();
    await expect(page.getByText(/1\/2 damage from/i)).toBeVisible();
    await expect(page.getByText(/2x damage from/i)).toBeVisible();
  });

  test("clicking on close button should close the damage relations popup", async ({ page }) => {
    // Get the types row
    const typesRow = page.locator("div[aria-label='Types row']");

    // Click on one of the types
    const grassButton = typesRow
      .locator("button[aria-label='Type name']")
      .filter({ hasText: /^grass$/i });

    await grassButton.click();

    // Confirm the main sections are present
    await expect(page.getByLabel("Attack damage relations").getByText(/attack/i)).toBeVisible();
    await expect(page.getByLabel("Defense damage relations").getByText(/defense/i)).toBeVisible();

    // Confirm the damage sub-sections are present
    await expect(page.getByText(/no damage to/i)).toBeVisible();
    await expect(page.getByText(/1\/2 damage to/i)).toBeVisible();
    await expect(page.getByText(/2x damage to/i)).toBeVisible();

    await expect(page.getByText(/no damage from/i)).toBeVisible();
    await expect(page.getByText(/1\/2 damage from/i)).toBeVisible();
    await expect(page.getByText(/2x damage from/i)).toBeVisible();

    // Close the dialog
    await page.getByRole("button", { name: /close/i }).click();

    // Confirm the popup has been closed
    await expect(page.getByLabel("Attack damage relations").getByText(/attack/i)).not.toBeVisible();
    await expect(page.getByLabel("Defense damage relations").getByText(/defense/i)).not.toBeVisible();
  });

  test.describe("the attack damage relations",() => {
    test.beforeEach(async ({ page }) => {
      // Get the types row
      const typesRow = page.locator("div[aria-label='Types row']");

      // Click on one of the types
      const grassButton = typesRow
        .locator("button[aria-label='Type name']")
        .filter({ hasText: /^grass$/i });

      await grassButton.click();

      // Confirm the section is present
      await expect(page.getByLabel("Attack damage relations").getByText(/attack/i)).toBeVisible();

      // Confirm the damage sub-sections are present
      await expect(page.getByText(/no damage to/i)).toBeVisible();
      await expect(page.getByText(/1\/2 damage to/i)).toBeVisible();
      await expect(page.getByText(/2x damage to/i)).toBeVisible();
    });

    test("the 'No damage to' row should display the correct types", async ({ page }) => {
      // Get the Attack section
      const attackRelations = page.locator("div[aria-label='Attack damage relations']");

      // Assert the "No damage to" row is correct
      const currentRow = attackRelations
        .locator("div[aria-label='Damage relations row']")
        .filter({
          has: page.locator("p[aria-label='Damage relations label']").getByText(/no damage to/i),
        });

      // Select all of the types
      const typeValues = currentRow.locator("div[aria-label='Damage relation value']");

      // Assert the types are correct
      await expect(typeValues.nth(0)).toHaveText(/none/i);
    });

    test("the '1/2 damage to' row should display the correct types", async ({ page }) => {
      // Get the Attack section
      const attackRelations = page.locator("div[aria-label='Attack damage relations']");

      // Assert the "1/2 damage to" row is correct
      const currentRow = attackRelations
        .locator("div[aria-label='Damage relations row']")
        .filter({
          has: page.locator("p[aria-label='Damage relations label']").getByText(/1\/2 damage to/i),
        });

      // Select all of the types
      const typeValues = currentRow.locator("div[aria-label='Damage relation value']");

      // Assert the types are correct
      await expect(typeValues.nth(0)).toHaveText(/flying/i);
      await expect(typeValues.nth(1)).toHaveText(/poison/i);
      await expect(typeValues.nth(2)).toHaveText(/bug/i);
      await expect(typeValues.nth(3)).toHaveText(/steel/i);
      await expect(typeValues.nth(4)).toHaveText(/fire/i);
      await expect(typeValues.nth(5)).toHaveText(/grass/i);
      await expect(typeValues.nth(6)).toHaveText(/dragon/i);
    });

    test("the '2x damage to' row should display the correct types", async ({ page }) => {
      // Get the Attack section
      const attackRelations = page.locator("div[aria-label='Attack damage relations']");

      // Assert the "2x damage to" row is correct
      const currentRow = attackRelations
        .locator("div[aria-label='Damage relations row']")
        .filter({
          has: page.locator("p[aria-label='Damage relations label']").getByText(/2x damage to/i),
        });

      // Select all of the types
      const typeValues = currentRow.locator("div[aria-label='Damage relation value']");

      // Assert the types are correct
      await expect(typeValues.nth(0)).toHaveText(/ground/i);
      await expect(typeValues.nth(1)).toHaveText(/rock/i);
      await expect(typeValues.nth(2)).toHaveText(/water/i);
    });
  });

  test.describe("the defense damage relations",() => {
    test.beforeEach(async ({ page }) => {
      // Get the types row
      const typesRow = page.locator("div[aria-label='Types row']");

      // Click on one of the types
      const grassButton = typesRow
        .locator("button[aria-label='Type name']")
        .filter({ hasText: /^grass$/i });

      await grassButton.click();

      // Confirm the section is present
      await expect(page.getByLabel("Defense damage relations").getByText(/defense/i)).toBeVisible();

      // Confirm the damage sub-sections are present
      await expect(page.getByText(/no damage from/i)).toBeVisible();
      await expect(page.getByText(/1\/2 damage from/i)).toBeVisible();
      await expect(page.getByText(/2x damage from/i)).toBeVisible();
    });

    test("the 'No damage from' row should display the correct types", async ({ page }) => {
      // Get the Defense section
      const defenseRelations = page.locator("div[aria-label='Defense damage relations']");

      // Assert the "No damage from" row is correct
      const currentRow = defenseRelations
        .locator("div[aria-label='Damage relations row']")
        .filter({
          has: page.locator("p[aria-label='Damage relations label']").getByText(/no damage from/i),
        });

      // Select all of the types
      const typeValues = currentRow.locator("div[aria-label='Damage relation value']");

      // Assert the types are correct
      await expect(typeValues.nth(0)).toHaveText(/none/i);
    });

    test("the '1/2 damage from' row should display the correct types", async ({ page }) => {
      // Get the Defense section
      const defenseRelations = page.locator("div[aria-label='Defense damage relations']");

      // Assert the "1/2 damage from" row is correct
      const currentRow = defenseRelations
        .locator("div[aria-label='Damage relations row']")
        .filter({
          has: page.locator("p[aria-label='Damage relations label']").getByText(/1\/2 damage from/i),
        });

      // Select all of the types
      const typeValues = currentRow.locator("div[aria-label='Damage relation value']");

      // Assert the types are correct
      await expect(typeValues.nth(0)).toHaveText(/ground/i);
      await expect(typeValues.nth(1)).toHaveText(/water/i);
      await expect(typeValues.nth(2)).toHaveText(/grass/i);
      await expect(typeValues.nth(3)).toHaveText(/electric/i);
    });

    test("the '2x damage from' row should display the correct types", async ({ page }) => {
      // Get the Defense section
      const defenseRelations = page.locator("div[aria-label='Defense damage relations']");

      // Assert the "2x damage from" row is correct
      const currentRow = defenseRelations
        .locator("div[aria-label='Damage relations row']")
        .filter({
          has: page.locator("p[aria-label='Damage relations label']").getByText(/2x damage from/i),
        });

      // Select all of the types
      const typeValues = currentRow.locator("div[aria-label='Damage relation value']");

      // Assert the types are correct
      await expect(typeValues.nth(0)).toHaveText(/flying/i);
      await expect(typeValues.nth(1)).toHaveText(/poison/i);
      await expect(typeValues.nth(2)).toHaveText(/bug/i);
      await expect(typeValues.nth(3)).toHaveText(/fire/i);
      await expect(typeValues.nth(4)).toHaveText(/ice/i);
    });
  });
});
