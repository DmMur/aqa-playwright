import { test, expect } from "@playwright/test";

const val1 = "1111111111111111111111111111";
const val2 = "test@";
const val3 = "1";
const name = "Testen";
const email = "dmmuryhin+1@gmail.com";
const pwd1 = "Test1234";
const pwd2 = "Test12566";
const pwd3 = "Test1234";

const errors = [
  "Name is invalid",
  "Name has to be from 2 to 20",
  "Last name is invalid",
  "Last name has to be from 2 to 20 characters long",
  "Email is incorrect",
  "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter",
];

test.describe("Verification of qauto app", () => {
  test.describe.configure({ mode: "serial" });

  test("open main page", async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(500);
  });

  test("Registration", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Sign In" }).click();
    await page.getByRole("button", { name: "Registration" }).click();
    //Validation empty name, LastName, email, password
    await page.locator("#signupName").click();
    await page.locator("#signupName").fill("");
    await page.locator("#signupLastName").click();
    await page.locator("#signupEmail").click();
    await page.locator("#signupPassword").click();
    await page.locator("#signupRepeatPassword").click();
    page.getByText("Name required", {
      exact: true,
    });

    await expect(
      page.getByText("Name required", { exact: true })
    ).toBeVisible();
    await expect(
      page.getByText("Last name required", { exact: true })
    ).toBeVisible();
    await expect(
      page.getByText("Email required", { exact: true })
    ).toBeVisible();
    await expect(
      page.getByText("Password required", { exact: true })
    ).toBeVisible();
    await page.locator("#signupName").fill("");
    await expect(
      page.getByText("Re-enter password required", { exact: true })
    ).toBeVisible();

    //Validation invalid name, LastName, email, password

    await page.waitForTimeout(1000);
    await page.locator("#signupName").fill(val1);
    await page.locator("#signupLastName").fill(val1);
    await page.locator("#signupEmail").fill(val2);

    await expect(
      page.getByText("Name is invalid", { exact: true })
    ).toBeVisible();
    // await page.locator("app-signup-form  p:nth-child(2)").
    await page
      .getByText("Name has to be from 2 to 20 characters long", { exact: true })
      .click();
    //await page.getByText('Last name has to be from 2 to').click();

    await expect(page.getByText(errors[2], { exact: true })).toBeVisible();
    await page.waitForTimeout(1000);

    await expect(
      page.getByText("Last name has to be from 2 to 20 characters long", {
        exact: true,
      })
    ).toBeVisible();
    await page.waitForTimeout(1000);
    await expect(
      page.getByText("Email is incorrect", { exact: true })
    ).toBeVisible();
    await page.waitForTimeout(1000);

    await page.locator("#signupPassword").fill(val3);
    await expect(page.getByText(errors[5], { exact: true })).toBeVisible();
    await page.locator("#signupPassword").clear();
    await page.locator("#signupRepeatPassword").fill(val3);
    await page.getByText(errors[5]).click();
    await expect(page.getByText(errors[5], { exact: true })).toBeVisible();
    //Valid registration
    await page.locator("#signupName").clear();
    await page.locator("#signupName").fill(name);
    await page.locator("#signupLastName").clear();
    await page.locator("#signupLastName").fill(name);
    await page.locator("#signupEmail").clear();
    await page.locator("#signupEmail").fill(email);
    await page.locator("#signupPassword").clear();
    await page.locator("#signupPassword").fill(pwd1);
    await page.locator("#signupRepeatPassword").clear();
    await page.locator("#signupRepeatPassword").fill(pwd2);
    await page.getByText("Passwords do not match", { exact: true });
    await page.waitForTimeout(1000);
    await page.locator("#signupRepeatPassword").clear();
    await page.locator("#signupRepeatPassword").fill(pwd3);
    await page.locator(".modal-footer .btn.btn-primary").click();
  });
});
