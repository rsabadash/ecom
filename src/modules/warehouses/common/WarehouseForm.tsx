import { FC } from 'react';

import { Button } from '../../../components/Button';
import { DropdownItemObject } from '../../../components/Fields/Dropdown';
import { Form, FormContent } from '../../../components/FormFields';
import {
  DropdownAdapter,
  InputAdapter,
  TextboxAdapter,
} from '../../../components/FormFieldsAdapter';
import { GridRowBalancer } from '../../../components/GridRowBalancer';
import { useTranslation } from '../../../components/IntlProvider';
import {
  warehouseFormFields,
  WAREHOUSE_TYPE_KEYS,
  warehouseTypeTranslationPrefix,
} from './constants';
import { useWarehouseForm } from './hooks';
import { WarehouseFormProps, WarehouseType } from './types';

export const WarehouseForm: FC<WarehouseFormProps> = ({
  submitText,
  isReadOnly,
  defaultValues,
  handleFormSubmit,
}) => {
  const { translate } = useTranslation();

  const { control, handleSubmit } = useWarehouseForm({
    defaultValues,
    submitHandler: handleFormSubmit,
  });

  const warehouseTypeItems: DropdownItemObject<string, WarehouseType>[] =
    WAREHOUSE_TYPE_KEYS.map((key) => {
      return {
        id: key,
        value: translate(`${warehouseTypeTranslationPrefix}${key}`),
      };
    });

  return (
    <Form onSubmit={handleSubmit}>
      <FormContent>
        <GridRowBalancer columns={2} elementRows={3}>
          <InputAdapter
            isRequired
            isReadOnly={isReadOnly}
            isDescriptionHidden={isReadOnly}
            name={warehouseFormFields.name}
            label={translate('warehouse.name')}
            placeholder={translate('warehouse.name.description')}
            control={control}
            columnIndex={1}
          />
          <DropdownAdapter
            isRequired
            isReadOnly={isReadOnly}
            isDescriptionHidden={isReadOnly}
            name={warehouseFormFields.type}
            items={warehouseTypeItems}
            placeholder={translate('warehouse.type.description')}
            label={translate('warehouse.type')}
            control={control}
            columnIndex={2}
          />
          <TextboxAdapter
            isReadOnly={isReadOnly}
            isDescriptionHidden={isReadOnly}
            name={warehouseFormFields.address}
            placeholder={translate('warehouse.address.description')}
            label={translate('warehouse.address')}
            control={control}
            columnIndex={3}
          />
        </GridRowBalancer>
      </FormContent>
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
