import { useTranslation } from '../../../components/IntlProvider';
import { WarehouseForm } from '../common/WarehouseForm';
import { useWarehouseAddFormSubmit } from './hooks';

export const WarehouseAddForm = () => {
  const { translate } = useTranslation();

  const { handleFormSubmit } = useWarehouseAddFormSubmit();

  return (
    <WarehouseForm
      submitText={translate('add')}
      handleFormSubmit={handleFormSubmit}
    />
  );
};
