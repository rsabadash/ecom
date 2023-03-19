import { Warehouse, WarehouseFormValues } from './types';
import { TranslateFn } from '../../components/IntlProvider';
import { warehouseTypeTranslationPrefix } from './constants';

export const matchWarehouseDataToFormValues = (
  data: Warehouse | undefined,
  translateFn: TranslateFn,
): WarehouseFormValues | undefined => {
  if (!data) {
    return undefined;
  }

  const { name, type, address } = data;

  return {
    name,
    type: {
      id: type,
      value: translateFn(`${warehouseTypeTranslationPrefix}${type}`),
    },
    address,
  };
};
