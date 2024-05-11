export default class GameStateStatistic {
  constructor(storage) { this.storage = storage; }

  add(state) {
    const {
      level,
      numberOfEnemyCharactersDying,
      numberOfEnemyCharactersSurviving,
      numberOfPlayerCharactersDying,
      numberOfPlayerCharactersSurviving,
    } = state;

    const newStatistics = [{
      datetime: Date.now(),
      level,
      numberOfEnemyCharactersDying,
      numberOfEnemyCharactersSurviving,
      numberOfPlayerCharactersDying,
      numberOfPlayerCharactersSurviving,
    }];

    let oldStatistics = this.load();

    if (!oldStatistics) {
      oldStatistics = [];
    }

    for (let index = 0; index < Math.min(oldStatistics.length, 10); index += 1) {
      newStatistics.push(oldStatistics[index]);
    }

    this.save(newStatistics);
  }

  load() {
    try {
      return JSON.parse(this.storage.getItem('statistics'));
    } catch (e) {
      throw new Error('Invalid statistics');
    }
  }

  print() {
    const statistics = this.load();

    if (!statistics) {
      console.log('--- Нет последней статистики игр ---');// eslint-disable-line no-console

      return;
    }

    const columnLength = {
      level: 9, result: 11, numberCharacters: 12, date: 21,
    };

    let message = '----------------------------------- Последняя статистика игр ------------------------------------\n\n'
      + '| Уровень | Результат | Кол-во     | Кол-во     | Кол-во     | Кол-во     | Дата                |\n'
      + '|         |           | выживших   | умерших    | выживших   | умерших    |                     |\n'
      + '|         |           | персонажей | персонажей | персонажей | персонажей |                     |\n'
      + '|         |           | игрока     | игрока     | противника | противника |                     |\n'
      + '|---------|-----------|------------|------------|------------|------------|---------------------|';

    for (let index = 0; index < statistics.length; index += 1) {
      const dateObj = new Date(statistics[index].datetime);
      const date = `${String(dateObj.getDate()).padStart(2, '0')}.${String(dateObj.getMonth() + 1).padStart(2, '0')}.${dateObj.getFullYear()} ${String(dateObj.getHours()).padStart(2, '0')}:${String(dateObj.getMinutes()).padStart(2, '0')}:${String(dateObj.getSeconds()).padStart(2, '0')}`;
      const level = String(statistics[index].level);
      const numberCharacters = {
        enemy: {
          dying: String(statistics[index].numberOfEnemyCharactersDying),
          surviving: String(statistics[index].numberOfEnemyCharactersSurviving),
        },
        player: {
          dying: String(statistics[index].numberOfPlayerCharactersDying),
          surviving: String(statistics[index].numberOfPlayerCharactersSurviving),
        },
      };
      const result = statistics[index].numberOfEnemyCharactersSurviving === 0 ? 'Победа' : 'Поражение';

      message += '\n| ';
      message += level.padEnd(columnLength.level - 1);
      message += '| ';
      message += result.padEnd(columnLength.result - 1);
      message += '| ';
      message += numberCharacters.player.surviving.padEnd(columnLength.numberCharacters - 1);
      message += '| ';
      message += numberCharacters.player.dying.padEnd(columnLength.numberCharacters - 1);
      message += '| ';
      message += numberCharacters.enemy.surviving.padEnd(columnLength.numberCharacters - 1);
      message += '| ';
      message += numberCharacters.enemy.dying.padEnd(columnLength.numberCharacters - 1);
      message += '| ';
      message += date.padEnd(columnLength.date - 1);
      message += '|';
    }

    console.log(message); // eslint-disable-line no-console
  }

  save(statistics) { this.storage.setItem('statistics', JSON.stringify(statistics)); }
}
