import { endpoints } from '../../../common/constants/api';
import { DELETE, PATCH, POST } from '../../../common/utils/api';
import { CategoryPostData, CategoryPostResponse } from '../add/types';
import { CategoryDeleteData, CategoryPatchData } from '../detail/types';

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
