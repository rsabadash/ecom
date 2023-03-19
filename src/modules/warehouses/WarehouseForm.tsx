import { FC } from 'react';
import { Form, FormContent } from '../../components/FormFields';
import { GridRowBalancer } from '../../components/GridRowBalancer';
import {
  DropdownAdapter,
  InputAdapter,
  TextboxAdapter,
} from '../../components/FormFieldsAdapter';
import {
  warehouseFormFields,
  warehouseTypeKeys,
  warehouseTypeTranslationPrefix,
} from './constants';
import { useTranslation } from '../../components/IntlProvider';
import { useWarehouseForm, useWarehouseFormSubmit } from './hooks';
import { WarehouseFormProps, WarehouseType } from './types';
import { DropdownItemObject } from '../../components/Fields/Dropdown';
import { Button } from '../../components/Button';

export const WarehouseForm: FC<WarehouseFormProps> = ({
  id,
  isReadOnly,
  defaultValues,
}) => {
  const { translate } = useTranslation();

  const { handleFormSubmit } = useWarehouseFormSubmit();

  const { control, handleSubmit } = useWarehouseForm({
    defaultValues,
    submitHandler: handleFormSubmit,
  });

  const warehouseTypeItems: DropdownItemObject<string, WarehouseType>[] =
    warehouseTypeKeys.map((key) => {
      return {
        id: key,
        value: translate(`${warehouseTypeTranslationPrefix}${key}`),
      };
    });

  const shouldUpdateCategory =
    defaultValues && Object.keys(defaultValues).length > 0;

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
            {shouldUpdateCategory ? translate('update') : translate('add')}
          </Button>
        </FormContent>
      )}
    </Form>
  );
};
