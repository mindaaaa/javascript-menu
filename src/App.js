import ConsoleInput from './infrastructure/ConsoleInput.js';
import ConsoleOutput from './infrastructure/ConsoleOutput.js';
import Coach from './domain/Coach.js';
import MenuPlanner from './domain/MenuPlanner.js';
import LunchManager from './service/LunchManager.js';

class App {
  async play() {
    try {
      const coaches = await this.getCoaches();
      const lunchManager = new LunchManager(coaches);

      const weeklyResult = lunchManager.startRecommendation();

      // 결과 출력
      this.printResults(weeklyResult, coaches);
    } catch (error) {
      ConsoleOutput.writeError(`에러가 발생했습니다: ${error.message}`);
    }
  }

  async getCoaches() {
    // 코치 이름 입력
    const coachesNames = await ConsoleInput.read(
      '코치의 이름을 입력해 주세요. (, 로 구분)\n'
    );
    const coaches = coachesNames
      .split(',')
      .map((name) => new Coach(name.trim()));

    // 각 코치의 못 먹는 메뉴 입력
    for (const coach of coaches) {
      const dislikedMenusInput = await ConsoleInput.read(
        `${coach.name}(이)가 못 먹는 메뉴를 입력해 주세요.\n`
      );
      const dislikedMenus = dislikedMenusInput
        .split(',')
        .map((menu) => menu.trim());
      coach.setDislikedMenus(dislikedMenus);
    }

    return coaches;
  }

  // 추천 결과 출력
  printResults(weeklyResult, coaches) {
    ConsoleOutput.write('메뉴 추천 결과입니다.');
    ConsoleOutput.write(
      '[ 구분 | 월요일 | 화요일 | 수요일 | 목요일 | 금요일 ]'
    );

    // 카테고리 라인 출력
    const categoryLine = `[ 카테고리 | ${weeklyResult
      .map((res) => res.category)
      .join(' | ')} ]`;
    ConsoleOutput.write(categoryLine);

    // 코치별 메뉴 추천 결과 출력
    coaches.forEach((coach) => {
      const menuLine = `[ ${coach.name} | ${weeklyResult
        .map((res) => res.menus[coach.name])
        .join(' | ')} ]`;
      ConsoleOutput.write(menuLine);
    });

    ConsoleOutput.write('추천을 완료했습니다.');
  }
}

export default App;
