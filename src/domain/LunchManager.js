import CategoryPicker from './CategoryPicker.js';
import MenuPlanner from './MenuPlanner.js';
// 하루 단위의 로직 흐름(카테고리 , 메뉴 추천 , 기록)을 담당한다.
class LunchManager {
  constructor(coaches, categories) {
    this.coaches = coaches;
    this.categories = categories;
    this.categoryPicker = new CategoryPicker(this.getDailyCategoryCount());
    this.result = [];

    this.initializeCategories();
  }

  getDailyCategoryCount() {
    return this.categories.reduce((acc, category) => {
      acc[category] = 0;
      return acc;
    }, {}); // 카테고리별 사용 횟수
  }

  initializeCategories() {
    this.coaches.forEach((coach) => {
      this.categories.forEach((category) => {
        const dislikedMenus = coach.getDislikedMenusByCategory(category.name);
        dislikedMenus.forEach((menu) => {
          category.removeMenu(menu); // 카테고리에서 못 먹는 메뉴 제거
        });
      });
    });
  }

  // Object.entries로도 풀어보기

  recommendDailyMenu() {
    const categoryName = this.categoryPicker.pickCategory();
    const category = this.categories.find(
      (category) => category.name === categoryName
    );
    const dailyMenus = {};

    // 코치별 메뉴 추천
    this.coaches.forEach((coach) => {
      const menuPlanner = new MenuPlanner(coach);
      const recommendedMenu = menuPlanner.planMenu(category);
      dailyMenus[coach.name] = recommendedMenu;

      coach.addEatenMenu(recommendedMenu); // 코치 상태 업데이트
      category.removeMenu(recommendedMenu); // 카테고리 상태 업데이트
    });

    this.result.push({ category: category.name, menus: dailyMenus });
    return { category: category.name, menus: dailyMenus };
  }

  startRecommendation(days = 5) {
    const weeklyResult = [];
    for (let day = 1; day <= days; day++) {
      const dailyResult = this.recommendDailyMenu();
      weeklyResult.push(dailyResult);
    }
    return weeklyResult;
  }
}

export default LunchManager;
