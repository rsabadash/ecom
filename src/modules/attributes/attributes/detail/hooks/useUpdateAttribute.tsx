import { useCallback } from 'react';

import { useNotification } from '../../../../../common/hooks';
import { useTranslation } from '../../../../../components/IntlProvider';
import { updateAttributeApi } from '../../common/api';
import { AttributePatchData } from '../types';

type UseUpdateAttributeProps = {
  onFormUpdated: () => void;
};

type UseUpdateAttributeReturn = {
  updateAttribute: (data: AttributePatchData) => Promise<void>;
};

export const useUpdateAttribute = ({
  onFormUpdated,
}: UseUpdateAttributeProps): UseUpdateAttributeReturn => {
  const { translate, getTranslationByLanguage } = useTranslation();
  const { promiseNotification } = useNotification();

  const updateAttribute = useCallback(
    async (data: AttributePatchData) => {
      const translatedAttributeName = getTranslationByLanguage(data.name);

      try {
        await promiseNotification({
          fetch: () => updateAttributeApi(data),
          pendingContent: translate('attribute.updating', {
            attributeName: translatedAttributeName,
          }),
          successContent: translate('attribute.updated', {
            attributeName: translatedAttributeName,
          }),
          errorContent: translate('attribute.updating.error', {
            attributeName: translatedAttributeName,
          }),
        });

        onFormUpdated();
      } catch (e) {
        // TODO common error logic
        console.log(e);
      }
    },
    [getTranslationByLanguage, onFormUpdated, promiseNotification, translate],
  );

  return { updateAttribute };
};
