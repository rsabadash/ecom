import { CategoryDetailEntity, CategoryFormValues } from './types';

export const matchDataToFormValues = (data: CategoryDetailEntity | undefined): CategoryFormValues | undefined => {
    if (!data) {
        return undefined;
    }

    const { _id, ...rest } = data;

    return {
        ...rest,
        parentIds: rest.parents
    };
};