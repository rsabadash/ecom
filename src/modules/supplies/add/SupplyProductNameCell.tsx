import { FC } from 'react';
import { DropdownWithTooltipAdapter } from '../../../components/FormFieldsAdapter';
import { useCachedAPI } from '../../../hooks';
import {
  DropdownItem,
  DropdownValue,
} from '../../../components/Fields/Dropdown';
import { endpoints, path } from '../../../common/constants/api';
import { useTranslation } from '../../../components/IntlProvider';
import { ProductNameDropdownMeta, SupplyProductCellProps } from './types';
import { supplyFormProductsSubfields } from './constants';
import { getDropdownMeta } from '../../../utils';

const { quantity: quantitySubfield, unit: unitSubfield } =
  supplyFormProductsSubfields;

export const SupplyProductNameCell: FC<SupplyProductCellProps> = ({
  index,
  control,
  setValue,
  getValues,
  fieldCommonName,
}) => {
  const { data: warehouseProductsDropdownList } = useCachedAPI<DropdownItem[]>(
    `${endpoints.warehouseProducts.root}${path.dropdownList}`,
    { dedupingInterval: 30000 },
  );

  const { translate } = useTranslation();

  const fieldNamePrefix = `${fieldCommonName}.${index}` as const;
  const unitFieldName = `${fieldNamePrefix}.${unitSubfield}` as const;
  const quantityFieldName = `${fieldNamePrefix}.${quantitySubfield}` as const;
  const productNameFieldName =
    `${fieldNamePrefix}.${supplyFormProductsSubfields.name}` as const;

  const handleDropdownChange = (
    value: DropdownValue<string, string, ProductNameDropdownMeta>,
  ): void => {
    if (value && !Array.isArray(value) && typeof value !== 'string') {
      const meta = getDropdownMeta<ProductNameDropdownMeta>(value);

      if (meta) {
        const { unit } = meta;
        const { quantity, unit: prevUnit } =
          getValues(`products.${index}`) || {};

        const translatedUnit = unit ? translate(`unit.${unit}`) : '';

        setValue(unitFieldName, { id: unit, value: translatedUnit });

        if (quantity && unit !== prevUnit?.id) {
          setValue(quantityFieldName, quantity, {
            shouldValidate: true,
          });
        }
      }
    }
  };

  return (
    <DropdownWithTooltipAdapter
      isRequired
      size="xs"
      name={productNameFieldName}
      items={warehouseProductsDropdownList}
      onChange={handleDropdownChange}
      ariaLabel={translate('supply.product.name')}
      control={control}
    />
  );
};
