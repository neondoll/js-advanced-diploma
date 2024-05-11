import Bowman from '../Bowman';
import Character from '../../Character';

describe('class Bowman', () => {
  test.each([
    {
      attack: 25, defence: 25, health: 50, level: 1,
    },
    {
      attack: 57, defence: 57, health: 100, level: 3,
    },
  ])('new Bowman($level)', ({
    attack, defence, health, level,
  }) => {
    expect(new Bowman(level)).toEqual({
      attack, defence, health, level, type: 'bowman',
    });
  });
  describe('[Bowman]', () => {
    let character;

    beforeAll(() => { character = new Bowman(1); });

    test('instance of Character and Bowman', () => {
      expect(character).toBeInstanceOf(Character);
      expect(character).toBeInstanceOf(Bowman);
    });
    test('.attackRange', () => expect(character.attackRange).toBe(2));
    test('.moveRange', () => expect(character.moveRange).toBe(2));
  });
});
