import { FC } from 'react';
import { DropdownWithTooltipAdapter } from '../../components/FormFieldsAdapter';
import { supplyFormProductsSubfields } from './constants';
import { SupplyProductUnitCellProps } from './types';
import { useTranslation } from '../../components/IntlProvider';

export const SupplyProductUnitCell: FC<SupplyProductUnitCellProps> = ({
  index,
  control,
  fieldCommonName,
}) => {
  const { translate } = useTranslation();

  const priceFieldName =
    `${fieldCommonName}.${index}.${supplyFormProductsSubfields.unit}` as const;

  return (
    <DropdownWithTooltipAdapter
      isRequired
      isReadOnly
      size="xs"
      name={priceFieldName}
      ariaLabel={translate('supply.product.unit')}
      control={control}
    />
  );
};
