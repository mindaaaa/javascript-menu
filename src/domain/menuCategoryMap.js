import { SAMPLE } from './App';

export const menuCategoryMap = Object.entries(SAMPLE).reduce(
  (map, [category, menus]) => {
    menus.split(', ').forEach((menu) => {
      map[menu] = category;
    });
    return map;
  },
  {}
);
