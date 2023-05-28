import { FC, useCallback, useState } from 'react';
import { useTranslation } from '../../components/IntlProvider';
import {
  DropdownAdapter,
  InputAdapter,
} from '../../components/FormFieldsAdapter';
import {
  initialDefaultValues,
  supplyFormArrayFields,
  supplyFormFields,
} from './constants';
import { Button } from '../../components/Button';
import { SupplyFormProps } from './types';
import { useSupplyForm, useSupplyFormSubmit } from './hooks';
import { Form, FormContent } from '../../components/FormFields';
import { GridRowBalancer } from '../../components/GridRowBalancer';
import { useCachedAPI } from '../../hooks';
import { DropdownItem } from '../../components/Fields/Dropdown';
import { endpoints, path } from '../../common/constants/api';
import { SectionForeground } from '../../layouts/Section';
import { useFieldArray } from 'react-hook-form';
import { SupplyProductsList } from './SupplyProductsList';
import { Modal } from '../../components/Modal';

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

  const [isRemoveDisabledOpen, setIsRemoveDisabledOpen] =
    useState<boolean>(false);

  const { translate } = useTranslation();

  const { handleFormSubmit } = useSupplyFormSubmit();

  const { control, setValue, getValues, handleSubmit } = useSupplyForm({
    defaultValues: {
      ...initialDefaultValues,
      ...defaultValues,
    },
    shouldReset: isReadOnly,
    submitHandler: handleFormSubmit,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: supplyFormArrayFields.products,
  });

  const shouldUpdateProduct =
    defaultValues && Object.keys(defaultValues).length > 0;

  const handleRemoveProduct = useCallback(
    (index: number): void => {
      if (fields.length > 1) {
        remove(index);
      } else {
        setIsRemoveDisabledOpen(true);
      }
    },
    [fields.length, remove],
  );

  const closeRemoveDisabledModal = () => {
    setIsRemoveDisabledOpen(false);
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <SectionForeground>
          <GridRowBalancer columns={2} elementRows={3}>
            <InputAdapter
              isRequired
              isReadOnly={isReadOnly}
              isDescriptionHidden={isReadOnly}
              name={supplyFormFields.name}
              placeholder={translate('supply.name.description')}
              label={translate('supply.name')}
              size="xs"
              control={control}
              columnIndex={1}
            />
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
              columnIndex={2}
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
              columnIndex={3}
            />
          </GridRowBalancer>
        </SectionForeground>

        <SupplyProductsList
          control={control}
          setValue={setValue}
          getValues={getValues}
          listData={fields}
          listCommonName={supplyFormArrayFields.products}
          onRemoveProduct={handleRemoveProduct}
          handleAddProduct={append}
        />

        {!isReadOnly && (
          <FormContent>
            <Button variant="primary" type="submit">
              {shouldUpdateProduct ? translate('update') : translate('add')}
            </Button>
          </FormContent>
        )}
      </Form>
      <Modal
        isModalFooterHidden
        isNoFocusableElements
        isOpen={isRemoveDisabledOpen}
        onClose={closeRemoveDisabledModal}
      >
        {translate('supply.warning.deleteOneProduct')}
      </Modal>
    </>
  );
};
