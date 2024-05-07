import themes from './themes';

export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
  }

  init() {
    // TODO: add event listeners to gamePlay events (добавить прослушиватели событий в события gamePlay)
    this.gamePlay.drawUi(themes.prairie);

    // TODO: load saved stated from stateService (загрузка сохранена, указанная в StateService)
  }

  onCellClick(index) {
    // TODO: react to click
  }

  onCellEnter(index) {
    // TODO: react to mouse enter
  }

  onCellLeave(index) {
    // TODO: react to mouse leave
  }
}
