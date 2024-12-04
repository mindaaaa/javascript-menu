class Category {
  constructor(category, coach) {
    this.category = category;
    this.coach = coach;
  }

  // 코치별 추천 가능한 메뉴 반환
  getAvailableMenus() {
    return this.coach.getAvailableMenusByCategory(this.category);
  }
}

export default Category;
