import CategoryPicker from './CategoryPicker.js';
import MenuPlanner from './MenuPlanner.js';
// 하루 단위의 로직 흐름(카테고리 , 메뉴 추천 , 기록)을 담당한다.
class LunchManager {
  constructor(coaches) {
    this.coaches = coaches;
    this.categoryPicker = new CategoryPicker(this.getDailyCategoryCount());
    this.result = [];
  }

  recommendDailyMenu() {
    // 카테고리 선택
    const category = this.categoryPicker.pickCategory();
    const dailyMenus = {};

    // 코치별 메뉴 추천
    this.coaches.forEach((coach) => {
      const menuPlanner = new MenuPlanner(coach);
      const recommendedMenu = menuPlanner.planMenu(category);
      dailyMenus[coach.name] = recommendedMenu;

      coach.removeEatenMenu(category, recommendedMenu); // 코치 상태 업데이트
    });

    this.result.push({ category, menus: dailyMenus });
    return { category, menus: dailyMenus };
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
