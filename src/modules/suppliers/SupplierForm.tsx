import { FC } from 'react';
import { useTranslation } from '../../components/IntlProvider';
import { InputAdapter } from '../../components/FormFieldsAdapter';
import { supplierFormFields } from './constants';
import { Button } from '../../components/Button';
import { SupplierFormProps } from './types';
import { useSupplierForm, useSupplierFormSubmit } from './hooks';
import { Form, FormContent } from '../../components/FormFields';
import { GridRowBalancer } from '../../components/GridRowBalancer';

export const SupplierForm: FC<SupplierFormProps> = ({
  id,
  isReadOnly,
  defaultValues,
}) => {
  const { translate } = useTranslation();
  const { handleFormSubmit } = useSupplierFormSubmit(id);

  const { control, handleSubmit } = useSupplierForm({
    defaultValues,
    shouldReset: isReadOnly,
    submitHandler: handleFormSubmit,
  });

  const shouldUpdateProduct =
    defaultValues && Object.keys(defaultValues).length > 0;

  return (
    <Form onSubmit={handleSubmit}>
      <GridRowBalancer columns={2} elementRows={3}>
        <InputAdapter
          isRequired
          isReadOnly={isReadOnly}
          isDescriptionHidden={isReadOnly}
          name={supplierFormFields.name}
          label={translate('suppliers.name')}
          control={control}
          columnIndex={1}
        />
        <InputAdapter
          isReadOnly={isReadOnly}
          isDescriptionHidden={isReadOnly}
          name={supplierFormFields.note}
          label={translate('suppliers.note')}
          control={control}
          columnIndex={2}
        />
        <InputAdapter
          isReadOnly={isReadOnly}
          isDescriptionHidden={isReadOnly}
          name={supplierFormFields.phoneNumber}
          label={translate('suppliers.phone')}
          control={control}
          columnIndex={3}
        />
      </GridRowBalancer>
      {!isReadOnly && (
        <FormContent>
          <Button variant="primary" type="submit">
            {shouldUpdateProduct ? translate('update') : translate('add')}
          </Button>
        </FormContent>
      )}
    </Form>
  );
};
