import { FC } from 'react';
import { useParams } from 'react-router-dom';

import { Button } from '../../../../components/Button';
import { Form, FormContent } from '../../../../components/FormFields';
import {
  InputAdapter,
  MultiLanguageInputAdapter,
} from '../../../../components/FormFieldsAdapter';
import { CheckboxAdapter } from '../../../../components/FormFieldsAdapter';
import { GridRowBalancer } from '../../../../components/GridRowBalancer';
import { useTranslation } from '../../../../components/IntlProvider';
import { AttributeUrlParams } from '../../attributes/add/types';
import { variantFormFields } from './constants';
import { useVariantForm, useVariantFormSubmit } from './hooks';
import { VariantFormProps } from './types';

export const VariantForm: FC<VariantFormProps> = ({
  isReadOnly,
  defaultValues,
}) => {
  const { attributeId, variantId } = useParams<AttributeUrlParams>();

  const { translate } = useTranslation();
  const { handleFormSubmit } = useVariantFormSubmit({ attributeId, variantId });

  const { control, handleSubmit } = useVariantForm({
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
          name={variantFormFields.name}
          placeholderTranslation="attribute.variant.name.description"
          label={translate('attribute.variant.name')}
          control={control}
          columnIndex={1}
        />
        <InputAdapter
          type="number"
          isReadOnly={isReadOnly}
          isDescriptionHidden={isReadOnly}
          name={variantFormFields.sortOrder}
          placeholder={translate('attribute.variant.sortOrder.description')}
          label={translate('sortOrder')}
          control={control}
          columnIndex={2}
        />
        <InputAdapter
          isRequired
          isReadOnly={isReadOnly}
          isDescriptionHidden={isReadOnly}
          name={variantFormFields.seoName}
          label={translate('attribute.variant.seoName')}
          placeholder={translate('attribute.variant.seoName.description')}
          control={control}
          columnIndex={3}
        />
        <CheckboxAdapter
          isReadOnly={isReadOnly}
          isDescriptionHidden={isReadOnly}
          name={variantFormFields.isActive}
          label={translate('attribute.variant.active')}
          control={control}
          columnIndex={4}
        />
      </GridRowBalancer>
      {!isReadOnly && (
        <FormContent>
          <Button variant="primary" type="submit">
            {shouldUpdateAttribute ? translate('update') : translate('add')}
          </Button>
        </FormContent>
      )}
    </Form>
  );
};
