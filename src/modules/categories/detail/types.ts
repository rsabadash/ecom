import { CategoryFormDefaultValues } from '../common/types';

export type CategoryEditFormProps = {
  id: string | undefined;
  isReadOnly: boolean;
  defaultValues: CategoryFormDefaultValues | undefined;
  onFormUpdated: () => void;
};

export type CategoryUrlParams = {
  categoryId: string;
};
