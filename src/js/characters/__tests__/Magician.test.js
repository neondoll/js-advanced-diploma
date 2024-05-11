import Character from '../../Character';
import Magician from '../Magician';

describe('class Magician', () => {
  test.each([
    {
      attack: 10, defence: 40, health: 50, level: 1,
    },
    {
      attack: 23, defence: 93, health: 100, level: 3,
    },
  ])('new Magician($level)', ({
    attack, defence, health, level,
  }) => {
    expect(new Magician(level)).toEqual({
      attack, defence, health, level, type: 'magician',
    });
  });
  describe('[Magician]', () => {
    let character;

    beforeAll(() => { character = new Magician(1); });

    test('instance of Character and Magician', () => {
      expect(character).toBeInstanceOf(Character);
      expect(character).toBeInstanceOf(Magician);
    });
    test('.attackRange', () => expect(character.attackRange).toBe(4));
    test('.moveRange', () => expect(character.moveRange).toBe(1));
  });
});
