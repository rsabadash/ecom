import { FC } from 'react';

import { Button, ButtonsGroup } from '../../../../components/Button';
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
  handleFormReset,
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
          isRequired
          isReadOnly={isReadOnly}
          isDescriptionHidden={isReadOnly}
          name={variantFormFields.seoName}
          label={translate('variant.seoName')}
          placeholder={translate('variant.seoName.description')}
          control={control}
          columnIndex={2}
        />
        <CheckboxAdapter
          isReadOnly={isReadOnly}
          isDescriptionHidden={isReadOnly}
          name={variantFormFields.isActive}
          label={translate('variant.active')}
          control={control}
          columnIndex={3}
        />
      </GridRowBalancer>
      {!isReadOnly && (
        <FormContent>
          <ButtonsGroup>
            <Button variant="primary" type="submit">
              {submitText}
            </Button>
            <Button variant="theme" onClick={handleFormReset}>
              {translate('cancel')}
            </Button>
          </ButtonsGroup>
        </FormContent>
      )}
    </Form>
  );
};
