class Category {
  // 먹은 메뉴 지워주기
  constructor(category, menus) {
    this.category = category;
    this.menus = menus;
  }

  getAvailableMenus(coach) {
    const dislikedMenus = coach.getDislikedMenusByCategory(this.category);
    const eatenMenus = coach.eatenMenus || [];

    return this.menus
      .filter((menu) => !dislikedMenus.includes(menu))
      .filter((menu) => !eatenMenus.includes(menu));
  }

  removeEatenMenu(eatenMenu) {
    this.menus = this.menus.filter((menu) => menu !== eatenMenu);
  }
}
