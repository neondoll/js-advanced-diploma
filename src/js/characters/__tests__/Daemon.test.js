import Character from '../../Character';
import Daemon from '../Daemon';

describe('class Daemon', () => {
  test('testing instance of', () => {
    const result = new Daemon(1);

    expect(result).toBeInstanceOf(Character);
    expect(result).toBeInstanceOf(Daemon);
  });

  test('testing creation', () => {
    const result = new Daemon(1);

    expect(result).toEqual({
      attack: 10, defence: 10, health: 50, level: 1, type: 'daemon',
    });
  });

  test('testing getting brief information', () => {
    const character = new Daemon(1);

    const result = character.briefInformation;

    expect(result).toBe(`🎖${character.level} ⚔${character.attack} 🛡${character.defence} ❤${character.health}`);
  });

  test('testing getting driving range', () => {
    const character = new Daemon(1);

    const result = character.drivingRange;

    expect(result).toBe(1);
  });

  test('testing getting attack range', () => {
    const character = new Daemon(1);

    const result = character.attackRange;

    expect(result).toBe(4);
  });
});
