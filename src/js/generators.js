import Team from './Team';
import { randomInt } from './utils';

/**
 * Формирует экземпляр персонажа из массива allowedTypes со случайным уровнем от 1 до maxLevel
 *
 * @param allowedTypes - массив классов
 * @param maxLevel - максимальный возможный уровень персонажа
 * @returns генератор, который при каждом вызове возвращает новый экземпляр класса персонажа
 *
 * @example
 * ```js
 * const playerTypes = [Bowman, Swordsman, Magician]; // доступные классы игрока
 * // в данном примере персонажи игрока могут быть 1 или 2-ого уровней
 * const playerGenerator = characterGenerator(playerTypes, 2);
 *
 * // случайный персонаж из списка playerTypes с уровнем 1 или 2
 * const character1 = playerGenerator.next().value;
 * character1.type; // magician
 * character1.attack; // 10
 * character1.level; // 2
 *
 * const character2 = playerGenerator.next().value; // ещё один случайный персонаж
 * character2.level; // 1
 * character2.type; // swordsman
 *
 * playerGenerator.next().value; // можно вызывать бесконечно
 * playerGenerator.next().value;
 * playerGenerator.next().value;
 * playerGenerator.next().value;
 * playerGenerator.next().value; // всегда получим нового случайного персонажа со случайным уровнем
 * ```
 */
export function* characterGenerator(allowedTypes, maxLevel) {
  while (true) {
    const characterClassIndex = randomInt(allowedTypes.length);
    const characterLevel = randomInt(maxLevel) + 1;

    yield new allowedTypes[characterClassIndex](characterLevel);
  }
}

/**
 * Формирует массив персонажей на основе characterGenerator
 *
 * @param allowedTypes - массив классов
 * @param maxLevel - максимальный возможный уровень персонажа
 * @param characterCount - количество персонажей, которое нужно сформировать
 * @returns Team - экземпляр Team, хранящий экземпляры персонажей. Количество персонажей в команде
 * - characterCount
 *
 * @example
 * ```js
 * const playerTypes = [Bowman, Swordsman, Magician]; // доступные классы игрока
 * // массив из 4 случайных персонажей playerTypes с уровнем 1, 2 или 3
 * const team = generateTeam(playerTypes, 3, 4);
 *
 * team.characters[0].level // 3
 * team.characters[1].level // 3
 * team.characters[2].level // 1
 * ```
 */
export function generateTeam(allowedTypes, maxLevel, characterCount) {
  const characters = [];
  const playerGenerator = characterGenerator(allowedTypes, maxLevel);

  for (let index = 0; index < characterCount; index += 1) {
    characters.push(playerGenerator.next().value);
  }

  return new Team(characters);
}
