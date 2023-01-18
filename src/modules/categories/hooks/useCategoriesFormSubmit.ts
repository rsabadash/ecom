import { useCallback } from 'react';
import { DropdownItem } from '../../../components/Fields/Dropdown';
import {
  CategoryFormValues,
  CategoryPatchData,
  CategoryPostData,
} from '../types';
import { createCategory, updateCategory } from '../api';

type UseCategoriesFormSubmitProps = {
  id?: string;
};

type UseCategoriesFormSubmitReturn = {
  handleFormSubmit: (values: CategoryFormValues) => Promise<void>;
};

export const useCategoriesFormSubmit = ({
  id,
}: UseCategoriesFormSubmitProps): UseCategoriesFormSubmitReturn => {
  const getCategoryIds = useCallback((categories: DropdownItem[]): string[] => {
    return categories.map((category) => {
      return typeof category === 'string' || typeof category === 'number'
        ? String(category)
        : category.id;
    });
  }, []);

  const handleFormSubmit = useCallback(
    async (value: CategoryFormValues) => {
      const data: CategoryPostData | CategoryPatchData = {
        ...value,
        parentIds: getCategoryIds(value.parentIds),
      };

      if (id) {
        await updateCategory({ id, ...data });
      } else {
        await createCategory(data);
      }
    },
    [getCategoryIds, id],
  );

  return {
    handleFormSubmit,
  };
};
