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
  categories: Category[];
};

export type CategoryHierarchyItemProps = {
  category: Category;
  level: number;
};

export type CategoryUrlParams = {
  categoryId: string;
};
