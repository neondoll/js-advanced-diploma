import Character from '../Character';
import characterTypes from '../characterTypes';

/**
 * Класс соперника Undead (Восставший из мёртвых)
 *
 * @property level - уровень персонажа, от 1 до 4
 */
export default class Undead extends Character {
  constructor(level) {
    super(level, characterTypes.undead);
    this.attack = 40;
    this.defence = 10;
  }
}
