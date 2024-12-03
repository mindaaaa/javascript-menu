// 코치들의 점심 메뉴를 갖고 있는 값객체
import { menuCategoryMap } from './menuCategoryMap';
// 못 먹는 메뉴 갖고있기
class Coach {
  constructor(name, categories) {
    this.name = name;
    this.categories = categories;
    this.dislikedMenus = {}; // 못 먹는 메뉴
  }

  // ['우동','스시'] 무슨 카테고리일까?
  setDislikedMenus(dislikedMenus, menuCategoryMap) {
    dislikedMenus.split(', ').forEach((menu) => {
      const category = menuCategoryMap[menu]; // 카테고리 나옴 '일식'
      if (!this.dislikedMenus[category]) {
        this.dislikedMenus[category] = [];
      }
      this.dislikedMenus[category].push(menu);
    });
  }

  getDislikedMenusByCategory(category) {
    return this.dislikedMenus[category] || [];
  }

  getAllDislikedMenus() {
    return this.dislikedMenus;
  }
}

export default Coach;
