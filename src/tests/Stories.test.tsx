import { test, expect} from '@playwright/test';

test.describe('App component - Stories Management', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.click('text=Меню');
    await page.click('text=Истории');
  });

  test('Открывает и закрывает меню при клике на кнопку "Управление историями"', async ({ page }) => {
    await page.click('text=Управление историями');
    await page.waitForTimeout(3000);
    await expect(page.locator('h3')).toBeVisible();
    await page.click('text=Управление историями');
    await page.waitForTimeout(3000);
    await expect(page.locator('h3')).toBeHidden();
  });

  test('Добавление новой истории', async ({ page }) => {
    await page.click('text=Управление историями');
    await page.waitForTimeout(3000);
    await page.fill('input[name="character"]', 'Новая История');
    await page.fill('textarea[name="text"]', 'Это текст новой истории.');
    await page.waitForTimeout(3000);
    await page.click('button:has-text("Добавить")');
    await page.waitForTimeout(3000);
    await expect (page.locator('text=Новая история')).toBeVisible();
  });

  test('Редактирование существующей истории', async ({ page }) => {
    await page.click('button:has(img[alt="Редактировать"])');
    await page.waitForTimeout(3000);
    await page.fill('input[name="character"]', 'Обновленная История');
    await page.fill('textarea[name="text"]', 'Это обновленный текст истории.');
    await page.waitForTimeout(3000);
    await page.click('text=Обновить');
    await page.waitForTimeout(3000);
    await expect (page.locator('text=Обновленная история')).toBeVisible();
  });

  test('Удаление истории', async ({ page }) => {
    await page.waitForTimeout(3000);
    await page.click('button:has(img[alt="Удалить"])');
    await page.waitForTimeout(3000);
    await expect(page.locator('text=История любви')).not.toBeVisible();
  });
});