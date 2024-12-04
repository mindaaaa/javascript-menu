import MenuPlanner from '../../src/domain/MenuPlanner';

const mockShuffles = (rows) => {
  MissionUtils.Random.shuffle = jest.fn();

  rows.reduce((acc, [firstNumber, numbers]) => {
    return acc.mockReturnValueOnce([
      firstNumber,
      ...numbers.filter((number) => number !== firstNumber),
    ]);
  }, MissionUtils.Random.shuffle);
};

describe.skip('랜덤 섞기 테스트', () => {
  let menuPlanner;

  beforeEach(() => {
    menuPlanner = new MenuPlanner();
  });

  test('shuffle 동작을 모킹하여 예상 결과를 확인한다.', () => {
    mockShuffles([
      [1, [1, 2, 3]],
      [2, [2, 3, 4]],
    ]);

    const result1 = MissionUtils.Random.shuffle([1, 2, 3]);
    const result2 = MissionUtils.Random.shuffle([2, 3, 4]);

    expect(result1).toEqual([1, 2, 3]);
    expect(result2).toEqual([2, 3, 4]);
  });
});
