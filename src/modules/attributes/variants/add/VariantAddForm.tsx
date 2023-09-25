import { FC } from 'react';

import { useTranslation } from '../../../../components/IntlProvider';
import { VariantForm } from '../common/VariantForm';
import { useVariantAddFormSubmit } from './hooks';
import { VariantAddFormProps } from './types';

export const VariantAddForm: FC<VariantAddFormProps> = ({ attributeId }) => {
  const { translate } = useTranslation();

  const { handleFormSubmit } = useVariantAddFormSubmit({ attributeId });

  return (
    <VariantForm
      submitText={translate('add')}
      handleFormSubmit={handleFormSubmit}
    />
  );
};
