import Character from '../Character';
import characterTypes from '../characterTypes';

/**
 * Класс игрока Bowman (Лучник)
 * @property level - уровень персонажа, от 1 до 4
 */
export default class Bowman extends Character {
  constructor(level) {
    super(level, characterTypes.bowman);
    this.attack = 25;
    this.defence = 25;
  }
}
