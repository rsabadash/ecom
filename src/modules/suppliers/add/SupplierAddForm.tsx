import { routes } from '../../../common/constants/routes';
import { useCustomNavigate } from '../../../common/hooks';
import { useTranslation } from '../../../components/IntlProvider';
import { SupplierForm } from '../common/SupplierForm';
import { useSupplierAddFormSubmit } from './hooks';

export const SupplierAddForm = () => {
  const { translate } = useTranslation();

  const navigate = useCustomNavigate();

  const { handleFormSubmit } = useSupplierAddFormSubmit();

  const handleCancelAdding = () => {
    navigate(routes.suppliers.root);
  };

  return (
    <SupplierForm
      submitText={translate('add')}
      handleFormReset={handleCancelAdding}
      handleFormSubmit={handleFormSubmit}
    />
  );
};
