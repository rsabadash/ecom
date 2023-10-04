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
  const { translate, getTranslationByLanguage } = useTranslation();
  const navigate = useCustomNavigate();
  const { promiseNotification } = useNotification();

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
