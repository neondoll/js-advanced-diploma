/**
 * Класс, отвечающий за действия компьютера
 *
 * @property boardSize - размер поля
 */
export default class Computer {
  /**
   * Конструктор класса Computer
   *
   * @param boardSize - размер поля
   */
  constructor(boardSize) { this.boardSize = boardSize; }

  /**
   * Расчет атки
   *
   * @param positionedEnemyTeam - команда противника
   * @param positionedPlayerTeam - команда игрока
   * @returns {{enemyHero: PositionedCharacter, playerHero: PositionedCharacter} | false} - объект,
   * содержащий противника и игрока, или false
   */
  calculatingAttack(positionedEnemyTeam, positionedPlayerTeam) {
    const killOptions = [];

    let maxDamage = -Infinity;
    let minDistance = Infinity;
    let targetEnemyHero = null;
    let targetPlayerHero = null;

    positionedEnemyTeam.forEach((enemyHero) => {
      positionedPlayerTeam.forEach((playerHero) => {
        if (enemyHero.canAttack(playerHero.position, this.boardSize)) {
          const damage = enemyHero.damageCalculation(playerHero);

          if (playerHero.character.health - damage <= 0) {
            killOptions.push([enemyHero, playerHero]);
          }

          const distance = enemyHero.distanceCalculation(playerHero.position, this.boardSize);

          if ((damage > maxDamage) || (damage === maxDamage && distance < minDistance)) {
            maxDamage = damage;
            minDistance = distance;
            targetEnemyHero = enemyHero;
            targetPlayerHero = playerHero;
          }
        }
      });
    });

    if (killOptions.length) {
      minDistance = Infinity;
      targetEnemyHero = null;
      targetPlayerHero = null;

      killOptions.forEach(([enemyHero, playerHero]) => {
        const distance = enemyHero.distanceCalculation(playerHero.position, this.boardSize);

        if (distance < minDistance) {
          minDistance = distance;
          targetEnemyHero = enemyHero;
          targetPlayerHero = playerHero;
        }
      });
    }

    if (targetEnemyHero && targetPlayerHero) {
      return { enemyHero: targetEnemyHero, playerHero: targetPlayerHero };
    }

    return false;
  }

  /**
   * Расчет перемещения
   *
   * @param positionedEnemyTeam - команда противника
   * @param positionedPlayerTeam - команда игрока
   * @returns {{enemyHero: PositionedCharacter, planMoveCell: number}} - объект, содержащий
   * противника и координату на поле для перемещения
   */
  calculatingMovement(positionedEnemyTeam, positionedPlayerTeam) {
    const positionedCharacters = [...positionedEnemyTeam, ...positionedPlayerTeam];

    let minDistanceBeforeMoving = Infinity;
    let minDistanceAfterMoving = Infinity;
    let targetEnemyHero = null;
    let targetPlanMoveCell = null;

    positionedEnemyTeam.forEach((enemyHero) => {
      const moveableCells = enemyHero.generateMoveableCells(positionedCharacters, this.boardSize);

      positionedPlayerTeam.forEach((playerHero) => {
        const distanceBeforeMoving = enemyHero.distanceCalculation(
          playerHero.position,
          this.boardSize,
        );

        let distanceAfterMoving = Infinity;
        let planMoveCell = null;

        moveableCells.forEach((cell) => {
          const distance = playerHero.distanceCalculation(cell, this.boardSize);

          if (distance < distanceAfterMoving) {
            distanceAfterMoving = distance;
            planMoveCell = cell;
          }
        });

        if (
          distanceBeforeMoving < minDistanceBeforeMoving || (
            distanceBeforeMoving === minDistanceBeforeMoving
            && distanceAfterMoving < minDistanceAfterMoving
          )
        ) {
          minDistanceBeforeMoving = distanceBeforeMoving;
          minDistanceAfterMoving = distanceAfterMoving;
          targetEnemyHero = enemyHero;
          targetPlanMoveCell = planMoveCell;
        }
      });
    });

    return { enemyHero: targetEnemyHero, planMoveCell: targetPlanMoveCell };
  }
}
