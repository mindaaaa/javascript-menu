import { Random } from '@woowacourse/mission-utils';

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

const shuffledArray = shuffleArray(['김밥', '하이볼']);
console.log(shuffledArray);
