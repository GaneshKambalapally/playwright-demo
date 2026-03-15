const { test, expect } = require('@playwright/test');
const { TodoPage }     = require('../pages/TodoPage');

test.describe('Todo App — POM Tests', () => {

  let todoPage;

  test.beforeEach(async ({ page }) => {
    todoPage = new TodoPage(page);
    await todoPage.goto();
  });

  test('Add multiple todo items', async () => {
    const countBefore = await todoPage.getTodoCount();

    await todoPage.addTodo('Write test plan');
    await todoPage.addTodo('Execute smoke tests');
    await todoPage.addTodo('Raise defects');

    const countAfter = await todoPage.getTodoCount();
    expect(countAfter).toBe(countBefore + 3);  // handles pre-loaded items
  });

  test('Filter shows only active items', async ({ page }) => {
    await todoPage.addTodo('Task One');
    await todoPage.addTodo('Task Two');

    // Complete first added task (last in list since defaults exist)
    const total = await todoPage.getTodoCount();
    await todoPage.completeTodo(total - 2);

    await todoPage.filterActive();

    await expect(page.getByText('Task Two')).toBeVisible();
  });

  test('Item count updates when todo added', async ({ page }) => {
    // Clear state by filtering — count the active ones only
    const before = await todoPage.getTodoCount();
    await todoPage.addTodo('First item');
    await expect(todoPage.todoItems).toHaveCount(before + 1);

    await todoPage.addTodo('Second item');
    await expect(todoPage.todoItems).toHaveCount(before + 2);
  });

  test('Completed filter shows only done items', async ({ page }) => {
    await todoPage.addTodo('Done task');
    await todoPage.addTodo('Pending task');

    const total = await todoPage.getTodoCount();
    await todoPage.completeTodo(total - 2); // complete 'Done task'

    await todoPage.filterCompleted();

    await expect(page.getByText('Done task')).toBeVisible();
    await expect(page.getByText('Pending task')).toBeHidden();
  });
//     test('INTENTIONAL FAIL — delete after testing', async ({ page }) => {
//     await todoPage.goto();
//     // This will fail — wrong text
//     await expect(page.getByText('This text does not exist')).toBeVisible();
//   });

});