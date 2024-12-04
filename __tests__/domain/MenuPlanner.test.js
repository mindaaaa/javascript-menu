import MenuPlanner from '../../src/domain/MenuPlanner';
import { Random } from '@woowacourse/mission-utils';

jest.mock('@woowacourse/mission-utils', () => ({
  Random: {
    shuffle: jest.fn(),
  },
}));

const mockShuffles = (rows) => {
  Random.shuffle = jest.fn();

  rows.reduce((acc, [firstNumber, numbers]) => {
    return acc.mockReturnValueOnce([
      firstNumber,
      ...numbers.filter((number) => number !== firstNumber),
    ]);
  }, Random.shuffle);
};

describe('MenuPlanner 테스트', () => {
  let menuPlanner;

  beforeEach(() => {
    menuPlanner = new MenuPlanner();
  });

  test('shuffle 동작을 모킹하여 예상 결과를 확인한다.', () => {
    mockShuffles([
      [1, [1, 2, 3]],
      [2, [2, 3, 4]],
    ]);

    const result1 = Random.shuffle([1, 2, 3]);
    const result2 = Random.shuffle([2, 3, 4]);

    expect(result1).toEqual([1, 2, 3]);
    expect(result2).toEqual([2, 3, 4]);
  });
});
