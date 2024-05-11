import Character from '../../Character';
import Vampire from '../Vampire';

describe('class Vampire', () => {
  test.each([
    {
      attack: 25, defence: 25, health: 50, level: 1,
    },
    {
      attack: 57, defence: 57, health: 100, level: 3,
    },
  ])('new Vampire($level)', ({
    attack, defence, health, level,
  }) => {
    expect(new Vampire(level)).toEqual({
      attack, defence, health, level, type: 'vampire',
    });
  });
  describe('[Vampire]', () => {
    let character;

    beforeAll(() => { character = new Vampire(1); });

    test('instance of Character and Vampire', () => {
      expect(character).toBeInstanceOf(Character);
      expect(character).toBeInstanceOf(Vampire);
    });
    test('.attackRange', () => expect(character.attackRange).toBe(2));
    test('.moveRange', () => expect(character.moveRange).toBe(2));
  });
});
