import { useCallback } from 'react';

import { routes } from '../../../../common/constants/routes';
import { useCustomNavigate, useNotification } from '../../../../common/hooks';
import { useTranslation } from '../../../../components/IntlProvider';
import { createProductsApi } from '../../common/api';
import { ProductsPostData } from '../../common/types';

type UseCreateProducts = () => {
  createProducts: (data: ProductsPostData) => Promise<void>;
};

export const useCreateProducts: UseCreateProducts = () => {
  const { translate } = useTranslation();
  const { promiseNotification } = useNotification();
  const navigate = useCustomNavigate();

  const createProducts = useCallback(
    async (data: ProductsPostData) => {
      try {
        const createdProducts = await promiseNotification({
          fetch: () => createProductsApi(data),
          pendingContent: translate('product.creating'),
          successContent: translate('product.created'),
          errorContent: translate('product.creating.error'),
        });

        if (createdProducts) {
          await navigate(routes.products.root);
        }
      } catch (e) {
        // TODO common error logic
        console.log(e);
      }
    },
    [navigate, promiseNotification, translate],
  );

  return { createProducts };
};
