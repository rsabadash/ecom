import { FC } from 'react';

import { routes } from '../../../../common/constants/routes';
import { useCustomNavigate } from '../../../../common/hooks';
import { useTranslation } from '../../../../components/IntlProvider';
import { VariantForm } from '../common/VariantForm';
import { useVariantAddFormSubmit } from './hooks';
import { VariantAddFormProps } from './types';

export const VariantAddForm: FC<VariantAddFormProps> = ({ attributeId }) => {
  const { translate } = useTranslation();

  const navigate = useCustomNavigate();

  const { handleFormSubmit } = useVariantAddFormSubmit({ attributeId });

  const handleCancelAdding = () => {
    navigate(`${routes.attributes.root}/${attributeId}`);
  };

  return (
    <VariantForm
      submitText={translate('add')}
      handleFormReset={handleCancelAdding}
      handleFormSubmit={handleFormSubmit}
    />
  );
};
