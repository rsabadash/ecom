import { FC } from 'react';
import { GridFullWidth } from '../../../layouts/Grid';
import { useTranslation } from '../../../components/IntlProvider';
import {
  InputAdapter,
  MultiLanguageInputAdapter,
} from '../../../components/FormFieldsAdapter';
import { attributesFormFields } from './constants';
import { Button } from '../../../components/Button';
import { CheckboxAdapter } from '../../../components/FormFieldsAdapter/CheckboxAdabter/CheckboxAdapter';
import { AttributeFormProps } from './types';

import { Form } from '../../../components/FormFields';
import { useAttributesForm, useAttributeFormSubmit } from './hooks';
import { GridRowBalancer } from '../../../components/GridRowBalancer';

export const AttributeForm: FC<AttributeFormProps> = ({
  id,
  isReadOnly,
  defaultValues,
}) => {
  const { translate } = useTranslation();
  const { handleFormSubmit } = useAttributeFormSubmit({ id });

  const { control, handleSubmit } = useAttributesForm({
    defaultValues,
    shouldReset: isReadOnly,
    submitHandler: handleFormSubmit,
  });

  const shouldUpdateAttribute =
    defaultValues && Object.keys(defaultValues).length > 0;

  return (
    <Form onSubmit={handleSubmit}>
      <GridRowBalancer columns={2} elementRows={4}>
        <MultiLanguageInputAdapter
          isRequired
          isReadOnly={isReadOnly}
          isDescriptionHidden={isReadOnly}
          name={attributesFormFields.name}
          placeholderTranslation="attribute.name.fillIn"
          label={translate('attribute.name')}
          control={control}
          columnIndex={1}
        />
        <InputAdapter
          isReadOnly={isReadOnly}
          isDescriptionHidden={isReadOnly}
          label={translate('sortOrder')}
          name={attributesFormFields.sortOrder}
          control={control}
          columnIndex={2}
          placeholder={translate('attribute.sortOrder.description')}
          type="number"
        />
        <CheckboxAdapter
          isReadOnly={isReadOnly}
          isDescriptionHidden={isReadOnly}
          name={attributesFormFields.isActive}
          label={translate('attribute.active')}
          placeholder={translate('attribute.active.description')}
          control={control}
          columnIndex={3}
        />
      </GridRowBalancer>
      {!isReadOnly && (
        <GridFullWidth>
          <Button variant="primary" type="submit" size="l">
            {shouldUpdateAttribute ? translate('update') : translate('add')}
          </Button>
        </GridFullWidth>
      )}
    </Form>
  );
};
