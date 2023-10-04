import { useCallback } from 'react';

import { useNotification } from '../../../../../common/hooks';
import { useTranslation } from '../../../../../components/IntlProvider';
import { updateAttributeApi } from '../../common/api';
import { AttributePatchData } from '../../common/types';

type UseUpdateAttributeProps = {
  name: string | undefined;
  onSuccess: () => void;
};

type UseUpdateAttributeReturn = {
  updateAttribute: (data: AttributePatchData) => Promise<void>;
};

export const useUpdateAttribute = ({
  name,
  onSuccess,
}: UseUpdateAttributeProps): UseUpdateAttributeReturn => {
  const { translate } = useTranslation();
  const { promiseNotification } = useNotification();

  const updateAttribute = useCallback(
    async (data: AttributePatchData) => {
      const attributeName = name || '';

      try {
        await promiseNotification({
          fetch: () => updateAttributeApi(data),
          pendingContent: translate('attribute.updating', {
            attributeName,
          }),
          successContent: translate('attribute.updated', {
            attributeName,
          }),
          errorContent: translate('attribute.updating.error', {
            attributeName,
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

  return { updateAttribute };
};
