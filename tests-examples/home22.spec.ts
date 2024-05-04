import { test, expect, request } from "@playwright/test";
import { LoginPage } from "./loginPage";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});
test("check user profile", async ({ page, request }) => {
  const loginpage = new LoginPage(page);
  //await page.goto("/");
  await loginpage.loginWithDefaultParams();
  const button = await loginpage.buttonLogin();
  await expect(button).toBeVisible();
  await button.click();
  await page.getByRole("link", { name: "Profile" }).click();

  //   page.on("response", (response) =>
  //     console.log("<<", response.status(), response.url())
  //   );

  await page.route("**/api/users/profile", async (route) => {
    const json = {
      status: "ok",
      data: {
        userId: 107455,
        photoFilename: "./222.png",
        name: "",
        lastName: "Dmytro2233",
      },
    };
    await route.fulfill({ json });
  });

  await page.goto("panel/profile");
  await page.screenshot({ path: "screenshot2.png", fullPage: true });
  await expect(page.locator("div.panel-page_heading h1")).toHaveText("Profile");
  await expect(page.locator(".profile_name.display-4")).toHaveText(
    "Dmytro2233"
  );
});
