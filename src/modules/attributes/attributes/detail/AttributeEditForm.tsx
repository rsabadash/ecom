import { FC } from 'react';

import { useTranslation } from '../../../../components/IntlProvider';
import { AttributeForm } from '../common/AttributeForm';
import { useAttributeEditFormSubmit } from './hooks';
import { AttributeEditFormProps } from './types';

export const AttributeEditForm: FC<AttributeEditFormProps> = ({
  id,
  isReadOnly,
  defaultValues,
  onFormUpdated,
}) => {
  const { translate } = useTranslation();

  const { handleFormSubmit } = useAttributeEditFormSubmit({
    id,
    onFormUpdated,
  });

  return (
    <AttributeForm
      isReadOnly={isReadOnly}
      submitText={translate('update')}
      defaultValues={defaultValues}
      handleFormSubmit={handleFormSubmit}
    />
  );
};
