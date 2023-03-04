import { Translations } from '../../../components/IntlProvider';

export type Attribute = {
  _id: string;
  name: Translations;
  seoName: string;
  isActive: boolean;
  sortOrder: number;
  variants: Variant[];
};

export type Variant = {
  variantId: string;
  name: Translations;
  seoName: string;
  isActive: boolean;
  sortOrder: number;
};

export type VariantWithAttribute = Variant & {
  attributeId: string;
  attributeName: Translations;
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

export type VariantsListProps = {
  variants: Variant[];
  isDetailList: boolean;
};
