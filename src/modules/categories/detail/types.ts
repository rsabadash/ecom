import { Category, CategoryFormDefaultValues } from '../common/types';

export type CategoryEditFormProps = {
  id?: string;
  isReadOnly: boolean;
  defaultValues: CategoryFormDefaultValues | undefined;
  onFormUpdated: () => void;
};

export type CategoryUrlParams = {
  categoryId: string;
};

export type CategoryPatchData = Omit<Category, '_id'> & {
  id: string;
};

export type CategoryDeleteData = {
  id: string;
};
