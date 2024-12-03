class Category {
  constructor(name, menus) {
    this.name = name;
    this.menus = menus;
  }

  getAvailableMenus(dislikedMenus, eatenMenus) {
    return this.menus
      .filter((menu) => !dislikedMenus.includes(menu))
      .filter((menu) => !eatenMenus.includes(menu));
  }
}
