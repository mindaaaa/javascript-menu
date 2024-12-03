import MenuPlanner from '../src/domain/MenuPlanner.js';
import Coach from '../src/domain/Coach.js';
import { Randoms } from '@woowacourse/mission-utils';

jest.mock('@woowacourse/mission-utils', () => ({
  Randoms: {
    shuffle: jest.fn(),
  },
}));

describe('MenuPlanner 클래스 테스트', () => {
  let coach, menuPlanner;

  beforeEach(() => {
    // Coach
    coach = new Coach('토미');
    coach.getAvailableMenus = jest.fn(() => ({
      한식: ['김밥', '비빔밥', '불고기'],
      일식: ['스시', '라멘'],
    }));

    // MenuPlanner
    menuPlanner = new MenuPlanner(coach);
  });

  test('MenuPlanner 생성자가 초기값을 올바르게 설정한다.', () => {
    expect(menuPlanner.coach).toBe(coach);
  });

  test('planMenu는 카테고리에서 랜덤으로 메뉴를 반환한다.', () => {
    Randoms.shuffle.mockReturnValue(['김밥', '비빔밥', '불고기']);

    const category = '한식';
    const recommendedMenu = menuPlanner.planMenu(category);

    expect(Randoms.shuffle).toHaveBeenCalledWith(['김밥', '비빔밥', '불고기']);
    expect(recommendedMenu).toBe('김밥');
  });
});
