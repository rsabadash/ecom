import { useCallback } from 'react';

import { useNotification } from '../../../../common/hooks';
import { useTranslation } from '../../../../components/IntlProvider';
import { updateSupplierApi } from '../../common/api';
import { SupplierPatchData } from '../../common/types';

type UseUpdateSupplierProps = {
  onSuccess: () => void;
};

type UseUpdateSupplierReturn = {
  updateSupplier: (data: SupplierPatchData) => Promise<void>;
};

export const useUpdateSupplier = ({
  onSuccess,
}: UseUpdateSupplierProps): UseUpdateSupplierReturn => {
  const { translate } = useTranslation();
  const { promiseNotification } = useNotification();

  const updateSupplier = useCallback(
    async (data: SupplierPatchData) => {
      const supplierName = data.name;

      try {
        await promiseNotification({
          fetch: () => updateSupplierApi(data),
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

        onSuccess();
      } catch (e) {
        // TODO common error logic
        console.log(e);
      }
    },
    [onSuccess, promiseNotification, translate],
  );

  return { updateSupplier };
};
