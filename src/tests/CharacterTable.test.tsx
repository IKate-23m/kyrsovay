import { test, expect} from '@playwright/test';
  test.describe('CharacterTable component - Menu Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('Открывает и закрывает меню при клике на кнопку "Список персонажей"', async ({ page }) => {
    await page.click('text=Список персонажей');
    await expect(page.locator('ul')).toBeVisible();
    await page.waitForTimeout(3000);
    await page.click('text=2');
    await page.waitForTimeout(3000);
    await page.click ('text= Гробовщик')
    await page.waitForTimeout(3000);
    const CharacterName = await page.locator('h2').innerText();
    expect(CharacterName).toBe("Гробовщик");
  });

  test('Навигация между персонажами', async ({ page }) => {
    const firstCharacterName = await page.locator('h2').innerText();
    await page.click('text=Следующий');
    await page.waitForTimeout(3000);
    const nextCharacterName = await page.locator('h2').innerText();
    expect(nextCharacterName).not.toBe(firstCharacterName);
    await page.click('text=Предыдущий');
    await page.waitForTimeout(3000);
    const previousCharacterName = await page.locator('h2').innerText();
    expect(previousCharacterName).toBe(firstCharacterName);
  });
});