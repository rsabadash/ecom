import {
  CategoryDeleteData,
  CategoryPatchData,
  CategoryPostData,
  CategoryPostResponse,
} from './types';
import { endpoints } from '../../common/constants/api';
import { PATCH, POST, DELETE } from '../../utils/api';

export const createCategoryApi = async (
  data: CategoryPostData,
): Promise<CategoryPostResponse | undefined> => {
  return await POST<CategoryPostResponse, CategoryPostData>(
    endpoints.categories.root,
    {
      data,
    },
  );
};

export const updateCategoryApi = async (
  data: CategoryPatchData,
): Promise<void> => {
  await PATCH<void, CategoryPatchData>(endpoints.categories.root, {
    data,
  });
};

export const deleteCategoryApi = async (
  id: string | undefined,
): Promise<void> => {
  if (id) {
    return await DELETE<void, CategoryDeleteData>(endpoints.categories.root, {
      data: { id },
    });
  }
};
