import { FC } from 'react';
import { GridFullWidth } from '../../../layouts/Grid';
import { useTranslation } from '../../../components/IntlProvider';
import {
  InputAdapter,
  MultiLanguageInputAdapter,
} from '../../../components/FormFieldsAdapter';
import { attributesFormFields } from './constants';
import { Button } from '../../../components/Button';
import { CheckboxAdapter } from '../../../components/FormFieldsAdapter';
import { AttributeFormProps } from './types';
import { Form } from '../../../components/FormFields';
import { useAttributeForm, useAttributeFormSubmit } from './hooks';
import { GridRowBalancer } from '../../../components/GridRowBalancer';

export const AttributeForm: FC<AttributeFormProps> = ({
  id,
  isReadOnly,
  defaultValues,
}) => {
  const { translate } = useTranslation();
  const { handleFormSubmit } = useAttributeFormSubmit({ id });

  const { control, handleSubmit } = useAttributeForm({
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
          isRequired
          isReadOnly={isReadOnly}
          isDescriptionHidden={isReadOnly}
          name={attributesFormFields.seoName}
          label={translate('attribute.seoName')}
          placeholder={translate('attribute.seoName.description')}
          control={control}
          columnIndex={3}
        />
        <InputAdapter
          type="number"
          isReadOnly={isReadOnly}
          isDescriptionHidden={isReadOnly}
          name={attributesFormFields.sortOrder}
          placeholder={translate('attribute.sortOrder.description')}
          label={translate('sortOrder')}
          control={control}
          columnIndex={2}
        />
        <CheckboxAdapter
          isReadOnly={isReadOnly}
          isDescriptionHidden={isReadOnly}
          name={attributesFormFields.isActive}
          label={translate('attribute.active')}
          placeholder={translate('attribute.active.description')}
          control={control}
          columnIndex={4}
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
