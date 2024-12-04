import Coach from '../../src/domain/Coach.js';

describe('Coach 클래스 테스트', () => {
  let coach;

  beforeEach(() => {
    coach = new Coach('토미');
  });

  test('setDislikedMenus는 못 먹는 메뉴를 카테고리별로 올바르게 설정하고 availableMenus를 초기화한다.', () => {
    // given
    const dislikedMenus = ['우동', '스시', '김밥'];

    // when
    coach.setDislikedMenus(dislikedMenus);

    // then
    expect(coach.dislikedMenus).toEqual({
      일식: ['우동', '스시'],
      한식: ['김밥'],
    });

    expect(coach.getAvailableMenusByCategory('일식')).not.toContain('우동');
    expect(coach.getAvailableMenusByCategory('일식')).not.toContain('스시');
    expect(coach.getAvailableMenusByCategory('한식')).not.toContain('김밥');
  });

  test('initializeAvailableMenus는 먹을 수 있는 메뉴를 올바르게 설정한다.', () => {
    // given
    const dislikedMenus = ['김밥', '스파게티'];
    coach.setDislikedMenus(dislikedMenus);

    // when...then
    expect(coach.getAvailableMenusByCategory('한식')).not.toContain('김밥');
    expect(coach.getAvailableMenusByCategory('양식')).not.toContain('스파게티');
  });

  test('getAvailableMenusByCategory는 특정 카테고리의 먹을 수 있는 메뉴를 반환한다.', () => {
    // given
    const dislikedMenus = ['짜장면'];
    coach.setDislikedMenus(dislikedMenus);

    // when
    const availableMenus = coach.getAvailableMenusByCategory('중식');

    // then
    expect(availableMenus).not.toContain('짜장면');
    expect(availableMenus).toEqual(
      coach.menu.getMenuByCategory('중식').filter((menu) => menu !== '짜장면')
    );
  });
});
