import { useCallback } from 'react';

import { useNotification } from '../../../../../common/hooks';
import { useTranslation } from '../../../../../components/IntlProvider';
import { updateVariantApi } from '../../common/api';
import { VariantPatchData } from '../../common/types';

type UseUpdateAttributeProps = {
  name: string | undefined;
  onSuccess: () => void;
};

type UseUpdateAttributeReturn = {
  updateVariant: (data: VariantPatchData) => Promise<void>;
};

export const useUpdateVariant = ({
  name,
  onSuccess,
}: UseUpdateAttributeProps): UseUpdateAttributeReturn => {
  const { translate } = useTranslation();
  const { promiseNotification } = useNotification();

  const updateVariant = useCallback(
    async (data: VariantPatchData) => {
      const variantName = name || '';

      try {
        await promiseNotification({
          fetch: () => updateVariantApi(data),
          pendingContent: translate('variant.updating', {
            variantName,
          }),
          successContent: translate('variant.updated', {
            variantName,
          }),
          errorContent: translate('variant.updating.error', {
            variantName,
          }),
        });

        onSuccess();
      } catch (e) {
        // TODO common error logic
        console.log(e);
      }
    },
    [name, onSuccess, promiseNotification, translate],
  );

  return { updateVariant };
};
