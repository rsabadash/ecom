import { useTranslation } from '../../../../components/IntlProvider';
import { AttributeForm } from '../common/AttributeForm';
import { useAttributeAddFormSubmit } from './hooks';

export const AttributeAddForm = () => {
  const { translate } = useTranslation();

  const { handleFormSubmit } = useAttributeAddFormSubmit();

  return (
    <AttributeForm
      submitText={translate('add')}
      handleFormSubmit={handleFormSubmit}
    />
  );
};
