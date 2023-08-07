import { useCallback } from 'react';

import { DropdownItem } from '../../../../components/Fields/Dropdown';
import {
  CategoryFormValues,
  CategoryPatchData,
  CategoryPostData,
} from '../types';
import { useCreateCategory } from './useCreateCategory';
import { useUpdateCategory } from './useUpdateCategory';

type UseCategoriesFormSubmitProps = {
  id?: string;
};

type UseCategoryFormSubmitReturn = {
  handleFormSubmit: (values: CategoryFormValues) => Promise<void>;
};

export const useCategoryFormSubmit = ({
  id,
}: UseCategoriesFormSubmitProps): UseCategoryFormSubmitReturn => {
  const { createCategory } = useCreateCategory();
  const { updateCategory } = useUpdateCategory();

  const getCategoryIds = useCallback((categories: DropdownItem[]): string[] => {
    return categories.map((category) => {
      return typeof category === 'string' || typeof category === 'number'
        ? String(category)
        : category.id;
    });
  }, []);

  const handleFormSubmit = useCallback(
    async (values: CategoryFormValues) => {
      const data: CategoryPostData | CategoryPatchData = {
        ...values,
        parentIds: getCategoryIds(values.parentIds),
      };

      if (id) {
        await updateCategory({ id, ...data });
      } else {
        await createCategory(data);
      }
    },
    [createCategory, getCategoryIds, id, updateCategory],
  );

  return {
    handleFormSubmit,
  };
};
