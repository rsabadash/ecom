import { Category, CategoryFormProps } from '../common/types';

export type CategoryEditFormProps = Pick<CategoryFormProps, 'defaultValues'> & {
  id?: string;
  isReadOnly: boolean;
  onFormUpdated: () => void;
};

export type CategoryStateFromRouter = Category | null;

export type CategoryUrlParams = {
  categoryId: string;
};

export type CategoryPatchData = Omit<Category, '_id'> & {
  id: string;
};

export type CategoryDeleteData = {
  id: string;
};
