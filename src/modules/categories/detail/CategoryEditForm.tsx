import { FC } from 'react';

import { endpoints, path } from '../../../common/constants/api';
import { useTranslation } from '../../../components/IntlProvider';
import { CategoryForm } from '../common/CategoryForm';
import { useCategoryEditFormSubmit } from './hooks';
import { CategoryEditFormProps } from './types';

export const CategoryEditForm: FC<CategoryEditFormProps> = ({
  id,
  isReadOnly,
  defaultValues,
  onFormReset,
  onFormUpdated,
}) => {
  const { translate } = useTranslation();

  const { handleFormSubmit } = useCategoryEditFormSubmit({ id, onFormUpdated });

  const dropdownCategoriesUrl = id
    ? `${endpoints.categories.root}${path.dropdownList}?_id=${id}`
    : '';

  return (
    <CategoryForm
      submitText={translate('update')}
      isReadOnly={isReadOnly}
      defaultValues={defaultValues}
      handleFormReset={onFormReset}
      handleFormSubmit={handleFormSubmit}
      dropdownCategoriesUrl={dropdownCategoriesUrl}
    />
  );
};
