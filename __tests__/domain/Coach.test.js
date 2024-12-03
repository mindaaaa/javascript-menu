import Coach from '../../src/domain/Coach.js';

describe('Coach 클래스 테스트', () => {
  let coach;
  beforeEach(() => {
    coach = new Coach();
    const menus = ['김밥', '김치찌개', '쌈밥', '된장찌개'];
  });

  test('getAvailableMenus는 먹을 수 있는 메뉴를 필터링한다.', () => {
    const availableMenus = coach.getAvailableMenus();

    expect(availableMenus).toEqual(['김밥', '김치찌개', '쌈밥', '된장찌개']);
  });

  test('setDislikedMenus는 못 먹는 메뉴를 업데이트한다.', () => {
    coach.setDislikedMenus(['김밥', '김치찌개']);
    const availableMenus = coach.getAvailableMenus();

    expect(availableMenus).toEqual(['쌈밥', '된장찌개']);
  });

  test('setEatenMenus는 이미 먹은 메뉴를 업데이트한다.', () => {
    coach.setEatenMenus(['김밥']);
    const availableMenus = coach.getAvailableMenus();

    expect(availableMenus).toEqual(['김치찌개', '쌈밥', '된장찌개']);
  });

  test('getEatenMenus는 이미 먹은 메뉴를 가져온다.', () => {
    coach.setEatenMenus(['김치찌개']);
    const eatenMenu = coach.getEatenMenus();

    expect(eatenMenu).toEqual('김치찌개');
  });
});
