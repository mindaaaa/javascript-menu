// 코치들의 점심 메뉴를 갖고 있는 값객체

class Coach {
  constructor(name) {
    this.name = name;
    this.dislikedMenus = []; // 못 먹는 메뉴
    this.eatenMenus = []; // 먹은 메뉴
  }

  setDislikedMenus(dislikedMenus) {
    this.dislikedMenus = dislikedMenus.split(',').map((menu) => menu.trim());
  }

  eatMenu(menu) {
    this.eatenMenus.push(menu);
  }

  getEatenMenus() {
    return [...this.eatenMenus];
  }

  getAvailableMenus(category) {
    return category.getMenus(this.dislikedMenus, this.eatMenu);
  }
}

export default Coach;
