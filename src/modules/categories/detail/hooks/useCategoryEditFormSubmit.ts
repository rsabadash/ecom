import { useCallback } from 'react';

import { useNotifications } from '../../../../common/hooks';
import { useTranslation } from '../../../../components/IntlProvider';
import {
  CategoryFormSubmitAction,
  CategoryFormValues,
} from '../../common/types';
import { getCategoryIds } from '../../common/utils';
import { CategoryPatchData } from '../types';
import { useUpdateCategory } from './useUpdateCategory';

type UseCategoriesEditFormSubmitProps = {
  id?: string;
  onFormUpdated: () => void;
};

type UseCategoryEditFormSubmitReturn = {
  handleFormSubmit: CategoryFormSubmitAction;
};

export const useCategoryEditFormSubmit = ({
  id,
  onFormUpdated,
}: UseCategoriesEditFormSubmitProps): UseCategoryEditFormSubmitReturn => {
  const { updateCategory } = useUpdateCategory();
  const { promiseNotification } = useNotifications();
  const { translate, getTranslationByLanguage } = useTranslation();

  const handleFormSubmit = useCallback(
    async (values: CategoryFormValues) => {
      if (id) {
        const data: CategoryPatchData = {
          id,
          ...values,
          parentIds: getCategoryIds(values.parentIds),
        };

        const translatedCategoryName = getTranslationByLanguage(data.name);

        try {
          await promiseNotification({
            fetch: () => updateCategory(data),
            pendingContent: translate('category.updating', {
              categoryName: translatedCategoryName,
            }),
            successContent: translate('category.updated', {
              categoryName: translatedCategoryName,
            }),
            errorContent: translate('category.updating.error', {
              categoryName: translatedCategoryName,
            }),
          });

          onFormUpdated();
        } catch (e) {
          // TODO common error logic
          console.log(e);
        }
      }
    },
    [
      getTranslationByLanguage,
      id,
      onFormUpdated,
      promiseNotification,
      translate,
      updateCategory,
    ],
  );

  return {
    handleFormSubmit,
  };
};
