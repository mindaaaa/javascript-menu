import Category from '../../src/domain/Category.js';
import Coach from '../../src/domain/Coach.js';

describe.skip('Category 클래스 테스트', () => {
  let category, coach;

  beforeEach(() => {
    category = new Category('한식', ['김밥', '비빔밥', '불고기', '김치찌개']);
    coach = new Coach('토미');
  });

  test('Category 생성자가 초기값을 올바르게 설정한다.', () => {
    expect(category.category).toBe('한식');
    expect(category.menus).toEqual(['김밥', '비빔밥', '불고기', '김치찌개']);
  });

  test('getAvailableMenus는 코치의 조건에 따라 추천 가능한 메뉴를 반환한다.', () => {
    // 코치의 못 먹는 메뉴와 먹은 메뉴
    coach.setDislikedMenus('김밥', { 김밥: '한식' });
    coach.addEatenMenu('비빔밥');

    const availableMenus = category.getAvailableMenus(coach);
    expect(availableMenus).toEqual(['불고기', '김치찌개']);
  });

  test('removeEatenMenu는 카테고리에서 먹은 메뉴를 제거한다.', () => {
    category.removeEatenMenu('김밥');

    expect(category.menus).toEqual(['비빔밥', '불고기', '김치찌개']);
  });
});
