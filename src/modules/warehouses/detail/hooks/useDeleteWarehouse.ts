import { useCallback } from 'react';

import { routes } from '../../../../common/constants/routes';
import { useCustomNavigate, useNotification } from '../../../../common/hooks';
import { useTranslation } from '../../../../components/IntlProvider';
import { deleteWarehouseApi } from '../../common/api';
import { Warehouse } from '../../common/types';

type UseWarehouseSupplierProps = Warehouse | undefined;

type UseDeleteWarehouseReturn = {
  deleteWarehouse: () => Promise<void>;
};

export const useDeleteWarehouse = (
  props: UseWarehouseSupplierProps,
): UseDeleteWarehouseReturn => {
  const { translate } = useTranslation();
  const navigate = useCustomNavigate();
  const { promiseNotification } = useNotification();

  const { _id, name } = props || {};

  const deleteWarehouse = useCallback(async () => {
    if (_id) {
      const warehouseName = name || '';

      try {
        await promiseNotification({
          fetch: () => deleteWarehouseApi(_id),
          pendingContent: translate('warehouse.deleting', {
            warehouseName,
          }),
          successContent: translate('warehouse.deleted', {
            warehouseName,
          }),
          errorContent: translate('warehouse.deleting.error', {
            warehouseName,
          }),
        });

        await navigate(routes.warehouses.root, { replace: true });
      } catch (e) {
        // TODO common error logic
        console.log(e);
      }
    }
  }, [_id, name, navigate, promiseNotification, translate]);

  return { deleteWarehouse };
};
