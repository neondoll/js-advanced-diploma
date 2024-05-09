import Character from '../../Character';
import Vampire from '../Vampire';

describe('class Vampire', () => {
  test('testing instance of', () => {
    const result = new Vampire(1);

    expect(result).toBeInstanceOf(Character);
    expect(result).toBeInstanceOf(Vampire);
  });

  test('testing creation', () => {
    const result = new Vampire(1);

    expect(result).toEqual({
      attack: 25, defence: 25, health: 50, level: 1, type: 'vampire',
    });
  });

  test('testing getting briefInformation', () => {
    const character = new Vampire(1);

    const result = character.briefInformation;

    expect(result).toBe(`\u{1F396}${character.level} \u{2694}${character.attack} \u{1F6E1}${character.defence} \u{2764}${character.health}`);
  });

  test('testing getting moveRange', () => {
    const character = new Vampire(1);

    const result = character.moveRange;

    expect(result).toBe(2);
  });

  test('testing getting attackRange', () => {
    const character = new Vampire(1);

    const result = character.attackRange;

    expect(result).toBe(2);
  });

  test('testing creation with level 3', () => {
    const result = new Vampire(3);

    expect(result).toEqual({
      attack: 57, defence: 57, health: 100, level: 3, type: 'vampire',
    });
  });
});
