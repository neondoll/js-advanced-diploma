import Character from '../../Character';
import Undead from '../Undead';

describe('class Undead', () => {
  test('testing instance of', () => {
    const result = new Undead(1);

    expect(result).toBeInstanceOf(Character);
    expect(result).toBeInstanceOf(Undead);
  });

  test('testing creation', () => {
    const result = new Undead(1);

    expect(result).toEqual({
      attack: 40, defence: 10, health: 50, level: 1, type: 'undead',
    });
  });

  test('testing getting briefInformation', () => {
    const character = new Undead(1);

    const result = character.briefInformation;

    expect(result).toBe(`\u{1F396}${character.level} \u{2694}${character.attack} \u{1F6E1}${character.defence} \u{2764}${character.health}`);
  });

  test('testing getting moveRange', () => {
    const character = new Undead(1);

    const result = character.moveRange;

    expect(result).toBe(4);
  });

  test('testing getting attackRange', () => {
    const character = new Undead(1);

    const result = character.attackRange;

    expect(result).toBe(1);
  });

  test('testing creation with level 3', () => {
    const result = new Undead(3);

    expect(result).toEqual({
      attack: 93, defence: 23, health: 100, level: 3, type: 'undead',
    });
  });
});
