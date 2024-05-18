import { useCallback } from 'react';

import { useNotification } from '../../../../common/hooks';
import { useTranslation } from '../../../../components/IntlProvider';
import { updateCategoryApi } from '../../common/api';
import { CategoryPatchData } from '../../common/types';

type UseUpdateCategoryProps = {
  onSuccess: () => void;
};

type UseUpdateCategoryReturn = {
  updateCategory: (data: CategoryPatchData) => Promise<void>;
};

export const useUpdateCategory = ({
  onSuccess,
}: UseUpdateCategoryProps): UseUpdateCategoryReturn => {
  const { translate } = useTranslation();
  const { promiseNotification } = useNotification();

  const updateCategory = useCallback(
    async (data: CategoryPatchData) => {
      const categoryName = data.name;

      try {
        await promiseNotification({
          fetch: () => updateCategoryApi(data),
          pendingContent: translate('category.updating', {
            categoryName,
          }),
          successContent: translate('category.updated', {
            categoryName,
          }),
          errorContent: translate('category.updating.error', {
            categoryName,
          }),
        });

        onSuccess();
      } catch (e) {
        // TODO common error logic
        console.log(e);
      }
    },
    [onSuccess, promiseNotification, translate],
  );

  return { updateCategory };
};
