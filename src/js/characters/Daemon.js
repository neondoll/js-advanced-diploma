import Character from '../Character';
import characterTypes from '../characterTypes';

/**
 * Класс соперника Daemon (Демон)
 *
 * @property level - уровень персонажа, от 1 до 4
 */
export default class Daemon extends Character {
  constructor(level) {
    super(level, characterTypes.daemon);
    this.attack = 10;
    this.defence = 10;

    /**
     * `writable: false`     - запретить присвоение
     * `configurable: false` - запретить удаление
     */
    Object.defineProperties(this, {
      attackRange: { value: 4, writable: false, configurable: false },
      drivingRange: { value: 1, writable: false, configurable: false },
    });
  }
}
