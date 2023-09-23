import { useCallback } from 'react';

import { routes } from '../../../../common/constants/routes';
import {
  useKeepDataBetweenNavigation,
  useNotification,
} from '../../../../common/hooks';
import { useTranslation } from '../../../../components/IntlProvider';
import { createSupplierApi } from '../../common/api';
import { SupplierPostData, SupplierPostResponse } from '../types';

type UseCreateSupplierReturn = {
  createSupplier: (data: SupplierPostData) => Promise<void>;
};

export const useCreateSupplier = (): UseCreateSupplierReturn => {
  const { translate } = useTranslation();
  const { promiseNotification } = useNotification();
  const { navigateWithData } = useKeepDataBetweenNavigation();

  const createSupplier = useCallback(
    async (data: SupplierPostData) => {
      const supplierName = data.name;

      try {
        const createdSupplier = await promiseNotification({
          fetch: () => createSupplierApi(data),
          pendingContent: translate('supplier.creating', {
            supplierName,
          }),
          successContent: translate('supplier.created', {
            supplierName,
          }),
          errorContent: translate('supplier.creating.error', {
            supplierName,
          }),
        });

        if (createdSupplier) {
          await navigateWithData<SupplierPostResponse>({
            to: `${routes.suppliers.root}/${createdSupplier._id}`,
            data: createdSupplier,
          });
        }
      } catch (e) {
        // TODO common error logic
        console.log(e);
      }
    },
    [navigateWithData, promiseNotification, translate],
  );

  return { createSupplier };
};
