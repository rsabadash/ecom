import { DropdownItemObject } from '../../../components/Fields/Dropdown';
import { Categories } from '../categories/types';
import { Translation } from '../../../components/IntlProvider';

export type CategoriesResponse = {
    category: Categories;
};

export type FormCategoryValues = {
    category: DropdownItemObject<string, 'comics'>;
};

export type MapCategoryToComponent = {
    [key in Categories]: JSX.Element;
};

export type ComicsProduct = {
    _id: string;
    title: Translation;
    screenwriter: null | Translation[];
    artist: null | Translation[];
    publishingHouse: string;
    language: Translation;
    format: string;
    cover: Translation;
    pages: number;
    isbn: string;
    year: number;
    description: Translation;
    condition: Translation;
    quantity: number;
    preorder: boolean;
    label: string;
    character: null | Translation[];
    genre: Translation[];
    price: number;
    discountPrice: null | number;
    category: 'comics';
};

export type Product = ComicsProduct;