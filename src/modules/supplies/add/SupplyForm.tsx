import { FC, useCallback, useState } from 'react';
import { useTranslation } from '../../../components/IntlProvider';
import {
  DropdownAdapter,
  InputAdapter,
} from '../../../components/FormFieldsAdapter';
import { initialDefaultValues, supplyFormFields } from './constants';
import { Button } from '../../../components/Button';
import { ProductDuplicateData, SupplyFormProps } from './types';
import { useSupplyForm, useSupplyFormSubmit } from './hooks';
import { Form, FormContent } from '../../../components/FormFields';
import { GridRowBalancer } from '../../../components/GridRowBalancer';
import { useCachedAPI } from '../../../hooks';
import { DropdownItem } from '../../../components/Fields/Dropdown';
import { endpoints, path } from '../../../common/constants/api';
import { SectionForeground } from '../../../layouts/Section';
import { SupplyProductsList } from './SupplyProductsList';
import { SupplyProductsDuplicationsModal } from './SupplyProductsDuplicationsModal';

export const SupplyForm: FC<SupplyFormProps> = ({
  id,
  isReadOnly,
  defaultValues,
}) => {
  const { data: suppliesDropdownList } = useCachedAPI<DropdownItem[]>(
    `${endpoints.suppliers.root}${path.dropdownList}`,
  );
  const { data: warehousesDropdownList } = useCachedAPI<DropdownItem[]>(
    `${endpoints.warehouses.root}${path.dropdownList}`,
  );

  const [duplicationsModalData, setDuplicationsModalData] =
    useState<ProductDuplicateData>({});
  const [isDuplicationsModalOpen, setIsDuplicationsModalOpen] =
    useState<boolean>(false);

  const { translate } = useTranslation();

  const onSubmitSupplyFormError = useCallback((data: ProductDuplicateData) => {
    setDuplicationsModalData(data);
    setIsDuplicationsModalOpen(true);
  }, []);

  const { handleFormSubmit } = useSupplyFormSubmit({
    onError: onSubmitSupplyFormError,
  });

  const { control, setValue, getValues, handleSubmit } = useSupplyForm({
    defaultValues: {
      ...initialDefaultValues,
      ...defaultValues,
    },
    shouldReset: isReadOnly,
    submitHandler: handleFormSubmit,
  });

  const shouldUpdateProduct =
    defaultValues && Object.keys(defaultValues).length > 0;

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <SectionForeground>
          <GridRowBalancer columns={2} elementRows={3}>
            <DropdownAdapter
              isRequired
              isReadOnly={isReadOnly}
              isDescriptionHidden={isReadOnly}
              name={supplyFormFields.supplier}
              items={suppliesDropdownList}
              placeholder={translate('supply.supplier.description')}
              label={translate('supply.supplier')}
              size="xs"
              control={control}
              columnIndex={1}
            />
            <DropdownAdapter
              isRequired
              isReadOnly={isReadOnly}
              isDescriptionHidden={isReadOnly}
              name={supplyFormFields.warehouse}
              items={warehousesDropdownList}
              placeholder={translate('supply.warehouse.description')}
              label={translate('supply.warehouse')}
              size="xs"
              control={control}
              columnIndex={2}
            />
            <InputAdapter
              isReadOnly={isReadOnly}
              isDescriptionHidden={isReadOnly}
              name={supplyFormFields.name}
              placeholder={translate('supply.name.description')}
              label={translate('supply.name')}
              size="xs"
              control={control}
              columnIndex={3}
            />
          </GridRowBalancer>
        </SectionForeground>

        <SupplyProductsList
          control={control}
          setValue={setValue}
          getValues={getValues}
        />

        {!isReadOnly && (
          <FormContent>
            <Button variant="primary" type="submit">
              {shouldUpdateProduct ? translate('update') : translate('add')}
            </Button>
          </FormContent>
        )}
      </Form>

      <SupplyProductsDuplicationsModal
        data={duplicationsModalData}
        isOpen={isDuplicationsModalOpen}
        onClose={() => setIsDuplicationsModalOpen(false)}
      />
    </>
  );
};
