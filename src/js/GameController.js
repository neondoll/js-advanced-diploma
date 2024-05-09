import cursors from './cursors';
import GamePlay from './GamePlay';
import GameState from './GameState';
import PositionedCharacter from './PositionedCharacter';
import themes from './themes';
import {
  Bowman, Daemon, Magician, Swordsman, Undead, Vampire,
} from './characters';
import { generateTeam } from './generators';
import { getRandomInt } from './utils';

export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;

    this.positionedCharacters = [];

    /**
     * `writable: false`     - запретить присвоение
     * `configurable: false` - запретить удаление
     */
    Object.defineProperties(this, {
      ourCharacterTypes: {
        value: [Bowman, Magician, Swordsman], writable: false, configurable: false,
      },
      rivalCharacterTypes: {
        value: [Daemon, Undead, Vampire], writable: false, configurable: false,
      },
    });
  }

  init() {
    // TODO: add event listeners to gamePlay events (добавить
    //       прослушиватели событий в события gamePlay)
    this.gamePlay.drawUi(themes.prairie);

    const characterCount = getRandomInt(this.gamePlay.boardSize * 2) + 1;
    const characterMaxLevel = getRandomInt(4) + 1;

    const ourTeam = generateTeam(this.ourCharacterTypes, characterMaxLevel, characterCount);
    const rivalTeam = generateTeam(this.rivalCharacterTypes, characterMaxLevel, characterCount);

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

    const hasPositionedCharacter = positionedCharacter !== undefined;
    const isOurPositionedCharacter = hasPositionedCharacter
      && positionedCharacter.characterInstanceOf(this.ourCharacterTypes);

    switch (true) {
    case isOurPositionedCharacter: {
      if (GameState.positionedCharacterSelected()) {
        this.gamePlay.deselectCell(GameState.selectedPositionedCharacter.position);
      }

      GameState.selectedPositionedCharacter = positionedCharacter;
      this.gamePlay.selectCell(GameState.selectedPositionedCharacter.position);
      break;
    }
    case (
      !hasPositionedCharacter
        && GameState.positionedCharacterSelected()
        && GameState.selectedPositionedCharacter.canDriving(index, this.gamePlay.boardSize)
    ): {
      const oldCharacterPosition = GameState.selectedPositionedCharacter.position;

      GameState.selectedPositionedCharacter.position = index;

      this.gamePlay.redrawPositions(this.positionedCharacters);
      this.gamePlay.deselectCell(GameState.hoveredCellPosition);
      this.gamePlay.deselectCell(oldCharacterPosition);

      GameState.hoveredCellPosition = undefined;
      GameState.selectedPositionedCharacter = undefined;
      break;
    }
    default: {
      GamePlay.showError('Это не ваш персонаж!');
    }
    }
  }

  onCellEnter(index) {
    // TODO: react to mouse enter
    const positionedCharacter = this.positionedCharacters.find(
      (element) => element.position === index,
    );

    const hasPositionedCharacter = positionedCharacter !== undefined;

    if (GameState.positionedCharacterSelected()) {
      const isOurPositionedCharacter = hasPositionedCharacter
        && positionedCharacter.characterInstanceOf(this.ourCharacterTypes);
      const isRivalPositionedCharacter = hasPositionedCharacter
        && positionedCharacter.characterInstanceOf(this.rivalCharacterTypes);

      if (
        GameState.cellHovered()
        && GameState.hoveredCellPosition !== GameState.selectedPositionedCharacter.position
      ) {
        this.gamePlay.deselectCell(GameState.hoveredCellPosition);
      }

      GameState.hoveredCellPosition = index;

      switch (true) {
      case isOurPositionedCharacter: {
        this.gamePlay.setCursor(cursors.pointer);
        break;
      }
      case (
        isRivalPositionedCharacter
          && GameState.selectedPositionedCharacter.canAttack(index, this.gamePlay.boardSize)
      ): {
        this.gamePlay.selectCell(GameState.hoveredCellPosition, 'red');
        this.gamePlay.setCursor(cursors.crosshair);
        break;
      }
      case (
        !hasPositionedCharacter
          && GameState.selectedPositionedCharacter.canDriving(index, this.gamePlay.boardSize)
      ): {
        this.gamePlay.selectCell(GameState.hoveredCellPosition, 'green');
        this.gamePlay.setCursor(cursors.pointer);
        break;
      }
      default: {
        this.gamePlay.setCursor(cursors.notallowed);
        break;
      }
      }
    } else {
      this.gamePlay.setCursor(cursors.auto);
    }

    if (hasPositionedCharacter) {
      this.gamePlay.showCellTooltip(positionedCharacter.character.briefInformation, index);
    }
  }

  onCellLeave(index) {
    // TODO: react to mouse leave
    this.gamePlay.hideCellTooltip(index);
  }
}
