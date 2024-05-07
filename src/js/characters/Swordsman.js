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
  }
}
