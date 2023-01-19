import { useCallback } from 'react';
import { DropdownItem } from '../../../components/Fields/Dropdown';
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

type UseCategoryFormSubmit = (props: UseCategoriesFormSubmitProps) => {
  handleFormSubmit: (values: CategoryFormValues) => Promise<void>;
};

export const useCategoryFormSubmit: UseCategoryFormSubmit = ({ id }) => {
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
    [createCategory, getCategoryIds, id, updateCategory],
  );

  return {
    handleFormSubmit,
  };
};