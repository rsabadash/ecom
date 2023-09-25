import { useCallback } from 'react';

import { routes } from '../../../../common/constants/routes';
import {
  useKeepDataBetweenNavigation,
  useNotification,
} from '../../../../common/hooks';
import { useTranslation } from '../../../../components/IntlProvider';
import { createWarehouseApi } from '../../common/api';
import {
  WarehousePostData,
  WarehouseStateFromRouter,
} from '../../common/types';

type UseCreateWarehouseReturn = {
  createWarehouse: (data: WarehousePostData) => Promise<void>;
};

export const useCreateWarehouse = (): UseCreateWarehouseReturn => {
  const { translate } = useTranslation();
  const { promiseNotification } = useNotification();
  const { navigateWithData } = useKeepDataBetweenNavigation();

  const createWarehouse = useCallback(
    async (data: WarehousePostData) => {
      const warehouseName = data.name;

      try {
        const createdWarehouse = await promiseNotification({
          fetch: () => createWarehouseApi(data),
          pendingContent: translate('warehouse.creating', {
            warehouseName,
          }),
          successContent: translate('warehouse.created', {
            warehouseName,
          }),
          errorContent: translate('warehouse.creating.error', {
            warehouseName,
          }),
        });

        if (createdWarehouse) {
          await navigateWithData<WarehouseStateFromRouter>({
            to: `${routes.warehouses.root}/${createdWarehouse._id}`,
            data: createdWarehouse,
          });
        }
      } catch (e) {
        // TODO common error logic
        console.log(e);
      }
    },
    [navigateWithData, promiseNotification, translate],
  );

  return { createWarehouse };
};
