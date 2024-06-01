export default class GameStateStatistic {
  constructor(storage) { this.storage = storage; }

  add(state) {
    const newStatistics = [{ datetime: Date.now(), ...state }];

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
      console.log('------- Нет последней статистики игр -------');// eslint-disable-line no-console

      return;
    }

    const data = statistics.map((statistic) => {
      const date = new Date(statistic.datetime);

      return {
        Уровень: statistic.level,
        Результат: statistic.numberOfEnemyCharactersSurviving === 0 ? 'Победа' : 'Поражение',
        'Кол-во выживших персонажей игрока': statistic.numberOfPlayerCharactersSurviving,
        'Кол-во умерших персонажей игрока': statistic.numberOfPlayerCharactersDying,
        'Кол-во выживших персонажей противника': statistic.numberOfEnemyCharactersSurviving,
        'Кол-во умерших персонажей противника': statistic.numberOfEnemyCharactersDying,
        Дата: `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')}.${date.getFullYear()} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`,
      };
    });

    console.log('------- Последняя статистика игр -------'); // eslint-disable-line no-console
    console.table(data); // eslint-disable-line no-console
  }

  save(statistics) { this.storage.setItem('statistics', JSON.stringify(statistics)); }
}
