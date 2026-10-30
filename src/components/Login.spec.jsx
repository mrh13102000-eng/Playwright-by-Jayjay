import { test, expect } from "@playwright/experimental-ct-react";
import Login from "./Login";

test.describe("Login component", () => {
  test("mengambil user dan menampilkan 10 data", async ({ mount }) => {
    const component = await mount(<Login />);

    await component.locator(".fetch-user-button").click();

    await expect(component.locator(".user-name")).toHaveCount(10);
  });

  test("form berhasil dikirim", async ({ mount }) => {
    const component = await mount(<Login />);

    await component.locator(".name-input").fill("Budi");
    await component.locator(".email-input").fill("budi@mail.com");
    await component.locator(".phone-input").fill("08123456789");
    await component.locator(".post-user-button").click();

    await expect(component.locator(".success-response")).toHaveText(
      "Berhasil membuat user!",
    );
    await expect(component.locator(".fail-response")).toHaveCount(0);
  });

  test("form gagal jika semua field kosong", async ({ mount }) => {
    const component = await mount(<Login />);

    await component.locator(".post-user-button").click();

    await expect(component.locator(".fail-response")).toHaveText(
      "Masukan data user!",
    );
    await expect(component.locator(".success-response")).toHaveCount(0);
  });
});
