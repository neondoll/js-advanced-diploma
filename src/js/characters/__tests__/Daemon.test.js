import Character from '../../Character';
import Daemon from '../Daemon';

describe('class Daemon', () => {
  test.each([
    {
      attack: 10, defence: 10, health: 50, level: 1,
    },
    {
      attack: 23, defence: 23, health: 100, level: 3,
    },
  ])('new Daemon($level)', ({
    attack, defence, health, level,
  }) => {
    expect(new Daemon(level)).toEqual({
      attack, defence, health, level, type: 'daemon',
    });
  });
  describe('[Daemon]', () => {
    let character;

    beforeAll(() => { character = new Daemon(1); });

    test('instance of Character and Daemon', () => {
      expect(character).toBeInstanceOf(Character);
      expect(character).toBeInstanceOf(Daemon);
    });
    test('.attackRange', () => expect(character.attackRange).toBe(4));
    test('.moveRange', () => expect(character.moveRange).toBe(1));
  });
});
