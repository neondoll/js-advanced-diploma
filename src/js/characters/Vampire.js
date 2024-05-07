import Character from '../Character';
import characterTypes from '../characterTypes';

/**
 * Класс соперника Vampire (Вампир)
 *
 * @property level - уровень персонажа, от 1 до 4
 */
export default class Vampire extends Character {
  constructor(level) {
    super(level, characterTypes.vampire);
    this.attack = 25;
    this.defence = 25;
  }
}
