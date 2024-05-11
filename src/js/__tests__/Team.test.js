import Team from '../Team';
import { Bowman, Magician, Swordsman } from '../characters';

describe('class Team', () => {
  test('example', () => {
    const characters = [new Swordsman(2), new Bowman(1)];
    const team = new Team(characters);

    expect(team.characters).toEqual(characters);
  });
  describe('new Team(characters)', () => {
    test.each([
      { characters: [] },
      { characters: [new Bowman(1), new Magician(1), new Swordsman(1)] },
    ])('characters = $characters', ({ characters }) => {
      expect(new Team(characters)).toEqual({ characterSet: new Set(characters) });
    });
  });
  describe('[Team]', () => {
    let bowman;
    let magician;
    let swordsman;
    let team;

    beforeAll(() => {
      bowman = new Bowman(1);
      magician = new Magician(1);
      swordsman = new Swordsman(1);
    });
    beforeEach(() => { team = new Team(); });

    describe('.add(character)', () => {
      test('success', () => expect(team.add(bowman)).toEqual(new Set([bowman])));
      test('throw', () => {
        team.add(bowman);

        expect(() => team.add(bowman)).toThrow(Error);
      });
    });
    test('.addAll(...characters)', () => {
      expect(
        team.addAll(bowman, magician, bowman, swordsman),
      ).toEqual(new Set([bowman, magician, swordsman]));
    });
    test('.characters', () => {
      team.addAll(bowman, magician, bowman, swordsman);

      expect(team.characters).toEqual([bowman, magician, swordsman]);
    });
  });
});
