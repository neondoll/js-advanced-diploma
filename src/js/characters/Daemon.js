import Character from '../Character';
import characterTypes from '../characterTypes';

/**
 * Класс соперника Daemon (Демон)
 *
 * @property-read attackRange - дальность атаки
 * @property-read moveRange - дальность движения
 */
export default class Daemon extends Character {
  /**
   * Конструктор класса Daemon
   *
   * @param level - уровень персонажа
   */
  constructor(level) {
    super(1, characterTypes.daemon);
    this.attack = 10;
    this.defence = 10;

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
