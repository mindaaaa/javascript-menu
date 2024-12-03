import ConsoleInput from './infrastructure/ConsoleInput';
import ConsoleOutput from './infrastructure/ConsoleOutput';
import Coach from './domain/Coach.js';
import LunchManager from './domain/LunchManager.js';

export const SAMPLE = {
  일식: '규동, 우동, 미소시루, 스시, 가츠동, 오니기리, 하이라이스, 라멘, 오코노미야끼',
  한식: '김밥, 김치찌개, 쌈밥, 된장찌개, 비빔밥, 칼국수, 불고기, 떡볶이, 제육볶음',
  중식: '깐풍기, 볶음면, 동파육, 짜장면, 짬뽕, 마파두부, 탕수육, 토마토 달걀볶음, 고추잡채',
  아시안:
    '팟타이, 카오 팟, 나시고렝, 파인애플 볶음밥, 쌀국수, 똠얌꿍, 반미, 월남쌈, 분짜',
  양식: '라자냐, 그라탱, 뇨끼, 끼슈, 프렌치 토스트, 바게트, 스파게티, 피자, 파니니',
};

class App {
  async play() {
    try {
      //코치 이름
      const coaches = await ConsoleInput.read(
        '코치의 이름을 입력해 주세요. (, 로 구분)\n'
      );
      coaches.split(',').map((e) => e.trim()); // ['토미','제임스','포코']

      //못 먹는 메뉴 입력
      for (const coach of coaches) {
        const dislikedMenus = await ConsoleInput.read(
          `${coach.name}(이)가 못 먹는 메뉴를 입력해 주세요.\n`
        );
        coach.setDislikedMenus(dislikedMenus, this.getMenuCategoryMap());
      }

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
