import Character from '../../Character';
import Vampire from '../Vampire';

test('Testing Vampire creation', () => {
  const result = new Vampire(1);

  expect(result).toBeInstanceOf(Character);
  expect(result).toBeInstanceOf(Vampire);
  expect(result).toEqual({
    attack: 25, defence: 25, health: 50, level: 1, type: 'vampire',
  });
});
