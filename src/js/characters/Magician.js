import Character from '../Character';
import characterTypes from '../characterTypes';

/**
 * Класс игрока Magician (Маг)
 *
 * @property-read attackRange - дальность атаки
 * @property-read moveRange - дальность движения
 */
export default class Magician extends Character {
  /**
   * Конструктор класса Magician
   *
   * @param level - уровень персонажа
   */
  constructor(level) {
    super(1, characterTypes.magician);
    this.attack = 10;
    this.defence = 40;

    for (let index = 1; index < level; index += 1) {
      this.levelUp();
    }

    // `writable: false`     - запретить присвоение
    // `configurable: false` - запретить удаление
    Object.defineProperties(this, {
      attackRange: { value: 4, writable: false, configurable: false },
      moveRange: { value: 1, writable: false, configurable: false },
    });
  }
}
