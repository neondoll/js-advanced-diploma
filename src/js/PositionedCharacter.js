import Character from './Character';

/**
 * Персонаж, привязанный к координате на поле
 *
 * @property character - персонаж
 * @property position - координата на поле
 */
export default class PositionedCharacter {
  /**
   * Конструктор класса PositionedCharacter
   *
   * @param character - персонаж
   * @param position - координата на поле
   */
  constructor(character, position) {
    if (!(character instanceof Character)) {
      throw new Error('character must be instance of Character or its children');
    }

    if (typeof position !== 'number') {
      throw new Error('position must be a number');
    }

    this.character = character;
    this.position = position;
  }

  /**
   * Определяет, может ли персонаж атаковать
   *
   * @param position - проверяемая координата на поле
   * @param boardSize - размер поля
   * @returns boolean
   */
  canAttack(position, boardSize) {
    const thisPositionColumn = this.position % boardSize;
    const thisPositionRow = Math.floor(this.position / boardSize);
    const positionColumn = position % boardSize;
    const positionRow = Math.floor(position / boardSize);

    const columnDifference = Math.abs(thisPositionColumn - positionColumn);
    const rowDifference = Math.abs(thisPositionRow - positionRow);

    return columnDifference <= this.character.attackRange
      && rowDifference <= this.character.attackRange;
  }

  /**
   * Определяет, может ли персонаж переместиться
   *
   * @param position - проверяемая координата на поле
   * @param boardSize - размер поля
   * @returns boolean
   */
  canMove(position, boardSize) {
    const thisPositionColumn = this.position % boardSize;
    const thisPositionRow = Math.floor(this.position / boardSize);
    const positionColumn = position % boardSize;
    const positionRow = Math.floor(position / boardSize);

    const columnDifference = Math.abs(thisPositionColumn - positionColumn);
    const rowDifference = Math.abs(thisPositionRow - positionRow);

    return columnDifference <= this.character.moveRange
      && rowDifference <= this.character.moveRange
      && (columnDifference === 0 || rowDifference === 0 || columnDifference === rowDifference);
  }

  /**
   * Определяет принадлежность персонажа классу
   *
   * @param Class - один класс или массив классов
   * @returns boolean
   */
  characterInstanceOf(Class) {
    if (Array.isArray(Class)) {
      return Boolean(Class.filter((c) => this.character instanceof c).length);
    }

    return this.character instanceof Class;
  }
}
