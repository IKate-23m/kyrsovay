import { test, expect} from '@playwright/test';
test.describe('PuzzleBoard component - Leaderboard Toggle', () => {
  // Перед каждым тестом переходим на главную страницу
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.click("text=Меню");
    await page.click("text=Пазлы");
  });

  test('Показать и скрыть таблицу лидеров при клике на ссылку', async ({ page }) => {
    await expect(page.locator('text=Скрыть таблицу лидеров')).toBeHidden();
    await page.waitForTimeout(3000);
    await page.click('text=Показать таблицу лидеров');
    await page.waitForTimeout(3000);
    await expect(page.locator('text=Скрыть таблицу лидеров')).toBeVisible();
    await expect(page.locator('text=Таблица лидеров')).toBeVisible(); 
    await page.click('text=Скрыть таблицу лидеров');
    await page.waitForTimeout(3000);
    await expect(page.locator('text=Скрыть таблицу лидеров')).toBeHidden();
  });
  test ('Нажатие на фрагмен пазла изменяет его URl',async ({page})=>{
    const beforetiles = await page.$$('.puzzle-board div');
    await page.click('.puzzle-board div:nth-child(1)');
    await page.waitForTimeout(3000);
    await page.click('.puzzle-board div:nth-child(2)');
    await page.waitForTimeout(3000);
    await page.click('.puzzle-board div:nth-child(3)');
    await page.waitForTimeout(3000);
    await page.click('.puzzle-board div:nth-child(4)');
    await page.waitForTimeout(3000);
    await page.click('.puzzle-board div:nth-child(5)');
    await page.waitForTimeout(3000);
    await page.click('.puzzle-board div:nth-child(6)');
    await page.click('.puzzle-board div:nth-child(7)');
    await page.click('.puzzle-board div:nth-child(8)');
    await page.waitForTimeout(3000);
    const aftertiles = await page.$$('.puzzle-board div');
    expect(aftertiles).not.toEqual(beforetiles); 
  });
    test ('Проверка функций пазла',async ({page})=>{
      const beforetiles = await page.$$('.puzzle-board div');
      await page.waitForTimeout(3000);
      await page.click('text=Перемешать пазл');
      await page.waitForTimeout(3000);
      const aftertiles = await page.$$('.puzzle-board div');
      expect(aftertiles).not.toEqual(beforetiles); 
      await page.click('text=Быстрый выигрыш');
      await page.waitForTimeout(3000);
      await expect(page.locator('input[placeholder="Введите ваше имя"]')).toBeVisible();
      await page.fill('input[placeholder="Введите ваше имя"]', 'Катя');
      await page.waitForTimeout(3000);
      await page.click('text=Добавить в таблицу');
      await page.waitForTimeout(3000);
      await page.click('text=Показать таблицу лидеров');
      await page.waitForTimeout(3000);
      await expect(page.locator('text=Катя')).toBeVisible();
      await page.waitForTimeout(3000);
  });
});