import PositionedCharacter from './PositionedCharacter';
import themes from './themes';
import {
  Bowman, Daemon, Magician, Swordsman, Undead, Vampire,
} from './characters';

/**
 * Класс, который хранит текущее состояние игры (может сам себя воссоздавать из другого объекта)
 *
 * @property isOver - закончена ли игра
 * @property isPlayer - идет ли сейчас ход игрока
 * @property level - уровень игры
 * @property positionedEnemyTeam - массив персонажей противника, привязанных к координатам на поле
 * @property positionedPlayerTeam - массив персонажей игрока, привязанных к координатам на поле
 */
export default class GameState {
  /**
   * Конструктор класса GameState
   */
  constructor(
    isOver = false,
    isPlayer = true,
    level = 1,
    numberOfEnemyCharactersDying = 0,
    numberOfEnemyCharactersSurviving = 2,
    numberOfPlayerCharactersDying = 0,
    numberOfPlayerCharactersSurviving = 2,
    positionedEnemyTeam = [],
    positionedPlayerTeam = [],
  ) {
    this.isOver = isOver;
    this.isPlayer = isPlayer;
    this.level = level;
    this.numberOfEnemyCharactersDying = numberOfEnemyCharactersDying;
    this.numberOfEnemyCharactersSurviving = numberOfEnemyCharactersSurviving;
    this.numberOfPlayerCharactersDying = numberOfPlayerCharactersDying;
    this.numberOfPlayerCharactersSurviving = numberOfPlayerCharactersSurviving;
    this.positionedEnemyTeam = positionedEnemyTeam;
    this.positionedPlayerTeam = positionedPlayerTeam;
  }

  /**
   * Персонаж противника умер
   */
  enemyCharacterDied() {
    this.numberOfEnemyCharactersDying += 1;
    this.numberOfEnemyCharactersSurviving -= 1;
  }

  /**
   * Создает из объекта класс GameState
   *
   * @param object
   * @returns GameState
   */
  static from(object) {
    const characterTypes = {
      bowman: Bowman,
      daemon: Daemon,
      magician: Magician,
      swordsman: Swordsman,
      undead: Undead,
      vampire: Vampire,
    };

    const createCharacter = (characterData) => {
      const CharacterClass = characterTypes[characterData.type];

      if (!CharacterClass) {
        throw new Error('Неизвестный тип персонажа');
      }

      const character = new CharacterClass(characterData.level);

      character.attack = characterData.attack;
      character.defence = characterData.defence;
      character.health = characterData.health;

      return character;
    };

    return new GameState(
      object.isOver,
      object.isPlayer,
      object.level,
      object.numberOfEnemyCharactersDying,
      object.numberOfEnemyCharactersSurviving,
      object.numberOfPlayerCharactersDying,
      object.numberOfPlayerCharactersSurviving,
      object.positionedEnemyTeam.map((positionedCharacter) => {
        const character = createCharacter(positionedCharacter.character);

        return new PositionedCharacter(character, positionedCharacter.position);
      }),
      object.positionedPlayerTeam.map((positionedCharacter) => {
        const character = createCharacter(positionedCharacter.character);

        return new PositionedCharacter(character, positionedCharacter.position);
      }),
    );
  }

  /**
   * Персонаж игрока умер
   */
  playerCharacterDied() {
    this.numberOfPlayerCharactersDying += 1;
    this.numberOfPlayerCharactersSurviving -= 1;
  }

  /**
   * Тема игры
   *
   * @returns string
   */
  get theme() {
    switch (this.level) {
      case 1: {
        return themes.prairie;
      }
      case 2: {
        return themes.desert;
      }
      case 3: {
        return themes.arctic;
      }
      case 4: {
        return themes.mountain;
      }
      default: {
        throw new Error('Unknown level');
      }
    }
  }
}
