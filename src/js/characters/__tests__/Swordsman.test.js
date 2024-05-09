import Character from '../../Character';
import Swordsman from '../Swordsman';

describe('class Swordsman', () => {
  test('testing instance of', () => {
    const result = new Swordsman(1);

    expect(result).toBeInstanceOf(Character);
    expect(result).toBeInstanceOf(Swordsman);
  });

  test('testing creation', () => {
    const result = new Swordsman(1);

    expect(result).toEqual({
      attack: 40, defence: 10, health: 50, level: 1, type: 'swordsman',
    });
  });

  test('testing getting briefInformation', () => {
    const character = new Swordsman(1);

    const result = character.briefInformation;

    expect(result).toBe(`\u{1F396}${character.level} \u{2694}${character.attack} \u{1F6E1}${character.defence} \u{2764}${character.health}`);
  });

  test('testing getting moveRange', () => {
    const character = new Swordsman(1);

    const result = character.moveRange;

    expect(result).toBe(4);
  });

  test('testing getting attackRange', () => {
    const character = new Swordsman(1);

    const result = character.attackRange;

    expect(result).toBe(1);
  });

  test('testing creation with level 3', () => {
    const result = new Swordsman(3);

    expect(result).toEqual({
      attack: 93, defence: 23, health: 100, level: 3, type: 'swordsman',
    });
  });
});
