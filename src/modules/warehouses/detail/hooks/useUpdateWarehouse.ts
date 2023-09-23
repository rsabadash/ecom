import { useCallback } from 'react';

import { useNotification } from '../../../../common/hooks';
import { useTranslation } from '../../../../components/IntlProvider';
import { updateWarehouseApi } from '../../common/api';
import { WarehousePatchData } from '../types';

type UseUpdateWarehouseProps = {
  onFormUpdated: () => void;
};

type UseUpdateWarehouseReturn = {
  updateWarehouse: (data: WarehousePatchData) => Promise<void>;
};

export const useUpdateWarehouse = ({
  onFormUpdated,
}: UseUpdateWarehouseProps): UseUpdateWarehouseReturn => {
  const { translate } = useTranslation();
  const { promiseNotification } = useNotification();

  const updateWarehouse = useCallback(
    async (data: WarehousePatchData) => {
      const warehouseName = data.name;

      try {
        await promiseNotification({
          fetch: () => updateWarehouseApi(data),
          pendingContent: translate('warehouse.updating', {
            warehouseName,
          }),
          successContent: translate('warehouse.updated', {
            warehouseName,
          }),
          errorContent: translate('warehouse.updating.error', {
            warehouseName,
          }),
        });

        onFormUpdated();
      } catch (e) {
        // TODO common error logic
        console.log(e);
      }
    },
    [onFormUpdated, promiseNotification, translate],
  );

  return { updateWarehouse };
};
