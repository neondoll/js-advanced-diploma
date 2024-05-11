/**
 * Класс для команды (набор персонажей), представляющих компьютер и игрока
 *
 * @property characterSet - набор персонажей
 * @property-read characters - массив персонажей
 *
 * @example
 * ```js
 * const characters = [new Swordsman(2), new Bowman(1)]
 * const team = new Team(characters);
 *
 * team.characters // [swordsman, bowman]
 * ```
 */
export default class Team {
  /**
   * Конструктор класса Team
   *
   * @param characters - массив персонажей
   */
  constructor(characters = []) { this.characterSet = new Set(characters); }

  /**
   * Добавление одного персонажа
   *
   * @param character - персонаж
   * @returns Set<Character> - набор персонажей
   */
  add(character) {
    if (this.characterSet.has(character)) {
      throw new Error('Персонаж уже добавлен в команду!');
    }

    return this.characterSet.add(character);
  }

  /**
   * Добавление нескольких персонажей
   *
   * @param characters - персонажи
   * @returns Set<Character> - набор персонажей
   */
  addAll(...characters) {
    characters.forEach((character) => {
      if (!this.characterSet.has(character)) {
        this.characterSet.add(character);
      }
    });

    return this.characterSet;
  }

  /**
   * Массив персонажей
   *
   * @returns Array<Character>
   */
  get characters() { return [...this.characterSet]; }
}
