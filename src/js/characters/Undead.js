import Character from '../Character';
import characterTypes from '../characterTypes';

/**
 * Класс соперника Undead (Восставший из мёртвых)
 *
 * @property level - уровень персонажа, от 1 до 4
 */
export default class Undead extends Character {
  constructor(level) {
    super(1, characterTypes.undead);
    this.attack = 40;
    this.defence = 10;

    for (let index = 1; index < level; index += 1) {
      this.levelUp();
    }

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
