import { test, expect} from '@playwright/test';
test.describe('Quiz Component Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.click('text=Меню');
    await page.click('text=Тест');
    await page.click('text=ТЕСТ 2')
  });

  test('Проверка отображения вопросов и ответов', async ({ page }) => {
    const questions = await page.locator('div').allTextContents();
    expect(questions.length).toBeGreaterThan(0); 
    const buttons = await page.locator('button').count();
    expect(buttons).toBeGreaterThan(0);
    await page.waitForTimeout(3000);
  });

  test('Выбор ответа и получение диплома', async ({ page }) => {
    await page.click('text=Хотел отомстить');
    await expect(page.locator('button:has-text("Хотел отомстить")')).toHaveCSS('background-color', 'rgb(0, 128, 0)');
    await page.click('text=Имя игрушки');
    await expect(page.locator('button:has-text("Имя игрушки")')).toHaveCSS('background-color', 'rgb(255, 0, 0)');
    await page.click('text=Грелль');
    await page.click('text=Друзья');
    await page.click('text=Сома, мина');
    await page.waitForTimeout(3000);
    await page.click('text=Завершить тест');
    await expect(page.locator('h3')).toHaveText('Результаты: 3/5');
    await page.waitForTimeout(3000);
    await page.click('text=Получить диплом');
    await page.waitForTimeout(3000);
    await expect(page.locator('input[placeholder="Введите ваше имя"]')).toBeVisible();
    await page.fill('input[placeholder="Введите ваше имя"]', 'Катя');
await page.waitForTimeout(3000);await page.waitForTimeout(3000);
    await page.click('text=Подтвердить');
    await expect(page.locator('text=Диплом')).toBeVisible(); 
    await page.waitForTimeout(3000);
  });
});