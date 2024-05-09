import Character from '../Character';
import characterTypes from '../characterTypes';

/**
 * Класс игрока Magician (Маг)
 *
 * @property level - уровень персонажа, от 1 до 4
 */
export default class Magician extends Character {
  constructor(level) {
    super(level, characterTypes.magician);
    this.attack = 10;
    this.defence = 40;

    /**
     * `writable: false`     - запретить присвоение
     * `configurable: false` - запретить удаление
     */
    Object.defineProperties(this, {
      attackRange: { value: 4, writable: false, configurable: false },
      moveRange: { value: 1, writable: false, configurable: false },
    });
  }
}
