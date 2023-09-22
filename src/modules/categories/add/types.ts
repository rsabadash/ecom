import { Category } from '../common/types';

export type CategoryPostData = Omit<Category, '_id'>;

export type CategoryPostResponse = Category;
