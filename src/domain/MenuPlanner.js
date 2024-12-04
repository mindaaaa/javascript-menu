import { Random } from '@woowacourse/mission-utils';
import Coach from './Coach';

class MenuPlanner {
  constructor(coach) {
    this.coach = coach;
  }

  planMenu(category) {
    return Random.shuffle(this.coach.getAvailableMenusByCategory(category))[0];
  }
}

export default MenuPlanner;
