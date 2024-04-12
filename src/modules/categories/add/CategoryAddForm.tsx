import { endpoints, path } from '../../../common/constants/api';
import { routes } from '../../../common/constants/routes';
import { useCustomNavigate } from '../../../common/hooks';
import { useTranslation } from '../../../components/IntlProvider';
import { CategoryForm } from '../common/CategoryForm';
import { useCategoryAddFormSubmit } from './hooks';

export const CategoryAddForm = () => {
  const navigate = useCustomNavigate();
  const { translate } = useTranslation();

  const { handleFormSubmit } = useCategoryAddFormSubmit();

  const handleCancelAdding = () => {
    navigate(routes.categories.root);
  };

  return (
    <CategoryForm
      submitText={translate('add')}
      handleFormReset={handleCancelAdding}
      handleFormSubmit={handleFormSubmit}
      dropdownCategoriesUrl={`${endpoints.categories.root}${path.dropdownList}`}
    />
  );
};
