import { useCallback } from 'react';

import { routes } from '../../../../common/constants/routes';
import { useCustomNavigate, useNotification } from '../../../../common/hooks';
import { useTranslation } from '../../../../components/IntlProvider';
import { deleteSupplierApi } from '../../common/api';
import { Supplier } from '../../common/types';

type UseDeleteSupplierProps = Supplier | undefined;

type UseDeleteSupplierReturn = {
  deleteSupplier: () => Promise<void>;
};

export const useDeleteSupplier = (
  props: UseDeleteSupplierProps,
): UseDeleteSupplierReturn => {
  const { translate } = useTranslation();
  const navigate = useCustomNavigate();
  const { promiseNotification } = useNotification();

  const { _id, name } = props || {};

  const deleteSupplier = useCallback(async () => {
    if (_id) {
      const supplierName = name || '';

      try {
        await promiseNotification({
          fetch: () => deleteSupplierApi(_id),
          pendingContent: translate('supplier.deleting', {
            supplierName,
          }),
          successContent: translate('supplier.deleted', {
            supplierName,
          }),
          errorContent: translate('supplier.deleting.error', {
            supplierName,
          }),
        });

        await navigate(routes.suppliers.root, { replace: true });
      } catch (e) {
        // TODO common error logic
        console.log(e);
      }
    }
  }, [_id, name, navigate, promiseNotification, translate]);

  return { deleteSupplier };
};
