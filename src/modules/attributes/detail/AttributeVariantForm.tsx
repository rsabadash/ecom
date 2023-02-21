import { FC } from 'react';
import { GridFullWidth } from '../../../layouts/Grid';
import { useTranslation } from '../../../components/IntlProvider';
import {
  InputAdapter,
  MultiLanguageInputAdapter,
} from '../../../components/FormFieldsAdapter';
import { attributesVariantFormFields } from './constants';
import { Button } from '../../../components/Button';
import { CheckboxAdapter } from '../../../components/FormFieldsAdapter/CheckboxAdabter/CheckboxAdapter';
import { AttributesVariantFormProps } from './types';

import { Form } from '../../../components/FormFields';
import {
  useAttributeVariantForm,
  useAttributeVariantFormSubmit,
} from './hooks';
import { GridRowBalancer } from '../../../components/GridRowBalancer';

export const AttributeVariantForm: FC<AttributesVariantFormProps> = ({
  variantId,
  isReadOnly,
  defaultValues,
}) => {
  const { translate } = useTranslation();
  const { handleFormSubmit } = useAttributeVariantFormSubmit({ variantId });

  const { control, handleSubmit } = useAttributeVariantForm({
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
          name={attributesVariantFormFields.name}
          placeholderTranslation="attribute.variant.name.fillIn"
          label={translate('attribute.variant.name')}
          control={control}
          columnIndex={1}
        />
        <InputAdapter
          isReadOnly={isReadOnly}
          label={translate('sortOrder')}
          name={attributesVariantFormFields.sortOrder}
          control={control}
          columnIndex={2}
          placeholder={translate('attribute.variant.sortOrder.description')}
          type="number"
        />
        <CheckboxAdapter
          isReadOnly={isReadOnly}
          isDescriptionHidden={isReadOnly}
          name={attributesVariantFormFields.isActive}
          label={translate('attribute.variant.active')}
          placeholder={translate('attribute.variant.active.description')}
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
