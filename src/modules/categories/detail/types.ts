import { Category, CategoryFormDefaultValues } from '../common/types';

export type CategoryDetailData = Omit<Category, 'parentIdsHierarchy'> & {
  parents: Category[];
};

export type CategoryEditFormProps = {
  id: string | undefined;
  isReadOnly: boolean;
  defaultValues: CategoryFormDefaultValues | undefined;
  onFormUpdated: () => void;
};

export type CategoryHierarchyProps = {
  categoryParents: Category[] | undefined;
};

export type CategoryHierarchyItemProps = {
  level: number;
  category: Category;
  handleOnExpand: () => void;
  handleOnCollapse: () => void;
  categoryParenIdsMap: CategoryParenIdsMap | undefined;
  isHierarchyCollapsed: boolean;
  showCategoryInHierarchy: boolean;
};

export type CategoryUrlParams = {
  categoryId: string;
};

export type CategoryParenIdsMap = {
  [id: string]: boolean;
};
