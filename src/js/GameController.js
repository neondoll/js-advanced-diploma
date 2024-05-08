import GamePlay from './GamePlay';
import PositionedCharacter from './PositionedCharacter';
import themes from './themes';
import {
  Bowman, Daemon, Magician, Swordsman, Undead, Vampire,
} from './characters';
import { generateTeam } from './generators';
import { getRandomInt } from './utils';
import GameState from './GameState';

export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;

    this.positionedCharacters = [];
  }

  init() {
    // TODO: add event listeners to gamePlay events (добавить
    //       прослушиватели событий в события gamePlay)
    this.gamePlay.drawUi(themes.prairie);

    const characterCount = getRandomInt(this.gamePlay.boardSize * 2) + 1;
    const characterMaxLevel = getRandomInt(4) + 1;

    const ourTeam = generateTeam([Bowman, Magician, Swordsman], characterMaxLevel, characterCount);
    const rivalTeam = generateTeam([Daemon, Undead, Vampire], characterMaxLevel, characterCount);

    const occupiedPositions = [];
    this.positionedCharacters = [];

    ourTeam.characters.forEach((character) => {
      let position;

      do {
        position = getRandomInt(this.gamePlay.boardSize) * this.gamePlay.boardSize
          + getRandomInt(2);
      } while (occupiedPositions.includes(position));

      occupiedPositions.push(position);
      this.positionedCharacters.push(new PositionedCharacter(character, position));
    });

    rivalTeam.characters.forEach((character) => {
      let position;

      do {
        position = getRandomInt(this.gamePlay.boardSize) * this.gamePlay.boardSize
          + getRandomInt(2) + 6;
      } while (occupiedPositions.includes(position));

      occupiedPositions.push(position);
      this.positionedCharacters.push(new PositionedCharacter(character, position));
    });

    this.gamePlay.redrawPositions(this.positionedCharacters);
    this.gamePlay.addCellClickListener(this.onCellClick.bind(this));
    this.gamePlay.addCellEnterListener(this.onCellEnter.bind(this));
    this.gamePlay.addCellLeaveListener(this.onCellLeave.bind(this));

    // TODO: load saved stated from stateService (загрузка сохранена, указанная в StateService)
  }

  onCellClick(index) {
    // TODO: react to click
    const positionedCharacter = this.positionedCharacters.find(
      (element) => element.position === index,
    );

    if (positionedCharacter !== undefined && (
      positionedCharacter.character instanceof Bowman
      || positionedCharacter.character instanceof Magician
      || positionedCharacter.character instanceof Swordsman
    )) {
      if (GameState.selectedCharacterPosition !== undefined) {
        this.gamePlay.deselectCell(GameState.selectedCharacterPosition);
      }

      GameState.selectedCharacterPosition = index;
      this.gamePlay.selectCell(GameState.selectedCharacterPosition);
    } else {
      GamePlay.showError('Это не ваш персонаж!');
    }
  }

  onCellEnter(index) {
    // TODO: react to mouse enter
    const positionedCharacter = this.positionedCharacters.find(
      (element) => element.position === index,
    );

    if (positionedCharacter !== undefined) {
      this.gamePlay.showCellTooltip(positionedCharacter.character.briefInformation, index);
    }
  }

  onCellLeave(index) {
    // TODO: react to mouse leave
    this.gamePlay.hideCellTooltip(index);
  }
}
