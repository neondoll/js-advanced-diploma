import Character from '../Character';
import characterTypes from '../characterTypes';

/**
 * Класс соперника Vampire (Вампир)
 *
 * @property-read attackRange - дальность атаки
 * @property-read moveRange - дальность движения
 */
export default class Vampire extends Character {
  /**
   * Конструктор класса Vampire
   *
   * @param level - уровень персонажа
   */
  constructor(level) {
    super(1, characterTypes.vampire);
    this.attack = 25;
    this.defence = 25;

    for (let index = 1; index < level; index += 1) {
      this.levelUp();
    }

    // `writable: false`     - запретить присвоение
    // `configurable: false` - запретить удаление
    Object.defineProperties(this, {
      attackRange: { value: 2, writable: false, configurable: false },
      moveRange: { value: 2, writable: false, configurable: false },
    });
  }
}
