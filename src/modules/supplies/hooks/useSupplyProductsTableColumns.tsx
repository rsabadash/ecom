import { useMemo } from 'react';
import { Control, UseFormGetValues, UseFormSetValue } from 'react-hook-form';
import { TableColumnGeneric } from '../../../components/Table';
import { SupplyFormValues, SupplyProductListColumn } from '../types';
import { useTranslation } from '../../../components/IntlProvider';
import { SupplyProductNameCell } from '../SupplyProductNameCell';
import { supplyFormArrayFields } from '../constants';
import { SupplyProductQuantityCell } from '../SupplyProductQuantityCell';
import { SupplyProductPriceCell } from '../SupplyProductPriceCell';
import { SupplyProductTotalCostCell } from '../SupplyProductTotalCostCell';
import { SupplyProductActions } from '../SupplyProductActions';
import { SupplyProductUnitCell } from '../SupplyProductUnitCell';

type UseSupplyProductsTableColumnsProps = {
  control: Control<SupplyFormValues>;
  setValue: UseFormSetValue<SupplyFormValues>;
  getValues: UseFormGetValues<SupplyFormValues>;
  onRemoveProduct: (index: number) => void;
  cellCommonName: ValuesOfObject<typeof supplyFormArrayFields>;
};

type UseSupplyProductsTableColumnsReturn =
  TableColumnGeneric<SupplyProductListColumn>[];

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
        valueGetter: ({ index }) => index + 1,
      },
      {
        title: translate('supply.product.name'),
        key: 'name',
        width: '50%',
        valueGetter: ({ index }) => {
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
        valueGetter: ({ index }) => {
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
        valueGetter: ({ index }) => {
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
        valueGetter: ({ index }) => {
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
        valueGetter: ({ index }) => {
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
        valueGetter: ({ index }) => {
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
