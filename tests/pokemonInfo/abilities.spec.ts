import { test, expect } from "@playwright/test";

test.describe("the Pokémon abilities", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to a Pokémon page
    await page.goto("/kanto/bulbasaur");

    // Confirm the current info page is the correct one
    await expect(page.getByText(/\# 1/i)).toBeVisible();
    await expect(page.getByText(/bulbasaur/i)).toBeVisible();
  });

  test("each ability should be displayed correctly", async ({ page }) => {
    // Get the ability rows
    const abilityRows = page.locator("div[aria-label='Ability row']");

    // Get the normal ability row
    let currentRow = abilityRows.filter({
      has: page.locator("label[aria-label='Ability type']").getByText("Normal ability", { exact: true }),
    });

    // Assert the ability name is correct
    await expect(currentRow.locator("button[aria-label='Ability name']")).toHaveText(/overgrow/i);

    // Get the hidden ability row
    currentRow = abilityRows.filter({
      has: page.locator("label[aria-label='Ability type']").getByText("Hidden ability", { exact: true }),
    });

    // Assert the ability name is correct
    await expect(currentRow.locator("button[aria-label='Ability name']")).toHaveText(/chlorophyll/i);
  });

  test("clicking on the normal ability should display its description", async ({ page }) => {
    // Get the ability rows
    const abilityRows = page.locator("div[aria-label='Ability row']");

    // Filter the normal ability row
    const currentRow = abilityRows.filter({
      has: page.locator("label[aria-label='Ability type']").getByText("Normal ability", { exact: true }),
    });

    // Click on the normal ability to open the description popup
    await currentRow.locator("button[aria-label='Ability name']").click();

    // Assert the correct description is being displayed
    await expect(page.getByText(/ups grass moves in a pinch/i)).toBeVisible();
  });

  test("clicking on the hidden ability should display its description", async ({ page }) => {
    // Get the ability rows
    const abilityRows = page.locator("div[aria-label='Ability row']");

    // Filter the hidden ability row
    const currentRow = abilityRows.filter({
      has: page.locator("label[aria-label='Ability type']").getByText("Hidden ability", { exact: true }),
    });

    // Click on the hidden ability to open the description popup
    await currentRow.locator("button[aria-label='Ability name']").click();

    // Assert the correct description is being displayed
    await expect(page.getByText(/raises speed in sunshine/i)).toBeVisible();
  });

  test("clicking on the close button should close the description popup", async ({ page }) => {
    // Get the ability rows
    const abilityRows = page.locator("div[aria-label='Ability row']");

    // Filter the normal ability row
    const currentRow = abilityRows.filter({
      has: page.locator("label[aria-label='Ability type']").getByText("Normal ability", { exact: true }),
    });

    // Click on the normal ability to open the description popup
    await currentRow.locator("button[aria-label='Ability name']").click();

    // Assert the description popup is being displayed
    await expect(page.getByText(/ups grass moves in a pinch/i)).toBeVisible();

    // Close the dialog
    await page.getByRole("button", { name: /close/i }).click();

    // Assert the popup has been closed
    await expect(page.getByText(/ups grass moves in a pinch/i)).not.toBeVisible();
  });

  test("a Pokémon with a single ability should not display the Hidden ability row", async ({ page }) => {
    // Navigate to Pokémon info page that only has the normal ability
    await page.goto("/kanto/mew");

    // Get the ability rows
    const abilityRows = page.locator("div[aria-label='Ability row']");

    // Get the normal ability row
    const currentRow = abilityRows.filter({
      has: page.locator("label[aria-label='Ability type']").getByText("Normal ability", { exact: true }),
    });

    // Assert the ability name is correct
    await expect(currentRow.locator("button[aria-label='Ability name']")).toHaveText(/synchronize/i);

    // Confirm the hidden ability row is not present
    await expect(abilityRows.filter({
      has: page.locator("label[aria-label='Ability type']").getByText("Hidden ability", { exact: true }),
    })).not.toBeVisible();
  });
});
