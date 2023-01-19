import { FC } from 'react';
import { GridAutoFit, GridFullWidth } from '../../layouts/Grid';
import { useTranslation } from '../../components/IntlProvider';
import { InputAdapter } from '../../components/FormFieldsAdapter';
import { supplierFormFields } from './constants';
import { Button } from '../../components/Button';
import { SupplierFormProps } from './types';
import {
  useDeleteSupplier,
  useSupplierForm,
  useSupplierFormSubmit,
} from './hooks';

export const SupplierForm: FC<SupplierFormProps> = ({
  id,
  isReadOnly,
  defaultValues,
}) => {
  const { translate } = useTranslation();
  const { deleteSupplier } = useDeleteSupplier(id);
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
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Button variant="primary" type="submit">
                {shouldUpdateProduct
                  ? translate('suppliers.update')
                  : translate('suppliers.add')}
              </Button>
              {shouldUpdateProduct && id && (
                <Button variant="danger" onClick={deleteSupplier}>
                  {translate('supplier.delete')}
                </Button>
              )}
            </div>
          </GridFullWidth>
        )}
      </GridAutoFit>
    </form>
  );
};
