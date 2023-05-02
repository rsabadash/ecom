import { FC, useCallback } from 'react';
import { DropdownAdapter } from '../../../components/FormFieldsAdapter';
import { WarehouseProductUnitFieldProps } from './types';
import { UNITS_LIST } from '../../../common/constants/units';
import { useTranslation } from '../../../components/IntlProvider';
import { warehouseProductsGeneratorFormFields } from './constants';
import { Unit } from '../../../common/types/unit';

export const WarehouseProductUnitField: FC<WarehouseProductUnitFieldProps> = ({
  name,
  control,
}) => {
  const { translate } = useTranslation();

  const unitFieldValue = useCallback(
    (unit: Unit) => {
      return unit ? translate(`unit.${unit}`) : unit;
    },
    [translate],
  );

  return (
    <DropdownAdapter
      isRequired
      name={name}
      items={UNITS_LIST}
      placeholder={translate('warehouseProduct.unit.description')}
      label={translate('warehouseProduct.unit')}
      control={control}
      itemValueGetter={unitFieldValue}
      columnIndex={
        name === warehouseProductsGeneratorFormFields.unit ? 2 : undefined
      }
    />
  );
};
