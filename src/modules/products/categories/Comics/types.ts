import { attributeLanguage, attributeCover, attributeCondition } from './constants';
import { AttributeItem } from '../types';
import { Translation } from '../../../../components/IntlProvider';
import { ComicsProduct } from '../../products/types';

export type AttributeLanguage = ValuesOfObject<typeof attributeLanguage>;
export type AttributeCover = ValuesOfObject<typeof attributeCover>;
export type AttributeCondition = ValuesOfObject<typeof attributeCondition>;

export type ComicsCategoryFormValues = {
    title: string;
    screenwriter: null | Translation[];
    artist: null | Translation[];
    publishingHouse: string;
    language: Translation;
    format: string;
    cover: Translation;
    pages: string;
    isbn: string;
    year: string;
    description: string;
    condition: Translation;
    quantity: string;
    preorder: boolean;
    label: string;
    character: null | Translation[];
    genre: Translation[];
    price: string;
    discountPrice: undefined | string;
};

export type ComicsNewEntity = Omit<ComicsProduct, '_id' | 'category'>;

export type ComicsAttributes = {
    screenwriter: AttributeItem;
    artist: AttributeItem;
    publishingHouse: AttributeItem;
    language: AttributeItem<AttributeLanguage>;
    format: AttributeItem;
    cover: AttributeItem<AttributeCover>;
    year: AttributeItem<number>;
    condition: AttributeItem<AttributeCondition>;
    label: AttributeItem;
    character: AttributeItem;
    genre: AttributeItem;
};