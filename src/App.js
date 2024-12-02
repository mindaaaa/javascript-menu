import ConsoleInput from './infrastructure/ConsoleInput';
import ConsoleOutput from './infrastructure/ConsoleOutput';
import Coach from './domain/Coach.js';

export const SAMPLE = {
  일식: '규동, 우동, 미소시루, 스시, 가츠동, 오니기리, 하이라이스, 라멘, 오코노미야끼',
  한식: '김밥, 김치찌개, 쌈밥, 된장찌개, 비빔밥, 칼국수, 불고기, 떡볶이, 제육볶음',
  중식: '깐풍기, 볶음면, 동파육, 짜장면, 짬뽕, 마파두부, 탕수육, 토마토 달걀볶음, 고추잡채',
  아시안:
    '팟타이, 카오 팟, 나시고렝, 파인애플 볶음밥, 쌀국수, 똠얌꿍, 반미, 월남쌈, 분짜',
  양식: '라자냐, 그라탱, 뇨끼, 끼슈, 프렌치 토스트, 바게트, 스파게티, 피자, 파니니',
};

// 이름 입력 받음
// Coach별 동적 인스턴스화
// 코치마다 못 먹는 메뉴 받음 -> Coach 업데이트
// 메뉴 추천함
// CategoryPicker
// ManuPlanner로 Coach 업뎃

class App {
  async play() {
    try {
      const coaches = await ConsoleInput.read(
        '코치의 이름을 입력해 주세요. (, 로 구분)\n'
      );
      coaches.split(',').map((e) => e.trim()); // ['토미','제임스','포코']
      coaches.map((name) => new Coach(name));
    } catch (error) {}
  }
}

export default App;
