import { useCallback } from 'react';

import { routes } from '../../../../../common/constants/routes';
import {
  useKeepDataBetweenNavigation,
  useNotification,
} from '../../../../../common/hooks';
import { useTranslation } from '../../../../../components/IntlProvider';
import { createAttributeApi } from '../../common/api';
import {
  AttributePostData,
  AttributeStateFromRouter,
} from '../../common/types';

type UseCreateAttributeReturn = {
  createAttribute: (data: AttributePostData) => Promise<void>;
};

export const useCreateAttribute = (): UseCreateAttributeReturn => {
  const { translate, getTranslationByLanguage } = useTranslation();
  const { promiseNotification } = useNotification();
  const { navigateWithData } = useKeepDataBetweenNavigation();

  const createAttribute = useCallback(
    async (data: AttributePostData) => {
      const attributeName = data.name;

      try {
        const createdAttribute = await promiseNotification({
          fetch: () => createAttributeApi(data),
          pendingContent: translate('attribute.creating', {
            attributeName,
          }),
          successContent: translate('attribute.created', {
            attributeName,
          }),
          errorContent: translate('attribute.creating.error', {
            attributeName,
          }),
        });

        if (createdAttribute) {
          await navigateWithData<AttributeStateFromRouter>({
            to: `${routes.attributes.root}/${createdAttribute._id}`,
            data: createdAttribute,
          });
        }
      } catch (e) {
        // TODO common error logic
        console.log(e);
      }
    },
    [
      getTranslationByLanguage,
      navigateWithData,
      promiseNotification,
      translate,
    ],
  );

  return { createAttribute };
};
