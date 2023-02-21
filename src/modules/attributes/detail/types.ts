import { Translations } from '../../../components/IntlProvider';

export type AttributeUrlParams = {
  attributeId: string;
};

export type AttributeVariantFormValues = {
  name: Translations;
  isActive: boolean;
  sortOrder: number;
};

export type AttributesVariantFormFields = Record<
  keyof AttributeVariantFormValues,
  keyof AttributeVariantFormValues
>;

export type AttributesVariantFormProps = {
  variantId?: string;
  isReadOnly?: boolean;
  defaultValues?: Partial<AttributeVariantFormValues>;
};

export type AttributeVariantPostData = {
  name: Translations;
  isActive: boolean;
  sortOrder: number;
  attributeId?: string;
};

export type AttributeVariantPatchData = Omit<
  AttributeVariantPostData,
  'attributeId'
> & {
  variantId?: string;
};

export type AttributeVariantPostResponse = AttributeVariantPostData & {
  variantId: string;
};

export type AttributeVariantDeleteData = {
  variantId: string;
};

export type AttributeVariantUrlParams = {
  variantId: string;
};
