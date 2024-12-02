import { Random } from '@woowacourse/mission-utils';
import { SAMPLE } from '../App.js';

class MenuPlanner {
  constructor(coach, sampleMenus) {
    this.coach = coach;
    this.sampleMenus = sampleMenus;
  }
  planMenu(category) {
    const allMenus = this.sampleMenus[category].split(', ');
    return menu;
  }
  // 1.Coach 인스턴스들의 상태(eatenMenus)를 조회.
  // 2.CategoryPicker에서 반환된 category를 기반으로 메뉴를 필터링.
  // 3.추천 가능한 메뉴를 무작위로 선택(Randoms.shuffle)하고 반환.
}
// const menu = Randoms.shuffle(menus)[0];

export default MenuPlanner;
