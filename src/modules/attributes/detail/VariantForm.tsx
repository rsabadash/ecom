import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { GridFullWidth } from '../../../layouts/Grid';
import { useTranslation } from '../../../components/IntlProvider';
import {
  InputAdapter,
  MultiLanguageInputAdapter,
} from '../../../components/FormFieldsAdapter';
import { variantFormFields } from './constants';
import { Button } from '../../../components/Button';
import { CheckboxAdapter } from '../../../components/FormFieldsAdapter/CheckboxAdabter/CheckboxAdapter';
import { AttributeUrlParams, VariantFormProps } from './types';
import { Form } from '../../../components/FormFields';
import { useVariantForm, useVariantFormSubmit } from './hooks';
import { GridRowBalancer } from '../../../components/GridRowBalancer';

export const VariantForm: FC<VariantFormProps> = ({
  variantId,
  isReadOnly,
  defaultValues,
}) => {
  const { attributeId } = useParams<AttributeUrlParams>();

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
          placeholderTranslation="attribute.variant.name.fillIn"
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
        <CheckboxAdapter
          isReadOnly={isReadOnly}
          isDescriptionHidden={isReadOnly}
          name={variantFormFields.isActive}
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
