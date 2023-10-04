import { useTranslation } from '../../../components/IntlProvider';
import { SupplierForm } from '../common/SupplierForm';
import { useSupplierAddFormSubmit } from './hooks';

export const SupplierAddForm = () => {
  const { translate } = useTranslation();

  const { handleFormSubmit } = useSupplierAddFormSubmit();

  return (
    <SupplierForm
      submitText={translate('add')}
      handleFormSubmit={handleFormSubmit}
    />
  );
};
