import { Category, CategoryFormDefaultValues } from '../common/types';

export type CategoryDetailData = Omit<Category, 'parentIdsHierarchy'> & {
  parents: Category[];
};

export type CategoryEditFormProps = {
  id: string | undefined;
  isReadOnly: boolean;
  defaultValues: CategoryFormDefaultValues | undefined;
  onFormReset: () => void;
  onFormUpdated: () => void;
};

export type CategoryHierarchySectionProps = {
  categoryParents: Category[] | undefined;
};

export type CategoryDetailActionsProps = {
  onEdit: () => void;
  onDelete: () => Promise<void>;
  isReadOnly: boolean;
};

export type CategoryUrlParams = {
  categoryId: string;
};
