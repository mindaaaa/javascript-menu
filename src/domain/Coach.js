import Menu from './Menu.js';
// 못 먹는 메뉴 갖고있기
class Coach {
  constructor(name, menu) {
    this.name = name;
    this.menu = new Menu();
    this.dislikedMenus = {}; // 못 먹는 메뉴
    this.eatenMenus = [];
  }

  // ['우동','스시'] 무슨 카테고리일까?
  setDislikedMenus(dislikedMenus) {
    dislikedMenus.forEach((menu) => {
      const category = this.menu.getCategoryByMenu(menu); // 카테고리 나옴 '일식'
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

  addEatenMenu(menu) {
    this.eatenMenus.push(menu);
  }
}

export default Coach;
