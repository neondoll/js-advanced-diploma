import Team from './Team';
import { randomInt } from './utils';

/**
 * Формирует экземпляр персонажа из массива allowedTypes со случайным уровнем от 1 до maxLevel
 *
 * @param allowedTypes - массив классов
 * @param maxLevel - максимальный возможный уровень персонажа
 * @returns генератор, который при каждом вызове возвращает новый экземпляр класса персонажа
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
 */
export function generateTeam(allowedTypes, maxLevel, characterCount) {
  const characters = [];
  const playerGenerator = characterGenerator(allowedTypes, maxLevel);

  for (let index = 0; index < characterCount; index += 1) {
    characters.push(playerGenerator.next().value);
  }

  return new Team(characters);
}
