import CategoryPicker from '../../src/domain/CategoryPicker.js';
import { Random } from '@woowacourse/mission-utils';

jest.mock('@woowacourse/mission-utils', () => ({
  Random: {
    pickNumberInRange: jest.fn(),
  },
}));

const mockRandom = (numbers) => {
  Random.pickNumberInRange.mockReset();
  numbers.reduce((acc, number) => {
    return acc.mockReturnValueOnce(number);
  }, Random.pickNumberInRange);
};

describe('CategoryPicker 클래스 테스트', () => {
  let categoryPicker, dailyCategoryCount;

  beforeEach(() => {
    dailyCategoryCount = {
      일식: 0,
      한식: 0,
      중식: 0,
      아시안: 0,
      양식: 0,
    };
    categoryPicker = new CategoryPicker(dailyCategoryCount);
  });

  test('pickCategory는 랜덤으로 선택 가능한 카테고리를 반환한다.', () => {
    // given
    mockRandom([2, 3, 1]);

    // when
    const category1 = categoryPicker.pickCategory();
    const category2 = categoryPicker.pickCategory();
    const category3 = categoryPicker.pickCategory();

    // then
    expect(category1).toBe('한식');
    expect(category2).toBe('중식');
    expect(category3).toBe('일식');
    expect(dailyCategoryCount['한식']).toBe(1);
    expect(dailyCategoryCount['중식']).toBe(1);
    expect(dailyCategoryCount['일식']).toBe(1);
  });

  test('pickCategory는 사용할 수 없는 카테고리를 건너뛴다.', () => {
    // given
    dailyCategoryCount['한식'] = 2; // 한식은 이미 두 번 선택됨
    mockRandom([2, 3]);

    // when
    const category = categoryPicker.pickCategory();

    // then
    expect(category).toBe('중식'); // 한식(2)은 건너뛰고 중식(3) 선택
    expect(dailyCategoryCount['중식']).toBe(1);
  });
});
