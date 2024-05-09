import Character from './Character';

export default class PositionedCharacter {
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
   * Определяет возможность атаки персонажа
   *
   * @param position - проверяемая позиция
   * @param boardSize - размер поля
   * @returns {boolean}
   */
  canAttack(position, boardSize) {
    const positionColumn = position % boardSize;
    const positionRow = Math.floor(position / boardSize);
    const thisPositionColumn = this.position % boardSize;
    const thisPositionRow = Math.floor(this.position / boardSize);

    return Math.abs(positionRow - thisPositionRow) <= this.character.attackRange
      && Math.abs(positionColumn - thisPositionColumn) <= this.character.attackRange;
  }

  /**
   * Определяет возможность перемещения персонажа
   *
   * @param position - проверяемая позиция
   * @param boardSize - размер поля
   * @returns {boolean}
   */
  canDriving(position, boardSize) {
    const positionColumn = position % boardSize;
    const positionRow = Math.floor(position / boardSize);
    const thisPositionColumn = this.position % boardSize;
    const thisPositionRow = Math.floor(this.position / boardSize);

    switch (true) {
    case positionColumn === thisPositionColumn:
      return Math.abs(positionRow - thisPositionRow) <= this.character.drivingRange;
    case positionRow === thisPositionRow:
      return Math.abs(positionColumn - thisPositionColumn) <= this.character.drivingRange;
    case positionColumn + positionRow === thisPositionColumn + thisPositionRow:
    case positionColumn - positionRow === thisPositionColumn - thisPositionRow:
      return Math.abs(positionRow - thisPositionRow) <= this.character.drivingRange
          && Math.abs(positionColumn - thisPositionColumn) <= this.character.drivingRange;
    default:
      return false;
    }
  }

  /**
   * Определяет принадлежность персонажа классу
   *
   * @param Class - один класс или массив классов
   * @returns {boolean}
   */
  characterInstanceOf(Class) {
    if (Array.isArray(Class)) {
      return Boolean(Class.filter((c) => this.character instanceof c).length);
    }

    return this.character instanceof Class;
  }
}
