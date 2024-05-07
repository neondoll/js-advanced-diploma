import Character from '../../Character';
import Magician from '../Magician';

test('Testing Magician creation', () => {
  const result = new Magician(1);

  expect(result).toBeInstanceOf(Character);
  expect(result).toBeInstanceOf(Magician);
  expect(result).toEqual({
    attack: 10, defence: 40, health: 50, level: 1, type: 'magician',
  });
});
