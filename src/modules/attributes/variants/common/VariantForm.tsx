import { FC } from 'react';

import { Button } from '../../../../components/Button';
import { Form, FormContent } from '../../../../components/FormFields';
import {
  CheckboxAdapter,
  InputAdapter,
  MultiLanguageInputAdapter,
} from '../../../../components/FormFieldsAdapter';
import { GridRowBalancer } from '../../../../components/GridRowBalancer';
import { useTranslation } from '../../../../components/IntlProvider';
import { variantFormFields } from './constants';
import { useVariantForm } from './hooks';
import { VariantFormProps } from './types';

export const VariantForm: FC<VariantFormProps> = ({
  submitText,
  isReadOnly,
  defaultValues,
  handleFormSubmit,
}) => {
  const { translate } = useTranslation();

  const { control, handleSubmit } = useVariantForm({
    defaultValues,
    shouldReset: isReadOnly,
    submitHandler: handleFormSubmit,
  });

  return (
    <Form onSubmit={handleSubmit}>
      <GridRowBalancer columns={2} elementRows={4}>
        <MultiLanguageInputAdapter
          isRequired
          isReadOnly={isReadOnly}
          isDescriptionHidden={isReadOnly}
          name={variantFormFields.name}
          placeholderTranslation="variant.name.description"
          label={translate('variant.name')}
          control={control}
          columnIndex={1}
        />
        <InputAdapter
          type="number"
          isReadOnly={isReadOnly}
          isDescriptionHidden={isReadOnly}
          name={variantFormFields.sortOrder}
          placeholder={translate('variant.sortOrder.description')}
          label={translate('sortOrder')}
          control={control}
          columnIndex={2}
        />
        <InputAdapter
          isRequired
          isReadOnly={isReadOnly}
          isDescriptionHidden={isReadOnly}
          name={variantFormFields.seoName}
          label={translate('variant.seoName')}
          placeholder={translate('variant.seoName.description')}
          control={control}
          columnIndex={3}
        />
        <CheckboxAdapter
          isReadOnly={isReadOnly}
          isDescriptionHidden={isReadOnly}
          name={variantFormFields.isActive}
          label={translate('variant.active')}
          control={control}
          columnIndex={4}
        />
      </GridRowBalancer>
      {!isReadOnly && (
        <FormContent>
          <Button variant="primary" type="submit">
            {submitText}
          </Button>
        </FormContent>
      )}
    </Form>
  );
};