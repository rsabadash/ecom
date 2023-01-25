import { FC } from 'react';
import { GridAutoFit, GridFullWidth } from '../../layouts/Grid';
import { useTranslation } from '../../components/IntlProvider';
import { InputAdapter } from '../../components/FormFieldsAdapter';
import { supplierFormFields } from './constants';
import { Button } from '../../components/Button';
import { SupplierFormProps } from './types';
import { useSupplierForm, useSupplierFormSubmit } from './hooks';

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
    <form noValidate onSubmit={handleSubmit}>
      <GridAutoFit>
        <GridFullWidth>
          <InputAdapter
            isRequired
            isReadOnly={isReadOnly}
            isDescriptionHidden={isReadOnly}
            name={supplierFormFields.name}
            label={translate('suppliers.name')}
            control={control}
          />
        </GridFullWidth>
        <GridFullWidth>
          <InputAdapter
            isReadOnly={isReadOnly}
            isDescriptionHidden={isReadOnly}
            name={supplierFormFields.note}
            label={translate('suppliers.note')}
            control={control}
          />
        </GridFullWidth>
        <GridFullWidth>
          <InputAdapter
            isReadOnly={isReadOnly}
            isDescriptionHidden={isReadOnly}
            name={supplierFormFields.phoneNumber}
            label={translate('suppliers.phoneNumber')}
            control={control}
          />
        </GridFullWidth>
        <GridFullWidth>
          <InputAdapter
            isReadOnly={isReadOnly}
            isDescriptionHidden={isReadOnly}
            name={supplierFormFields.accountId}
            label={translate('suppliers.bill')}
            control={control}
          />
        </GridFullWidth>
        {!isReadOnly && (
          <GridFullWidth>
            <Button variant="primary" type="submit">
              {shouldUpdateProduct ? translate('update') : translate('add')}
            </Button>
          </GridFullWidth>
        )}
      </GridAutoFit>
    </form>
  );
};
