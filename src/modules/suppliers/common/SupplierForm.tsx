import { FC } from 'react';

import { Button } from '../../../components/Button';
import { Form, FormContent } from '../../../components/FormFields';
import {
  InputAdapter,
  TextboxAdapter,
} from '../../../components/FormFieldsAdapter';
import { GridRowBalancer } from '../../../components/GridRowBalancer';
import { useTranslation } from '../../../components/IntlProvider';
import { supplierFormFields } from './constants';
import { useSupplierForm } from './hooks';
import { SupplierFormProps } from './types';

export const SupplierForm: FC<SupplierFormProps> = ({
  submitText,
  isReadOnly,
  defaultValues,
  handleFormSubmit,
}) => {
  const { translate } = useTranslation();

  const { control, handleSubmit } = useSupplierForm({
    defaultValues,
    shouldReset: isReadOnly,
    submitHandler: handleFormSubmit,
  });

  return (
    <Form onSubmit={handleSubmit}>
      <GridRowBalancer columns={2} elementRows={3}>
        <InputAdapter
          isRequired
          isReadOnly={isReadOnly}
          isDescriptionHidden={isReadOnly}
          name={supplierFormFields.name}
          placeholder={translate('supplier.name.description')}
          label={translate('supplier.name')}
          control={control}
          columnIndex={1}
        />
        <InputAdapter
          isReadOnly={isReadOnly}
          isDescriptionHidden={isReadOnly}
          name={supplierFormFields.phoneNumber}
          placeholder={translate('supplier.phone.description')}
          label={translate('supplier.phone')}
          control={control}
          columnIndex={2}
        />
        <TextboxAdapter
          isReadOnly={isReadOnly}
          isDescriptionHidden={isReadOnly}
          name={supplierFormFields.address}
          placeholder={translate('supplier.address.description')}
          label={translate('supplier.address')}
          control={control}
          columnIndex={3}
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
