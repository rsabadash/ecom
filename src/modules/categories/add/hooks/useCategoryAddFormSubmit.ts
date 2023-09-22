import { useCallback } from 'react';

import { routes } from '../../../../common/constants/routes';
import {
  useKeepDataBetweenNavigation,
  useNotifications,
} from '../../../../common/hooks';
import { useTranslation } from '../../../../components/IntlProvider';
import {
  CategoryFormSubmitAction,
  CategoryFormValues,
} from '../../common/types';
import { getCategoryIds } from '../../common/utils';
import { CategoryPostData, CategoryPostResponse } from '../types';
import { useCreateCategory } from './useCreateCategory';

type UseCategoryAddFormSubmitReturn = {
  handleFormSubmit: CategoryFormSubmitAction;
};

export const useCategoryAddFormSubmit = (): UseCategoryAddFormSubmitReturn => {
  const { createCategory } = useCreateCategory();

  const { promiseNotification } = useNotifications();
  const { translate, getTranslationByLanguage } = useTranslation();
  const { navigateWithData } = useKeepDataBetweenNavigation();

  const handleFormSubmit = useCallback(
    async (values: CategoryFormValues) => {
      const data: CategoryPostData = {
        ...values,
        parentIds: getCategoryIds(values.parentIds),
      };

      const translatedCategoryName = getTranslationByLanguage(data.name);

      try {
        const createdCategory = await promiseNotification({
          fetch: () => createCategory(data),
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
          await navigateWithData<CategoryPostResponse>({
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
      createCategory,
      getTranslationByLanguage,
      navigateWithData,
      promiseNotification,
      translate,
    ],
  );

  return {
    handleFormSubmit,
  };
};
