import Menu from '../../src/domain/Menu.js';

describe.skip('Menu 클래스 테스트', () => {
  let menu;

  beforeEach(() => {
    menu = new Menu();
  });

  test('getMenuByCategory는 특정 카테고리의 메뉴를 반환한다.', () => {
    expect(menu.getMenuByCategory('한식')).toEqual([
      '김밥',
      '김치찌개',
      '쌈밥',
      '된장찌개',
      '비빔밥',
      '칼국수',
      '불고기',
      '떡볶이',
      '제육볶음',
    ]);
  });

  test('getCategoryByMenu는 특정 메뉴의 카테고리를 반환한다.', () => {
    expect(menu.getCategoryByMenu('김밥')).toBe('한식');
  });
});
