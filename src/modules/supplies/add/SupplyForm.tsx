import { FC, useCallback, useState } from 'react';

import { endpoints, path } from '../../../common/constants/api';
import { useCachedAPI } from '../../../common/hooks';
import { Button } from '../../../components/Button';
import { DropdownItem } from '../../../components/Fields/Dropdown';
import { Form, FormContent } from '../../../components/FormFields';
import {
  DropdownAdapter,
  InputAdapter,
} from '../../../components/FormFieldsAdapter';
import { GridRowBalancer } from '../../../components/GridRowBalancer';
import { Heading } from '../../../components/Heading';
import { useTranslation } from '../../../components/IntlProvider';
import { SectionForeground } from '../../../layouts/Section';
import { TABLE_ATTRIBUTE_VARIANTS_ID } from '../../attributes/attributes/constants';
import { initialDefaultValues, supplyFormFields } from './constants';
import { useSupplyForm, useSupplyFormSubmit } from './hooks';
import { SupplyProductsDuplicationsModal } from './SupplyProductsDuplicationsModal';
import { SupplyProductsList } from './SupplyProductsList';
import { ProductDuplicateData, SupplyFormProps } from './types';

import classes from './styles/index.module.css';

export const SupplyForm: FC<SupplyFormProps> = ({
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

        <Heading
          id={TABLE_ATTRIBUTE_VARIANTS_ID}
          level={2}
          fontSize={4}
          classNameHeading={classes.supplyProducts__title}
        >
          {translate('supply.products')}
        </Heading>
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
