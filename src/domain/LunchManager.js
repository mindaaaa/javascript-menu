import CategoryPicker from './CategoryPicker.js';
import MenuPlanner from './MenuPlanner.js';
// 하루 단위의 로직 흐름(카테고리 , 메뉴 추천 , 기록)을 담당한다.
class LunchManager {
  constructor(coaches, categories) {
    this.coaches = coaches;
    this.categories = categories;
    this.categoryPicker = new Category();
    this.dailyCategoryCount = categories.reduce((acc, category) => {
      acc[categories] = 0;
      return acc;
    }, {}); // 카테고리별 사용 횟수
    this.result = [];
  }

  recommendDailyMenu() {
    const category = this.pickCategory();
    const dailyMenus = {};

    // 코치별 메뉴 추천
    this.coaches.forEach((coach) => {
      const menuPlanner = new MenuPlanner(coach);
      const recommendedMenu = menuPlanner.planMenu(category);
      dailyMenus[coach.name] = recommendedMenu;
    });

    this.result.push({ category, menus: dailyMenus });
    return { category, menus: dailyMenus };
  }

  pickCategory() {}
}

export default LunchManager;
