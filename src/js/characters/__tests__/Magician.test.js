import Character from '../../Character';
import Magician from '../Magician';

describe('class Magician', () => {
  test('testing instance of', () => {
    const result = new Magician(1);

    expect(result).toBeInstanceOf(Character);
    expect(result).toBeInstanceOf(Magician);
  });

  test('testing creation', () => {
    const result = new Magician(1);

    expect(result).toEqual({
      attack: 10, defence: 40, health: 50, level: 1, type: 'magician',
    });
  });

  test('testing getting briefInformation', () => {
    const character = new Magician(1);

    const result = character.briefInformation;

    expect(result).toBe(`\u{1F396}${character.level} \u{2694}${character.attack} \u{1F6E1}${character.defence} \u{2764}${character.health}`);
  });

  test('testing getting moveRange', () => {
    const character = new Magician(1);

    const result = character.moveRange;

    expect(result).toBe(1);
  });

  test('testing getting attackRange', () => {
    const character = new Magician(1);

    const result = character.attackRange;

    expect(result).toBe(4);
  });
});
