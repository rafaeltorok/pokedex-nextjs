import { expect } from "@playwright/test";
import type { Page } from "@playwright/test";

export async function navigateToPokémonPage(
  page: Page,
  id: string,
  name: string,
) {
  // Navigate to the Pokémon page
  await page.goto(`/kanto/${name.toLowerCase()}`);

  // Confirm it is the correct page
  await expect(page.getByText(`# ${id}`)).toBeVisible();
  await expect(page.getByText(new RegExp(name, "i"))).toBeVisible();
}
