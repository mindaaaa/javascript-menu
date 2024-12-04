import Menu from './Menu.js';
// 못 먹는 메뉴 갖고있기
class Coach {
  constructor(name) {
    this.name = name;
    this.menu = new Menu();
    this.dislikedMenus = {}; // 못 먹는 메뉴
    this.availableMenus = {};
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

    this.initializeAvailableMenus(); // 코치별 먹을 수 있는 메뉴 초기화
  }

  // 먹을 수 있는 배열 초기화
  initializeAvailableMenus() {
    const categories = Object.keys(this.menu.getAllMenus());
    categories.forEach((category) => {
      const menusByCategory = this.menu.getMenuByCategory(category);
      this.availableMenus[category] = menusByCategory.filter(
        (menu) => !this.dislikedMenus[category]?.includes(menu) //dislikedMenus가 정의되지 않을 가능성
      );
    });
  }

  // 카테고리에서 먹을 수 있는 메뉴 가져오기
  getAvailableMenusByCategory(category) {
    return this.availableMenus[category] || [];
  }

  // 먹은 메뉴 filter
  removeEatenMenu(category, eatenMenu) {
    this.availableMenus[category] = this.availableMenus.filter(
      menu !== eatenMenu
    );
  }
}

export default Coach;
