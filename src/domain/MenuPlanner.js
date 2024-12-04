import { Random } from '@woowacourse/mission-utils';

class MenuPlanner {
  constructor(coach) {
    this.coach = coach;
  }

  planMenu(category) {
    const availableMenus = this.coach.getAvailableMenus();
    const categoryMenus = availableMenus[category];

    return Random.shuffle(categoryMenus)[0];
  }
}

export default MenuPlanner;
