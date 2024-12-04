import { Randoms } from '@woowacourse/mission-utils';

class MenuPlanner {
  constructor(coach) {
    this.coach = coach;
  }

  planMenu(category) {
    const availableMenus = this.coach.getAvailableMenus();
    const categoryMenus = availableMenus[category];

    return Randoms.shuffle(categoryMenus)[0];
  }
}

export default MenuPlanner;
