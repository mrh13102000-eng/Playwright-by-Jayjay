import { test, expect } from "@playwright/test";

test.describe("Aplikasi user (E2E)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("mengambil user dan menampilkan 10 data", async ({ page }) => {
    await page.locator(".fetch-user-button").click();

    await expect(page.locator(".user-name")).toHaveCount(10);
  });

  test("form berhasil dikirim", async ({ page }) => {
    await page.locator(".name-input").fill("Budi");
    await page.locator(".email-input").fill("budi@mail.com");
    await page.locator(".phone-input").fill("08123456789");
    await page.locator(".post-user-button").click();

    await expect(page.locator(".success-response")).toHaveText(
      "Berhasil membuat user!",
    );
  });

  test("form gagal jika semua field kosong", async ({ page }) => {
    await page.locator(".post-user-button").click();

    await expect(page.locator(".fail-response")).toHaveText(
      "Masukan data user!",
    );
    await expect(page.locator(".success-response")).toHaveCount(0);
  });
});
