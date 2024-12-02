// 코치들의 점심 메뉴를 갖고 있는 값객체

class Coach {
  constructor(name, menus) {
    this.name = name;
    this.menus = menus;
    this.dislikedMenus = []; // 못 먹는 메뉴
    this.eatenMenus = []; // 먹은 메뉴
    this.availableMenus = this.#removeDislikedMenus(this.dislikedMenus, menus); // 먹을 수 있는 메뉴
  }

  getAvailableMenus(dislikeMenus, eatenMenus) {
    return this.menus
      .filter(this.#removeDislikedMenus)
      .filter(this.#removeEatenMenu);
  }

  #removeDislikedMenus(dislikeMenus, menus) {
    return menus.filter((menu) => !dislikeMenus.includes(menu));
  }

  #removeEatenMenu(eatenMenu, menus) {
    return menus.filter((menu) => !eatenMenu.includes(menu));
  }
}

export default Coach;
