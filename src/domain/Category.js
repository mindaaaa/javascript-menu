class Category {
  // 먹은 메뉴 지워주기
  constructor(category, coach) {
    this.category = category;
    this.coach = coach;
  }

  // 코치별 추천 가능한 메뉴 반환
  getAvailableMenus() {
    return this.coach.getAvailableMenusByCategory(this.category);
  }

  removeEatenMenu(eatenMenu) {
    this.coach.removeEatenMenu(this.category, eatenMenu);
  }
}

export default Category;
