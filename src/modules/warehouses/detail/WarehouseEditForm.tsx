import { FC } from 'react';

import { useTranslation } from '../../../components/IntlProvider';
import { WarehouseForm } from '../common/WarehouseForm';
import { useWarehouseEditFormSubmit } from './hooks';
import { WarehouseEditFormProps } from './types';

export const WarehouseEditForm: FC<WarehouseEditFormProps> = ({
  id,
  isReadOnly,
  defaultValues,
  onFormUpdated,
}) => {
  const { translate } = useTranslation();

  const { handleFormSubmit } = useWarehouseEditFormSubmit({
    id,
    onFormUpdated,
  });

  return (
    <WarehouseForm
      isReadOnly={isReadOnly}
      defaultValues={defaultValues}
      submitText={translate('edit')}
      handleFormSubmit={handleFormSubmit}
    />
  );
};
