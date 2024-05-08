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

  test('testing getting brief information', () => {
    const character = new Vampire(1);

    const result = character.briefInformation;

    expect(result).toBe(`🎖${character.level} ⚔${character.attack} 🛡${character.defence} ❤${character.health}`);
  });
});
