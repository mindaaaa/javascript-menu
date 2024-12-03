// 코치들의 점심 메뉴를 갖고 있는 값객체

class Coach {
  #dislikedMenus;
  #eatenMenus;

  // 카테고리별로만 가져오는 기능도 추가
  constructor(name, menus) {
    this.name = name;
    this.menus = menus;
    this.#dislikedMenus = []; // 못 먹는 메뉴
    this.#eatenMenus = []; // 먹은 메뉴
  }

  getAvailableMenus() {
    return this.menus
      .filter((menu) => !this.#dislikedMenus.includes(menu))
      .filter((menu) => !this.#eatenMenus.includes(menu));
  }

  setDislikedMenus(dislikedMenus) {
    this.#dislikedMenus = dislikedMenus.split(',').map((menu) => menu.trim());
  }

  setEatenMenus(eatenMenu) {
    this.#eatenMenus.push(eatenMenu);
  }

  getEatenMenus() {
    return [...this.#eatenMenus];
  }
}

export default Coach;
