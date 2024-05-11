import Character from '../../Character';
import Swordsman from '../Swordsman';

describe('class Swordsman', () => {
  test.each([
    {
      attack: 40, defence: 10, health: 50, level: 1,
    },
    {
      attack: 93, defence: 23, health: 100, level: 3,
    },
  ])('new Swordsman($level)', ({
    attack, defence, health, level,
  }) => {
    expect(new Swordsman(level)).toEqual({
      attack, defence, health, level, type: 'swordsman',
    });
  });
  describe('[Swordsman]', () => {
    let character;

    beforeAll(() => { character = new Swordsman(1); });

    test('instance of Character and Swordsman', () => {
      expect(character).toBeInstanceOf(Character);
      expect(character).toBeInstanceOf(Swordsman);
    });
    test('.attackRange', () => expect(character.attackRange).toBe(1));
    test('.moveRange', () => expect(character.moveRange).toBe(4));
  });
});
