import Character from '../Character';
import { Magician } from '../characters';

describe('class Character', () => {
  describe('new Character(level)', () => test('throw', () => expect(() => new Character(1)).toThrow(Error)));
  describe('[Character]', () => {
    let character;

    beforeEach(() => { character = new Magician(1); });

    test('.briefInformation', () => {
      expect(character.briefInformation).toBe(`\u{1F396}${character.level} \u{2694}${character.attack} \u{1F6E1}${character.defence} \u{2764}${character.health}`);
    });
    describe('.levelUp()', () => {
      test('success', () => {
        const {
          attack, defence, health, level,
        } = character;

        character.levelUp();

        expect(character).toHaveProperty('attack', Math.floor(Math.max(attack, attack * ((80 + health) / 100))));
        expect(character).toHaveProperty('defence', Math.floor(Math.max(defence, defence * ((80 + health) / 100))));
        expect(character).toHaveProperty('health', Math.floor(Math.min(health + 80, 100)));
        expect(character).toHaveProperty('level', Math.min(level + 1, 4));
      });
      test('throw', () => {
        character.health = 0;

        expect(() => character.levelUp()).toThrow(Error);
      });
    });
  });
});
