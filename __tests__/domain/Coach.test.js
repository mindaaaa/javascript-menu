import Coach from '../src/domain/Coach.js';

// Mock된 카테고리-메뉴 매핑
const menuCategoryMap = {
  우동: '일식',
  스시: '일식',
  김밥: '한식',
  짜장면: '중식',
  팟타이: '아시안',
};

describe('Coach 클래스 테스트', () => {
  let coach;

  beforeEach(() => {
    coach = new Coach('토미');
  });

  test('코치 생성자가 초기값을 올바르게 설정한다.', () => {
    expect(coach.name).toBe('토미');
    expect(coach.dislikedMenus).toEqual({});
    expect(coach.eatenMenus).toEqual([]);
  });

  test('setDislikedMenus는 못 먹는 메뉴를 카테고리별로 올바르게 설정한다.', () => {
    coach.setDislikedMenus('우동, 스시', menuCategoryMap);
    expect(coach.getAllDislikedMenus()).toEqual({
      일식: ['우동', '스시'],
    });

    coach.setDislikedMenus('김밥', menuCategoryMap);
    expect(coach.getAllDislikedMenus()).toEqual({
      일식: ['우동', '스시'],
      한식: ['김밥'],
    });
  });

  test('getDislikedMenusByCategory는 특정 카테고리의 못 먹는 메뉴를 반환한다.', () => {
    coach.setDislikedMenus('우동, 스시, 김밥', menuCategoryMap);

    expect(coach.getDislikedMenusByCategory('일식')).toEqual(['우동', '스시']);
    expect(coach.getDislikedMenusByCategory('한식')).toEqual(['김밥']);
    expect(coach.getDislikedMenusByCategory('중식')).toEqual([]);
  });

  test('addEatenMenu는 먹은 메뉴를 eatenMenus에 추가한다.', () => {
    coach.addEatenMenu('김밥');
    expect(coach.eatenMenus).toEqual(['김밥']);

    coach.addEatenMenu('짜장면');
    expect(coach.eatenMenus).toEqual(['김밥', '짜장면']);
  });
});
