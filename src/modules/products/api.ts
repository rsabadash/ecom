import { Categories, CategoriesResponse, FetchCategoriesResource } from './types';
import { GET, wrapPromise } from '../../utils/api';
import { ComicsAttributes, FetchComicsAttributesResponse } from './categories/types';

export const fetchCategories = (): FetchCategoriesResource => {
    const categoriesPromise = GET<CategoriesResponse[]>({
        url: '/api/v1/categories'
    });

    return {
        categories: wrapPromise<CategoriesResponse[]>(categoriesPromise)
    };
};

export const fetchCategoryAttributes = (category: Categories): FetchComicsAttributesResponse => {
    const attributesPromise = GET<ComicsAttributes>({
        url: `/api/v1/attributes?category=${category}`
    });

    return {
        attributes: wrapPromise<ComicsAttributes>(attributesPromise)
    };
};