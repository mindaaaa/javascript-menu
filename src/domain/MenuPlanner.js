import Coach from './Coach.js';

class MenuPlanner {
  constructor(coach) {
    this.coach = coach;
  }

  planMenu(category) {
    return this.#shuffleArray(
      this.coach.getAvailableMenusByCategory(category)
    )[0];
  }

  #shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
  }
}

export default MenuPlanner;
