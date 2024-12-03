class Category {
  constructor(category, menus) {
    this.category = category;
    this.menus = menus;
  }

  removeEatenMenu(eatenMenu) {
    this.menus = this.menus.filter((menu) => menu !== eatenMenu);
  }

  getMenus(dislikedMenus, eatenMenus) {
    return this.menus
      .filter((menu) => !dislikedMenus.includes(menu))
      .filter((menu) => !eatenMenus.includes(menu));
  }
}
