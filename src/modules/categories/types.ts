import { Translations } from '../../components/IntlProvider';

export type Category = {
    _id: string;
    name: Translations;
    isActive: boolean;
    parentIds: string[];
};

export type CategoryDetailEntity = {
    _id: string;
    name: Translations;
    isActive: boolean;
    parents: Category[];
};

export type CategoryFormValues = {
    name: Translations;
    isActive: boolean;
    parentIds: Category[];
};

export type CategoryFormProps = {
    id?: string;
    isReadOnly?: boolean;
    formValues?: Partial<CategoryFormValues>;
};

export type CategoryFormFields = Record<keyof CategoryFormValues, keyof CategoryFormValues>;

export type CategoryPostData = {
    name: Translations;
    isActive: boolean;
    parentIds: string[];
};

export type CategoryPostResponse = {
    _id: string;
    name: Translations;
    isActive: boolean;
    parents: Category[];
};

export type CategoryDeleteData = {
    id: string;
};