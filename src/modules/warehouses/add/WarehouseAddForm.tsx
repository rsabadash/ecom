import { routes } from '../../../common/constants/routes';
import { useCustomNavigate } from '../../../common/hooks';
import { useTranslation } from '../../../components/IntlProvider';
import { WarehouseForm } from '../common/WarehouseForm';
import { useWarehouseAddFormSubmit } from './hooks';

export const WarehouseAddForm = () => {
  const { translate } = useTranslation();

  const navigate = useCustomNavigate();

  const { handleFormSubmit } = useWarehouseAddFormSubmit();

  const handleCancelAdding = () => {
    navigate(routes.warehouses.root);
  };

  return (
    <WarehouseForm
      submitText={translate('add')}
      handleFormReset={handleCancelAdding}
      handleFormSubmit={handleFormSubmit}
    />
  );
};
