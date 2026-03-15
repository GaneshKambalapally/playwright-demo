class TodoPage {

  constructor(page) {
    this.page          = page;
    this.newTodoInput  = page.getByPlaceholder('What needs to be done?');
    this.todoItems     = page.locator('.todo-list li');
    this.itemCount     = page.locator('.todo-count');
    this.clearCompleted = page.getByRole('button', { name: 'Clear completed' });
  }

  async goto() {
    await this.page.goto('https://demo.playwright.dev/todomvc');
  }

  async addTodo(text) {
    await this.newTodoInput.fill(text);
    await this.newTodoInput.press('Enter');
  }

  async completeTodo(index = 0) {
    await this.todoItems.nth(index).locator('.toggle').check();
  }

  async deleteTodo(index = 0) {
    await this.todoItems.nth(index).hover();
    await this.todoItems.nth(index).locator('button.destroy').click();
  }

  async filterActive() {
    await this.page.getByRole('link', { name: 'Active' }).click();
  }

  async filterCompleted() {
    await this.page.getByRole('link', { name: 'Completed' }).click();
  }

  async getTodoCount() {
    return await this.todoItems.count();
  }
}

module.exports = { TodoPage };