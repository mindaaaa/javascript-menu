import { Random } from '@woowacourse/mission-utils';

const categoryMapping = {
  1: '일식',
  2: '한식',
  3: '중식',
  4: '아시안',
  5: '양식',
};

const createCategoryCount = () => ({
  일식: 0,
  한식: 0,
  중식: 0,
  아시안: 0,
  양식: 0,
});

class CategoryPicker {
  constructor(weeklyCategoryCount) {
    this.weeklyCategoryCount = weeklyCategoryCount || createCategoryCount();
  }

  pickCategory() {
    while (true) {
      const randomNumber = Random.pickNumberInRange(1, 5);
      const category = categoryMapping[randomNumber];

      if (this.#isCategoryAvailable(category)) {
        this.weeklyCategoryCount[category]++;
        return category;
      }
    }
  }

  #isCategoryAvailable(category) {
    return this.weeklyCategoryCount[category] < 2;
  }
}

export default CategoryPicker;
