import { useCallback } from 'react';

import { useNotification } from '../../../../common/hooks';
import { useTranslation } from '../../../../components/IntlProvider';
import { updateCategoryApi } from '../../common/api';
import { CategoryPatchData } from '../types';

type UseUpdateCategoryProps = {
  onFormUpdated: () => void;
};

type UseUpdateCategoryReturn = {
  updateCategory: (data: CategoryPatchData) => Promise<void>;
};

export const useUpdateCategory = ({
  onFormUpdated,
}: UseUpdateCategoryProps): UseUpdateCategoryReturn => {
  const { translate, getTranslationByLanguage } = useTranslation();
  const { promiseNotification } = useNotification();

  const updateCategory = useCallback(
    async (data: CategoryPatchData) => {
      const translatedCategoryName = getTranslationByLanguage(data.name);

      try {
        await promiseNotification({
          fetch: () => updateCategoryApi(data),
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
    },
    [getTranslationByLanguage, onFormUpdated, promiseNotification, translate],
  );

  return { updateCategory };
};
