import MenuPlanner from '../../src/domain/MenuPlanner';
import Coach from '../../src/domain/Coach';
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

describe('MenuPlanner 클래스 테스트', () => {
  let menuPlanner, coach;

  beforeEach(() => {
    coach = new Coach('토미');
    coach.setDislikedMenus(['김밥']);
    menuPlanner = new MenuPlanner(coach);
  });

  test('planMenu는 카테고리 내에서 추천 가능한 메뉴를 반환한다.', () => {
    // given
    const category = '한식';
    const availableMenus = coach.getAvailableMenusByCategory(category);

    mockShuffles([[availableMenus[0], availableMenus]]);

    // when
    const recommendedMenu = menuPlanner.planMenu(category);

    // then
    expect(Random.shuffle).toHaveBeenCalledWith(availableMenus); // TODO: 이 부분 학습하기
    expect(recommendedMenu).toBe(availableMenus[0]);
  });
});
