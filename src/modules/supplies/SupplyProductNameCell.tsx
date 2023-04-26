import { FC } from 'react';
import { DropdownWithTooltipAdapter } from '../../components/FormFieldsAdapter';
import { useCachedAPI } from '../../hooks';
import { DropdownItem } from '../../components/Fields/Dropdown';
import { endpoints, path } from '../../common/constants/api';
import { useTranslation } from '../../components/IntlProvider';
import { SupplyProductNameCellProps } from './types';
import { supplyFormProductsSubfields } from './constants';

export const SupplyProductNameCell: FC<SupplyProductNameCellProps> = ({
  index,
  control,
  fieldCommonName,
}) => {
  const { data: warehouseProductsDropdownList } = useCachedAPI<DropdownItem[]>(
    `${endpoints.warehouseProducts.root}${path.dropdownList}`,
  );

  const { translate } = useTranslation();

  return (
    <DropdownWithTooltipAdapter
      isRequired
      size="xs"
      name={`${fieldCommonName}.${index}.${supplyFormProductsSubfields.name}`}
      items={warehouseProductsDropdownList}
      ariaLabel={translate('supply.product.name')}
      control={control}
    />
  );
};
