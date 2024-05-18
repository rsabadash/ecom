import { useCallback } from 'react';
import { generatePath } from 'react-router-dom';

import { routes } from '../../../../../common/constants/routes';
import {
  useKeepDataBetweenNavigation,
  useNotification,
} from '../../../../../common/hooks';
import { useTranslation } from '../../../../../components/IntlProvider';
import { createVariantApi } from '../../common/api';
import { VariantPostData, VariantStateFromRouter } from '../../common/types';

type UseCreateAttributeVariantReturn = {
  createVariant: (data: VariantPostData) => Promise<void>;
};

export const useCreateVariant = (): UseCreateAttributeVariantReturn => {
  const { translate, getTranslationByLanguage } = useTranslation();
  const { promiseNotification } = useNotification();
  const { navigateWithData } = useKeepDataBetweenNavigation();

  const createVariant = useCallback(
    async (data: VariantPostData) => {
      const variantName = data.name;

      try {
        const createdVariant = await promiseNotification({
          fetch: () => createVariantApi(data),
          pendingContent: translate('variant.creating', {
            variantName,
          }),
          successContent: translate('variant.created', {
            variantName,
          }),
          errorContent: translate('variant.creating.error', {
            variantName,
          }),
        });

        if (createdVariant) {
          const variantDetailPath = generatePath(
            routes.attributes.variantDetail,
            {
              attributeId: createdVariant.attributeId,
              variantId: createdVariant.variantId,
            },
          );

          await navigateWithData<VariantStateFromRouter>({
            to: variantDetailPath,
            data: createdVariant,
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

  return { createVariant };
};
