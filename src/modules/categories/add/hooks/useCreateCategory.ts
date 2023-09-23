import { useCallback } from 'react';

import { routes } from '../../../../common/constants/routes';
import {
  useKeepDataBetweenNavigation,
  useNotification,
} from '../../../../common/hooks';
import { useTranslation } from '../../../../components/IntlProvider';
import { createCategoryApi } from '../../common/api';
import { CategoryStateFromRouter } from '../../common/types';
import { CategoryPostData } from '../types';

type UseCreateCategoryReturn = {
  createCategory: (data: CategoryPostData) => Promise<void>;
};

export const useCreateCategory = (): UseCreateCategoryReturn => {
  const { translate, getTranslationByLanguage } = useTranslation();
  const { promiseNotification } = useNotification();
  const { navigateWithData } = useKeepDataBetweenNavigation();

  const createCategory = useCallback(
    async (data: CategoryPostData) => {
      const translatedCategoryName = getTranslationByLanguage(data.name);

      try {
        const createdCategory = await promiseNotification({
          fetch: () => createCategoryApi(data),
          pendingContent: translate('category.creating', {
            categoryName: translatedCategoryName,
          }),
          successContent: translate('category.created', {
            categoryName: translatedCategoryName,
          }),
          errorContent: translate('category.creating.error', {
            categoryName: translatedCategoryName,
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
    [
      getTranslationByLanguage,
      navigateWithData,
      promiseNotification,
      translate,
    ],
  );

  return { createCategory };
};
