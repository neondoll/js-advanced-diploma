import Character from '../../Character';
import Undead from '../Undead';

test('Testing Undead creation', () => {
  const result = new Undead(1);

  expect(result).toBeInstanceOf(Character);
  expect(result).toBeInstanceOf(Undead);
  expect(result).toEqual({
    attack: 40, defence: 10, health: 50, level: 1, type: 'undead',
  });
});
