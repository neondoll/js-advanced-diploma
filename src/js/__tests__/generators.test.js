import Bowman from '../characters/Bowman';
import Daemon from '../characters/Daemon';
import Magician from '../characters/Magician';
import Swordsman from '../characters/Swordsman';
import Undead from '../characters/Undead';
import Vampire from '../characters/Vampire';
import { characterGenerator, generateTeam } from '../generators';

const allowedTypes = [Bowman, Daemon, Magician, Swordsman, Undead, Vampire];

test('Checking if the character Generator produces endless new characters from a list', () => {
  const madeCharacterTypes = [];
  const generator = characterGenerator(allowedTypes, 4);
  let result;

  do {
    result = generator.next();

    if (!madeCharacterTypes.includes(result.value.type)) {
      madeCharacterTypes.push(result.value.type);
    }

    expect(result.done).toBeFalsy();
  } while (madeCharacterTypes.length === allowedTypes.length);
});

test.each([
  [2, 5],
  [3, 8],
  [4, 2],
])('Checking if the correct number and level range of characters are created when calling generateTeam (maxLevel: %i, characterCount: %i)', (maxLevel, characterCount) => {
  const team = generateTeam(allowedTypes, maxLevel, characterCount);

  expect(team.characters).toHaveLength(characterCount);

  team.characters.forEach((character) => {
    expect(character.level).toBeLessThanOrEqual(maxLevel);
  });
});
