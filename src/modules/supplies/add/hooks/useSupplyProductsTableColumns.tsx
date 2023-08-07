import { useMemo } from 'react';
import { Control, UseFormGetValues, UseFormSetValue } from 'react-hook-form';

import { useTranslation } from '../../../../components/IntlProvider';
import {
  TableCellValueGetterProps,
  TableColumnGeneric,
} from '../../../../components/Table';
import { supplyFormArrayFields } from '../constants';
import { SupplyProductActions } from '../SupplyProductActions';
import { SupplyProductNameCell } from '../SupplyProductNameCell';
import { SupplyProductOrderCell } from '../SupplyProductOrderCell';
import { SupplyProductPriceCell } from '../SupplyProductPriceCell';
import { SupplyProductQuantityCell } from '../SupplyProductQuantityCell';
import { SupplyProductTotalCostCell } from '../SupplyProductTotalCostCell';
import { SupplyProductUnitCell } from '../SupplyProductUnitCell';
import { SupplyFormValues, SupplyProductListColumn } from '../types';

type UseSupplyProductsTableColumnsProps = {
  control: Control<SupplyFormValues>;
  setValue: UseFormSetValue<SupplyFormValues>;
  getValues: UseFormGetValues<SupplyFormValues>;
  onRemoveProduct: (index: number) => void;
  cellCommonName: ValuesOfObject<typeof supplyFormArrayFields>;
};

type UseSupplyProductsTableColumnsReturn =
  TableColumnGeneric<SupplyProductListColumn>[];

type SupplyProductValueGetterProps =
  TableCellValueGetterProps<SupplyProductListColumn>;

export const useSupplyProductsTableColumns = ({
  control,
  setValue,
  getValues,
  onRemoveProduct,
  cellCommonName,
}: UseSupplyProductsTableColumnsProps): UseSupplyProductsTableColumnsReturn => {
  const { translate } = useTranslation();

  return useMemo(
    () => [
      {
        title: '№',
        key: 'ordinal',
        width: '24px',
        valueGetter: ({ index }: SupplyProductValueGetterProps) => {
          return <SupplyProductOrderCell index={index} />;
        },
      },
      {
        title: translate('supply.product.name'),
        key: 'name',
        width: '50%',
        valueGetter: ({ index }: SupplyProductValueGetterProps) => {
          return (
            <SupplyProductNameCell
              index={index}
              control={control}
              setValue={setValue}
              getValues={getValues}
              fieldCommonName={cellCommonName}
            />
          );
        },
      },
      {
        title: translate('supply.product.unit'),
        key: 'unit',
        width: '15%',
        valueGetter: ({ index }: SupplyProductValueGetterProps) => {
          return (
            <SupplyProductUnitCell
              index={index}
              control={control}
              fieldCommonName={cellCommonName}
            />
          );
        },
      },
      {
        title: translate('supply.product.quantity'),
        key: 'quantity',
        width: '10%',
        valueGetter: ({ index }: SupplyProductValueGetterProps) => {
          return (
            <SupplyProductQuantityCell
              index={index}
              control={control}
              setValue={setValue}
              getValues={getValues}
              fieldCommonName={cellCommonName}
            />
          );
        },
      },
      {
        title: translate('supply.product.price'),
        key: 'price',
        width: '10%',
        valueGetter: ({ index }: SupplyProductValueGetterProps) => {
          return (
            <SupplyProductPriceCell
              index={index}
              control={control}
              setValue={setValue}
              getValues={getValues}
              fieldCommonName={cellCommonName}
            />
          );
        },
      },
      {
        title: translate('supply.product.totalCost'),
        key: 'totalCost',
        width: '15%',
        valueGetter: ({ index }: SupplyProductValueGetterProps) => {
          return (
            <SupplyProductTotalCostCell
              index={index}
              control={control}
              setValue={setValue}
              getValues={getValues}
              fieldCommonName={cellCommonName}
            />
          );
        },
      },
      {
        title: '',
        key: 'actions',
        width: '24px',
        valueGetter: ({ index }: SupplyProductValueGetterProps) => {
          return (
            <SupplyProductActions
              rowIndex={index}
              onRemoveProduct={onRemoveProduct}
            />
          );
        },
      },
    ],
    [cellCommonName, control, getValues, onRemoveProduct, setValue, translate],
  );
};
