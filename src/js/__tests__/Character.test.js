import Character from '../Character';

describe('class Character', () => {
  describe('new Character(level)', () => {
    test('throw', () => expect(() => new Character(1)).toThrow(Error));
  });
});
