// 코치들의 점심 메뉴를 갖고 있는 값객체

class Coach {
  constructor(name, menus) {
    this.name = name;
    this.dislikedMenus = [];
    this.eatenMenus = this.#removeDislikedMenus(this.dislikedMenus, menus);
  }

  #removeDislikedMenus(dislikeMenus, menus) {
    return menus.filter((menu) => !dislikeMenus.includes(menu));
  }
}

export default Coach;
