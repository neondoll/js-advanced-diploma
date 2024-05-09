/**
 * Класс, который взаимодействует с текущим состоянием (сохраняет данные в localStorage для
 * последующей загрузки)
 *
 * @property storage - хранилище
 */
export default class GameStateService {
  /**
   * Конструктор класса GameStateService
   *
   * @param storage - хранилище
   */
  constructor(storage) {
    this.storage = storage;
  }

  save(state) {
    this.storage.setItem('state', JSON.stringify(state));
  }

  load() {
    try {
      return JSON.parse(this.storage.getItem('state'));
    } catch (e) {
      throw new Error('Invalid state');
    }
  }
}
