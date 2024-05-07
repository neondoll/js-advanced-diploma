import Character from '../../Character';
import Swordsman from '../Swordsman';

test('Testing Swordsman creation', () => {
  const result = new Swordsman(1);

  expect(result).toBeInstanceOf(Character);
  expect(result).toBeInstanceOf(Swordsman);
  expect(result).toEqual({
    attack: 40, defence: 10, health: 50, level: 1, type: 'swordsman',
  });
});
