import { Translations } from '../../../components/IntlProvider';
import { Variant } from '../variants/add/types';

export type Attribute = {
  _id: string;
  name: Translations;
  seoName: string;
  isActive: boolean;
  sortOrder: number;
  variants: Variant[];
};

export type AttributeFormValues = {
  name: Translations;
  seoName: string;
  isActive: boolean;
  sortOrder: number;
};

export type AttributeFormProps = {
  id?: string;
  isReadOnly?: boolean;
  defaultValues?: Partial<AttributeFormValues>;
};

export type AttributesFormFields = Record<
  keyof AttributeFormValues,
  keyof AttributeFormValues
>;

export type AttributePostData = {
  name: Translations;
  isActive: boolean;
  sortOrder: number;
};

export type AttributePatchData = AttributePostData & { id: string };

export type AttributePostResponse = AttributePostData & { _id: string };

export type AttributeDeleteData = {
  id: string;
};

export type AttributesVariantsListProps = {
  variants: Variant[];
  addVariantLink: string;
};

export type AttributeUrlParams = {
  attributeId: string;
  variantId: string;
};

export type AttributeVariantsListPlaceholderProps = {
  addVariantLink: string;
};
