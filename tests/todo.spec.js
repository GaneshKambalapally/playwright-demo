const { test, expect } = require('@playwright/test');

const TODO_URL = 'https://demo.playwright.dev/todomvc';

test.describe('Todo App — Basic Tests', () => {

  test('Page loads with correct title', async ({ page }) => {
    await page.goto(TODO_URL);
    await expect(page).toHaveTitle(/TodoMVC/);
  });

  test('Can add a new todo item', async ({ page }) => {
    await page.goto(TODO_URL);
    await page.getByPlaceholder('What needs to be done?').fill('Buy groceries');
    await page.getByPlaceholder('What needs to be done?').press('Enter');
    await expect(page.getByText('Buy groceries')).toBeVisible();
  });

  test('Can mark a todo as complete', async ({ page }) => {
    await page.goto(TODO_URL);
    await page.getByPlaceholder('What needs to be done?').fill('Write test cases');
    await page.getByPlaceholder('What needs to be done?').press('Enter');
    await page.locator('.todo-list li').last().locator('.toggle').check();
    await expect(page.locator('.todo-list li').last()).toHaveClass(/completed/);
  });

});