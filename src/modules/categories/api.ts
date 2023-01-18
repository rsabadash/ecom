import {
  CategoryDeleteData,
  CategoryPatchData,
  CategoryPostData,
  CategoryPostResponse,
} from './types';
import { endpoint } from '../../common/constants/api';
import { PATCH, POST, DELETE } from '../../utils/api';

export const createCategory = async (data: CategoryPostData) => {
  return await POST<CategoryPostResponse, CategoryPostData>({
    url: endpoint.categories,
    data,
  });
};

export const updateCategory = async (
  data: CategoryPatchData,
): Promise<void> => {
  await PATCH<void, CategoryPatchData>({
    url: endpoint.categories,
    data,
  });
};

export const deleteCategory = async (id: string | undefined): Promise<void> => {
  if (id) {
    return await DELETE<void, CategoryDeleteData>({
      url: endpoint.categories,
      data: { id },
    });
  }
};
