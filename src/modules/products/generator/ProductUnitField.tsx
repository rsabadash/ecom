import { FC, useCallback } from 'react';

import { UNITS_LIST } from '../../../common/constants/units';
import { Unit } from '../../../common/types/unit';
import { DropdownAdapter } from '../../../components/FormFieldsAdapter';
import { useTranslation } from '../../../components/IntlProvider';
import { productsGeneratorFormFields } from './constants';
import { ProductUnitFieldProps } from './types';

export const ProductUnitField: FC<ProductUnitFieldProps> = ({
  name,
  control,
}) => {
  const { translate } = useTranslation();

  const unitFieldValue = useCallback(
    (unit: Unit) => {
      return unit ? translate(`unit.${unit}`) : null;
    },
    [translate],
  );

  return (
    <DropdownAdapter
      isRequired
      name={name}
      items={UNITS_LIST}
      placeholder={translate('product.unit.description')}
      label={translate('product.unit')}
      control={control}
      itemValueGetter={unitFieldValue}
      columnIndex={name === productsGeneratorFormFields.unit ? 2 : undefined}
    />
  );
};
