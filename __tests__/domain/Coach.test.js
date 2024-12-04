import Coach from '../../src/domain/Coach.js';
import Menu from '../../src/domain/Menu.js';

describe('Coach 클래스 테스트', () => {
  let menu, coach;

  beforeEach(() => {
    menu = new Menu();
    coach = new Coach('토미', menu);
  });

  test('setDislikedMenus는 못 먹는 메뉴를 카테고리별로 올바르게 설정한다.', () => {
    // given
    coach.setDislikedMenus(['우동', '스시']);
    coach.setDislikedMenus(['김밥']);

    // when
    const dislikedMenus = coach.getAllDislikedMenus();

    // then
    expect(dislikedMenus).toEqual({
      일식: ['우동', '스시'],
      한식: ['김밥'],
    });
  });

  test('getDislikedMenusByCategory는 특정 카테고리의 못 먹는 메뉴를 반환한다.', () => {
    // given
    coach.setDislikedMenus(['우동', '스시', '김밥']);

    // when...then
    expect(coach.getDislikedMenusByCategory('일식')).toEqual(['우동', '스시']);
    expect(coach.getDislikedMenusByCategory('한식')).toEqual(['김밥']);
    expect(coach.getDislikedMenusByCategory('중식')).toEqual([]);
  });

  test('addEatenMenu는 먹은 메뉴를 목록에 추가한다.', () => {
    // given
    coach.addEatenMenu('김밥');

    // when...then
    expect(coach.eatenMenus).toContain('김밥');
  });
});
