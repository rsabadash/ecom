import { FC } from 'react';

import { useTranslation } from '../../../components/IntlProvider';
import { SupplierForm } from '../common/SupplierForm';
import { useSupplierEditFormSubmit } from './hooks';
import { SupplierEditFormProps } from './types';

export const SupplierEditForm: FC<SupplierEditFormProps> = ({
  id,
  isReadOnly,
  defaultValues,
  onFormUpdated,
}) => {
  const { translate } = useTranslation();

  const { handleFormSubmit } = useSupplierEditFormSubmit({ id, onFormUpdated });

  return (
    <SupplierForm
      isReadOnly={isReadOnly}
      submitText={translate('update')}
      defaultValues={defaultValues}
      handleFormSubmit={handleFormSubmit}
    />
  );
};
