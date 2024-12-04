import ConsoleInput from './infrastructure/ConsoleInput.js';
import ConsoleOutput from './infrastructure/ConsoleOutput.js';
import Coach from './domain/Coach.js';
import LunchManager from './domain/LunchManager.js';
import Menu from './domain/Menu.js';

class App {
  async play() {
    try {
      //코치 이름
      const coachesNames = await ConsoleInput.read(
        '코치의 이름을 입력해 주세요. (, 로 구분)\n'
      );
      const coaches = coachesNames
        .split(',')
        .map((name) => new Coach(name.trim())); // ['토미','제임스','포코']

      //못 먹는 메뉴 입력
      for (const coach of coaches) {
        const dislikedMenusInput = await ConsoleInput.read(
          `${coach.name}(이)가 못 먹는 메뉴를 입력해 주세요.\n`
        );

        const dislikedMenus = dislikedMenusInput
          .split(',')
          .map((menu) => menu.trim());
        coach.setDislikedMenus(dislikedMenus);
      }
      // 못 먹는 메뉴를 코치별로 넣어준다.

      //런치매니저
      const categories = this.getCategories();
      const lunchManager = new LunchManager(coaches, categories);

      const weeklyResult = lunchManager.startRecommendation();

      // 결과 출력
      this.printResults(weeklyResult, coaches);
      coaches.map((name) => new Coach(name));
    } catch (error) {}
  }

  getMenuCategoryMap() {
    return Object.entries(SAMPLE).reduce((map, [category, menus]) => {
      menus.split(', ').forEach((menu) => {
        map[menu] = category;
      });
      return map;
    }, {});
  }

  // 추천 결과 출력
  printResults(weeklyResult, coaches) {
    ConsoleOutput.printLine('메뉴 추천 결과입니다.');
    ConsoleOutput.printLine(
      '[ 구분 | 월요일 | 화요일 | 수요일 | 목요일 | 금요일 ]'
    );

    // 카테고리 라인 출력
    const categoryLine = `[ 카테고리 | ${weeklyResult
      .map((res) => res.category)
      .join(' | ')} ]`;
    ConsoleOutput.printLine(categoryLine);

    // 코치별 메뉴 추천 결과 출력
    coaches.forEach((coach) => {
      const menuLine = `[ ${coach.name} | ${weeklyResult
        .map((res) => res.menus[coach.name])
        .join(' | ')} ]`;
      ConsoleOutput.printLine(menuLine);
    });

    ConsoleOutput.printLine('추천을 완료했습니다.');
  }
}

export default App;
