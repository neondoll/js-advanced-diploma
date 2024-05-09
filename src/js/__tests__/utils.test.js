import { calcHealthLevel, calcTileType } from '../utils';

describe('function calcHealthLevel', () => {
  test.each([
    [100, 'high'],
    [50, 'high'],
    [49, 'normal'],
    [15, 'normal'],
    [14, 'critical'],
    [0, 'critical'],
  ])('testing work with attribute %i', (health, expected) => {
    const result = calcHealthLevel(health);

    expect(result).toBe(expected);
  });
});

describe('function calcTileType', () => {
  test.each([
    [0, 8, 'top-left'],
    [1, 8, 'top'],
    [4, 5, 'top-right'],
    [7, 7, 'left'],
    [12, 4, 'bottom-left'],
    [17, 6, 'right'],
    [40, 9, 'center'],
    [63, 8, 'bottom-right'],
    [75, 9, 'bottom'],
  ])('testing work with attributes %i and %i', (index, boardSize, expected) => {
    const result = calcTileType(index, boardSize);

    expect(result).toBe(expected);
  });
});
