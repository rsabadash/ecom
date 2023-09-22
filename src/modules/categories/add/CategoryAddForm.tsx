import { endpoints, path } from '../../../common/constants/api';
import { useTranslation } from '../../../components/IntlProvider';
import { CategoryForm } from '../common/CategoryForm';
import { useCategoryAddFormSubmit } from './hooks';

export const CategoryAddForm = () => {
  const { translate } = useTranslation();

  const { handleFormSubmit } = useCategoryAddFormSubmit();

  return (
    <CategoryForm
      submitText={translate('add')}
      handleFormSubmit={handleFormSubmit}
      dropdownCategoriesUrl={`${endpoints.categories.root}${path.dropdownList}`}
    />
  );
};
