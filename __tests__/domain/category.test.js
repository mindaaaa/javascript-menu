import Category from '../../src/domain/Category.js';
import Coach from '../../src/domain/Coach.js';

describe('Category 클래스 테스트', () => {
  let category, coach;

  beforeEach(() => {
    coach = new Coach('토미');
    coach.setDislikedMenus(['김밥', '비빔밥']);
    category = new Category('한식', coach);
  });

  test('getAvailableMenus는 코치의 조건에 따라 추천 가능한 메뉴를 반환한다.', () => {
    // given
    coach.menu.getMenuByCategory('한식');
    coach.removeEatenMenu('한식', '불고기');

    // when
    const result = category.getAvailableMenus();

    // then
    expect(result).not.toContain('김밥'); // 못 먹는 메뉴 제외
    expect(result).not.toContain('비빔밥'); // 못 먹는 메뉴 제외
    expect(result).not.toContain('불고기'); // 먹은 메뉴 제외
    expect(result).toEqual([
      '김치찌개',
      '쌈밥',
      '된장찌개',
      '칼국수',
      '떡볶이',
      '제육볶음',
    ]); // 추천 가능한 메뉴만 반환
  });
});
