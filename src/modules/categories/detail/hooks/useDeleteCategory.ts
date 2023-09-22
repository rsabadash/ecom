import { useCallback } from 'react';

import { routes } from '../../../../common/constants/routes';
import { useCustomNavigate, useNotifications } from '../../../../common/hooks';
import { useTranslation } from '../../../../components/IntlProvider';
import { deleteCategoryApi } from '../../common/api';
import { Category } from '../../common/types';

type UseDeleteCategoryProps = Category;

type UseDeleteCategoryReturn = {
  deleteCategory: () => Promise<void>;
};

export const useDeleteCategory = (
  props: UseDeleteCategoryProps | undefined,
): UseDeleteCategoryReturn => {
  const navigate = useCustomNavigate();
  const { promiseNotification } = useNotifications();
  const { translate, getTranslationByLanguage } = useTranslation();

  const { _id, name } = props || {};

  const deleteCategory = useCallback(async () => {
    if (_id) {
      const translatedCategoryName = getTranslationByLanguage(name);

      try {
        await promiseNotification({
          fetch: () => deleteCategoryApi(_id),
          pendingContent: translate('category.deleting', {
            categoryName: translatedCategoryName,
          }),
          successContent: translate('category.deleted', {
            categoryName: translatedCategoryName,
          }),
          errorContent: translate('category.deleting.error', {
            categoryName: translatedCategoryName,
          }),
        });

        await navigate(routes.categories.root, { replace: true });
      } catch (e) {
        // TODO common error logic
        console.log(e);
      }
    }
  }, [
    _id,
    getTranslationByLanguage,
    name,
    navigate,
    promiseNotification,
    translate,
  ]);

  return { deleteCategory };
};
