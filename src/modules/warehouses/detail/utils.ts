import { TranslateFn } from '../../../components/IntlProvider';
import { warehouseTypeTranslationPrefix } from '../common/constants';
import { Warehouse, WarehouseFormValues } from '../common/types';

export const mapWarehouseDataToFormValues = (
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
