import { expect, test } from "@playwright/test";

// Démo du cas passant, de bout en bout. Chaque itération ajoute ses étapes (test.step).
test("Démo : le cas passant", async ({ page }) => {
  await test.step("J'ouvre l'application", async () => {
    await page.goto("/");
    await expect(page.locator("body")).toBeVisible();
  });

  await test.step("Je vois la situation de la famille suivie", async () => {
    await expect(page.getByText("Famille Martin")).toBeVisible();
    await expect(page.getByText("Assistant social")).toBeVisible();
  });

  await test.step("Je rédige le rapport d'intervention", async () => {
    await page.getByText("Rédiger le rapport d'intervention").click();
    await expect(page.getByText("Rédigé par l'assistant")).toBeVisible();
    await expect(page.getByText(/Lors de la visite du 18 juin 2025/)).toBeVisible();
  });

  await test.step("Je reprends plus tard", async () => {
    await page.getByText("Reprendre plus tard").click();
    await expect(page.getByText("Que faire maintenant ?")).toBeVisible();
  });
});
