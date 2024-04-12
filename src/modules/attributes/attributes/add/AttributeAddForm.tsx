import { routes } from '../../../../common/constants/routes';
import { useCustomNavigate } from '../../../../common/hooks';
import { useTranslation } from '../../../../components/IntlProvider';
import { AttributeForm } from '../common/AttributeForm';
import { useAttributeAddFormSubmit } from './hooks';

export const AttributeAddForm = () => {
  const { translate } = useTranslation();

  const navigate = useCustomNavigate();

  const { handleFormSubmit } = useAttributeAddFormSubmit();

  const handleCancelAdding = () => {
    navigate(routes.attributes.root);
  };

  return (
    <AttributeForm
      submitText={translate('add')}
      handleFormReset={handleCancelAdding}
      handleFormSubmit={handleFormSubmit}
    />
  );
};
