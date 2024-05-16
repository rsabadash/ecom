import { useCallback } from 'react';

import { routes } from '../../../../common/constants/routes';
import { useCustomNavigate, useNotification } from '../../../../common/hooks';
import { useTranslation } from '../../../../components/IntlProvider';
import { deleteCategoryApi } from '../../common/api';
import { CategoryDetailData } from '../types';

type UseDeleteCategoryProps = CategoryDetailData | undefined;

type UseDeleteCategoryReturn = {
  deleteCategory: () => Promise<void>;
};

export const useDeleteCategory = (
  props: UseDeleteCategoryProps,
): UseDeleteCategoryReturn => {
  const { translate } = useTranslation();
  const navigate = useCustomNavigate();
  const { promiseNotification } = useNotification();

  const { _id, name } = props || {};

  const deleteCategory = useCallback(async () => {
    if (_id) {
      const categoryName = name || '';

      try {
        await promiseNotification({
          fetch: () => deleteCategoryApi(_id),
          pendingContent: translate('category.deleting', {
            categoryName,
          }),
          successContent: translate('category.deleted', {
            categoryName,
          }),
          errorContent: translate('category.deleting.error', {
            categoryName,
          }),
        });

        await navigate(routes.categories.root, { replace: true });
      } catch (e) {
        // TODO common error logic
        console.log(e);
      }
    }
  }, [_id, name, navigate, promiseNotification, translate]);

  return { deleteCategory };
};
