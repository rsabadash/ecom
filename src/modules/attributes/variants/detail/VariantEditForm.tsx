import { FC } from 'react';

import { useTranslation } from '../../../../components/IntlProvider';
import { VariantForm } from '../common/VariantForm';
import { useVariantEditFormSubmit } from './hooks';
import { VariantEditFormProps } from './types';

export const VariantEditForm: FC<VariantEditFormProps> = ({
  id,
  isReadOnly,
  defaultValues,
  onFormUpdated,
  variantName,
  attributeId,
}) => {
  const { translate } = useTranslation();

  const { handleFormSubmit } = useVariantEditFormSubmit({
    name: variantName,
    variantId: id,
    attributeId,
    onFormUpdated,
  });

  return (
    <VariantForm
      isReadOnly={isReadOnly}
      submitText={translate('edit')}
      defaultValues={defaultValues}
      handleFormSubmit={handleFormSubmit}
    />
  );
};
