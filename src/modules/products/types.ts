import { WrapPromiseResult } from '../../utils/api';
import { DropdownItemObject } from '../../components/Form/Dropdown';
import { categories } from './constants';
import {Language} from "../../components/IntlProvider";

export type Categories = ValuesOfObject<typeof categories>;

export type CategoriesResponse = {
    category: Categories;
};

export type FetchCategoriesResource = {
    categories: WrapPromiseResult<CategoriesResponse[]>;
};

export type FormCategoryValues = {
    category: DropdownItemObject<string, 'comics'>;
};

export type MapCategoryToComponent = {
    [key in Categories]: JSX.Element;
};

type Translation = {
    [key in Language]: string;
};

type Character = Translation & {
    originalName: string;
};

export type ComicsProduct = {
    _id: string;
    title: string;
    screenwriter: null | Translation[];
    artist: null | Translation[];
    publishingHouse: string;
    language: string;
    format: string;
    cover: 'hard' | 'soft';
    pages: number;
    isbn: string;
    year: number;
    description: Translation;
    status: 'new' | 'used';
    quantity: number;
    label: string;
    character: null | Character[];
    category: 'comics';
    genre: Translation[];
    price: number;
    discountPrice: null | number;
};

export type Product = ComicsProduct;