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

  test('testing getting brief information', () => {
    const character = new Magician(1);

    const result = character.briefInformation;

    expect(result).toBe(`🎖${character.level} ⚔${character.attack} 🛡${character.defence} ❤${character.health}`);
  });
});
