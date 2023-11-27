import { Category } from '../common/types';

export type CategoriesHierarchyStructureProps = {
  categoryParents?: Category[];
  showCategoryEnabled?: boolean;
};

export type CategoriesHierarchyItemProps = {
  level: number;
  category: Category;
  handleOnExpand: () => void;
  handleOnCollapse: () => void;
  categoryParenIdsMap?: CategoryParenIdsMap;
  isHierarchyCollapsed: boolean;
  showCategoryInHierarchy: boolean;
};

export type CategoryParenIdsMap = {
  [id: string]: boolean;
};
