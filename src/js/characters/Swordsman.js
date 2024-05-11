import Character from '../Character';
import characterTypes from '../characterTypes';

/**
 * Класс игрока Swordsman (Мечник)
 *
 * @property-read attackRange - дальность атаки
 * @property-read moveRange - дальность движения
 */
export default class Swordsman extends Character {
  /**
   * Конструктор класса Swordsman
   *
   * @param level - уровень персонажа
   */
  constructor(level) {
    super(1, characterTypes.swordsman);
    this.attack = 40;
    this.defence = 10;

    for (let index = 1; index < level; index += 1) {
      this.levelUp();
    }

    // `writable: false`     - запретить присвоение
    // `configurable: false` - запретить удаление
    Object.defineProperties(this, {
      attackRange: { value: 1, writable: false, configurable: false },
      moveRange: { value: 4, writable: false, configurable: false },
    });
  }
}
