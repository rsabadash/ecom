import { WrapPromiseResult } from '../../../utils/api';
import { attributeLanguage, attributeCover, attributeCondition } from './constants';
import { Language } from '../../../components/IntlProvider';
import { DropdownItemObject } from '../../../components/Form/Dropdown';

export type AttributeLanguage = ValuesOfObject<typeof attributeLanguage>;
export type AttributeCover = ValuesOfObject<typeof attributeCover>;
export type AttributeCondition = ValuesOfObject<typeof attributeCondition>;

export type ComicsCategoryFormValues = {
    screenwriter: string;
    artist: string;
    publishingHouse: string;
    language: DropdownItemObject;
    format: string;
    cover: DropdownItemObject;
    year: number;
    condition: DropdownItemObject;
    label: string;
    character: string;
    genre: string;
    title: string;
    price: string;
    priceDiscount: string;
    pages: string;
    quantity: string;
    isbn: string;
    description: string;
};

export type Translation = {
    [key in AttributeLanguage]: string;
};

export type ComicsAttributeItem<Case = string> = {
    cases: Case[];
    translations?: Translation[];
}

export type ComicsAttributes = {
    screenwriter: ComicsAttributeItem;
    artist: ComicsAttributeItem;
    publishingHouse: ComicsAttributeItem;
    language: ComicsAttributeItem<Language>;
    format: ComicsAttributeItem;
    cover: ComicsAttributeItem<AttributeCover>;
    year: ComicsAttributeItem<number>;
    condition: ComicsAttributeItem<AttributeCondition>;
    label: ComicsAttributeItem;
    character: ComicsAttributeItem;
    genre: ComicsAttributeItem;
};

export type FetchComicsAttributesResponse = {
    attributes: WrapPromiseResult<ComicsAttributes>;
};