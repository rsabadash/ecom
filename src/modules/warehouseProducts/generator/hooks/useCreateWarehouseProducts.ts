import { useCallback } from 'react';

import { routes } from '../../../../common/constants/routes';
import { useCustomNavigate, useNotification } from '../../../../common/hooks';
import { useTranslation } from '../../../../components/IntlProvider';
import { createWarehouseProductsApi } from '../../common/api';
import { WarehouseProductsPostData } from '../../common/types';

type UseCreateWarehouseProducts = () => {
  createWarehouseProducts: (data: WarehouseProductsPostData) => Promise<void>;
};

export const useCreateWarehouseProducts: UseCreateWarehouseProducts = () => {
  const { translate } = useTranslation();
  const { promiseNotification } = useNotification();
  const navigate = useCustomNavigate();

  const createWarehouseProducts = useCallback(
    async (data: WarehouseProductsPostData) => {
      try {
        const createdWarehouseProducts = await promiseNotification({
          fetch: () => createWarehouseProductsApi(data),
          pendingContent: translate('warehouseProduct.creating'),
          successContent: translate('warehouseProduct.created'),
          errorContent: translate('warehouseProduct.creating.error'),
        });

        if (createdWarehouseProducts) {
          await navigate(routes.warehouseProducts.root);
        }
      } catch (e) {
        // TODO common error logic
        console.log(e);
      }
    },
    [navigate, promiseNotification, translate],
  );

  return { createWarehouseProducts };
};
