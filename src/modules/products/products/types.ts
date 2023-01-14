import { DropdownItemObject } from '../../../components/Fields/Dropdown';
import { Categories } from '../categories/types';
import { Translations } from '../../../components/IntlProvider';

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
  title: Translations;
  screenwriter: null | Translations[];
  artist: null | Translations[];
  publishingHouse: string;
  language: Translations;
  format: string;
  cover: Translations;
  pages: number;
  isbn: string;
  year: number;
  description: Translations;
  condition: Translations;
  quantity: number;
  preorder: boolean;
  label: string;
  character: null | Translations[];
  genre: Translations[];
  price: number;
  discountPrice: null | number;
  category: 'comics';
};

export type Product = ComicsProduct;
