import Character from '../../Character';
import Undead from '../Undead';

describe('class Undead', () => {
  test.each([
    {
      attack: 40, defence: 10, health: 50, level: 1,
    },
    {
      attack: 93, defence: 23, health: 100, level: 3,
    },
  ])('new Undead($level)', ({
    attack, defence, health, level,
  }) => {
    expect(new Undead(level)).toEqual({
      attack, defence, health, level, type: 'undead',
    });
  });
  describe('[Undead]', () => {
    let character;

    beforeAll(() => { character = new Undead(1); });

    test('instance of Character and Undead', () => {
      expect(character).toBeInstanceOf(Character);
      expect(character).toBeInstanceOf(Undead);
    });
    test('.attackRange', () => expect(character.attackRange).toBe(1));
    test('.moveRange', () => expect(character.moveRange).toBe(4));
  });
});
