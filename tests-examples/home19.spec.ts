import { test, expect } from "@playwright/test";

import { testData } from "../tests-examples/components/testdata";

import { errors } from "../tests-examples/components/testdata";

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
    await page.locator("#signupName").fill(testData.val1);
    await page.locator("#signupLastName").fill(testData.val1);
    await page.locator("#signupEmail").fill(testData.val2);

    await expect(page.getByText(errors.error1, { exact: true })).toBeVisible();
    // await page.locator("app-signup-form  p:nth-child(2)").
    await page
      .getByText("Name has to be from 2 to 20 characters long", { exact: true })
      .click();
    //await page.getByText('Last name has to be from 2 to').click();

    await expect(page.getByText(errors.error3, { exact: true })).toBeVisible();
    await page.waitForTimeout(1000);

    await expect(
      page.getByText(errors.error4, {
        exact: true,
      })
    ).toBeVisible();
    await page.waitForTimeout(1000);
    await expect(page.getByText(errors.error5, { exact: true })).toBeVisible();
    await page.waitForTimeout(1000);

    await page.locator("#signupPassword").fill(testData.val3);
    await expect(page.getByText(errors.error6, { exact: true })).toBeVisible();
    await page.locator("#signupPassword").clear();
    await page.locator("#signupRepeatPassword").fill(testData.val3);
    await page.getByText(errors.error6).click();
    await expect(page.getByText(errors.error6, { exact: true })).toBeVisible();
    //Valid registration
    await page.locator("#signupName").clear();
    await page.locator("#signupName").fill(testData.name);
    await page.locator("#signupLastName").clear();
    await page.locator("#signupLastName").fill(testData.name);
    await page.locator("#signupEmail").clear();
    await page.locator("#signupEmail").fill(testData.email);
    await page.locator("#signupPassword").clear();
    await page.locator("#signupPassword").fill(testData.pwd1);
    await page.locator("#signupRepeatPassword").clear();
    await page.locator("#signupRepeatPassword").fill(testData.pwd2);
    await page.getByText("Passwords do not match", { exact: true });
    await page.waitForTimeout(1000);
    await page.locator("#signupRepeatPassword").clear();
    await page.locator("#signupRepeatPassword").fill(testData.pwd3);
    await page.locator(".modal-footer .btn.btn-primary").click();
  });
});
