import { useCallback } from 'react';

import { routes } from '../../../../common/constants/routes';
import {
  useKeepDataBetweenNavigation,
  useNotification,
} from '../../../../common/hooks';
import { useTranslation } from '../../../../components/IntlProvider';
import { createCategoryApi } from '../../common/api';
import { CategoryPostData, CategoryStateFromRouter } from '../../common/types';

type UseCreateCategoryReturn = {
  createCategory: (data: CategoryPostData) => Promise<void>;
};

export const useCreateCategory = (): UseCreateCategoryReturn => {
  const { translate } = useTranslation();
  const { promiseNotification } = useNotification();
  const { navigateWithData } = useKeepDataBetweenNavigation();

  const createCategory = useCallback(
    async (data: CategoryPostData) => {
      const categoryName = data.name;

      try {
        const createdCategory = await promiseNotification({
          fetch: () => createCategoryApi(data),
          pendingContent: translate('category.creating', {
            categoryName,
          }),
          successContent: translate('category.created', {
            categoryName,
          }),
          errorContent: translate('category.creating.error', {
            categoryName,
          }),
        });

        if (createdCategory) {
          await navigateWithData<CategoryStateFromRouter>({
            to: `${routes.categories.root}/${createdCategory._id}`,
            data: createdCategory,
          });
        }
      } catch (e) {
        // TODO common error logic
        console.log(e);
      }
    },
    [navigateWithData, promiseNotification, translate],
  );

  return { createCategory };
};
