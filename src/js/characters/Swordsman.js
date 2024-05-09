import Character from '../Character';
import characterTypes from '../characterTypes';

/**
 * Класс игрока Swordsman (Мечник)
 *
 * @property level - уровень персонажа, от 1 до 4
 */
export default class Swordsman extends Character {
  constructor(level) {
    super(level, characterTypes.swordsman);
    this.attack = 40;
    this.defence = 10;

    /**
     * `writable: false`     - запретить присвоение
     * `configurable: false` - запретить удаление
     */
    Object.defineProperties(this, {
      attackRange: { value: 1, writable: false, configurable: false },
      moveRange: { value: 4, writable: false, configurable: false },
    });
  }
}
