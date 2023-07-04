import { FC } from 'react';

import { Button } from '../../components/Button';
import { Form, FormContent } from '../../components/FormFields';
import { InputAdapter } from '../../components/FormFieldsAdapter';
import { GridRowBalancer } from '../../components/GridRowBalancer';
import { useTranslation } from '../../components/IntlProvider';
import { supplierFormFields } from './constants';
import { useSupplierForm, useSupplierFormSubmit } from './hooks';
import { SupplierFormProps } from './types';

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
          label={translate('supplier.name')}
          control={control}
          columnIndex={1}
        />
        <InputAdapter
          isReadOnly={isReadOnly}
          isDescriptionHidden={isReadOnly}
          name={supplierFormFields.note}
          label={translate('supplier.note')}
          control={control}
          columnIndex={2}
        />
        <InputAdapter
          isReadOnly={isReadOnly}
          isDescriptionHidden={isReadOnly}
          name={supplierFormFields.phoneNumber}
          label={translate('supplier.phone')}
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
