import { expect } from "@playwright/test";
import type { Page } from "@playwright/test";

// Helper functions
export default async function navigateToPokedexPage(
  region: string,
  page: Page,
): Promise<void> {
  const regex = new RegExp(`${region} pokédex`, "i");

  // Navigate to the Pokédex page
  await page.goto(`/${region}`);

  // Confirm it is the correct one
  await expect(page).toHaveURL(`/${region}`);
  await expect(page.getByText(regex)).toBeVisible();
}
