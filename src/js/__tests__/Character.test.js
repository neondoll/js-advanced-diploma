import Character from '../Character';

test('Testing the impossibility of creating a Character class object', () => {
  expect(() => new Character(1)).toThrow(Error);
});
