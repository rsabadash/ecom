import {
  attributeLanguage,
  attributeCover,
  attributeCondition,
} from './constants';
import { Translations } from '../../../../components/IntlProvider';
import { ComicsProduct } from '../../products/types';

export type AttributeLanguage = ValuesOfObject<typeof attributeLanguage>;
export type AttributeCover = ValuesOfObject<typeof attributeCover>;
export type AttributeCondition = ValuesOfObject<typeof attributeCondition>;

export type ComicsCategoryFormValues = {
  title: Translations;
  screenwriter: null | Translations[];
  artist: null | Translations[];
  publishingHouse: string;
  language: Translations;
  format: string;
  cover: Translations;
  pages: string;
  isbn: string;
  year: string;
  description: Translations;
  condition: Translations;
  quantity: string;
  preorder: boolean;
  label: string;
  character: null | Translations[];
  genre: Translations[];
  price: string;
  discountPrice: undefined | string;
};

export type ComicsNewEntity = Omit<ComicsProduct, '_id' | 'category'>;

export type ComicsAttributes = {
  screenwriter: Translations[];
  artist: Translations[];
  publishingHouse: string[];
  language: AttributeLanguage[];
  format: string[];
  cover: AttributeCover[];
  year: number[];
  condition: AttributeCondition[];
  label: string[];
  character: Translations[];
  genre: Translations[];
};
