import { useCallback } from 'react';

import {
  CategoryFormSubmitAction,
  CategoryFormValues,
  CategoryPostData,
} from '../../common/types';
import { getCategoryId } from '../../common/utils';
import { useCreateCategory } from './useCreateCategory';

type UseCategoryAddFormSubmitReturn = {
  handleFormSubmit: CategoryFormSubmitAction;
};

export const useCategoryAddFormSubmit = (): UseCategoryAddFormSubmitReturn => {
  const { createCategory } = useCreateCategory();

  const handleFormSubmit = useCallback(
    async (values: CategoryFormValues) => {
      const { parent, ...restValues } = values;

      const data: CategoryPostData = {
        ...restValues,
        parentId: getCategoryId(parent),
      };

      await createCategory(data);
    },
    [createCategory],
  );

  return {
    handleFormSubmit,
  };
};
