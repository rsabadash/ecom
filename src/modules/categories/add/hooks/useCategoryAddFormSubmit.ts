import { useCallback } from 'react';

import {
  CategoryFormSubmitAction,
  CategoryFormValues,
  CategoryPostData,
} from '../../common/types';
import { getCategoryIds } from '../../common/utils';
import { useCreateCategory } from './useCreateCategory';

type UseCategoryAddFormSubmitReturn = {
  handleFormSubmit: CategoryFormSubmitAction;
};

export const useCategoryAddFormSubmit = (): UseCategoryAddFormSubmitReturn => {
  const { createCategory } = useCreateCategory();

  const handleFormSubmit = useCallback(
    async (values: CategoryFormValues) => {
      const data: CategoryPostData = {
        ...values,
        parentIds: getCategoryIds(values.parentIds),
      };

      await createCategory(data);
    },
    [createCategory],
  );

  return {
    handleFormSubmit,
  };
};
