import Character from '../Character';
import characterTypes from '../characterTypes';

/**
 * Класс игрока Bowman (Лучник)
 *
 * @property level - уровень персонажа, от 1 до 4
 */
export default class Bowman extends Character {
  constructor(level) {
    super(1, characterTypes.bowman);
    this.attack = 25;
    this.defence = 25;

    for (let index = 1; index < level; index += 1) {
      this.levelUp();
    }

    /**
     * `writable: false`     - запретить присвоение
     * `configurable: false` - запретить удаление
     */
    Object.defineProperties(this, {
      attackRange: { value: 2, writable: false, configurable: false },
      moveRange: { value: 2, writable: false, configurable: false },
    });
  }
}
