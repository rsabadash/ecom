import { Translations } from '../../../components/IntlProvider';

export type AttributeUrlParams = {
  attributeId: string;
};

export type VariantFormValues = {
  name: Translations;
  isActive: boolean;
  sortOrder: number;
};

export type VariantFormFields = Record<
  keyof VariantFormValues,
  keyof VariantFormValues
>;

export type VariantFormProps = {
  variantId?: string;
  isReadOnly?: boolean;
  defaultValues?: Partial<VariantFormValues>;
};

export type VariantPostData = {
  name: Translations;
  isActive: boolean;
  sortOrder: number;
  attributeId?: string;
};

export type VariantPatchData = Omit<VariantPostData, 'attributeId'> & {
  variantId?: string;
};

export type VariantPostResponse = VariantPostData & {
  variantId: string;
};

export type VariantDeleteData = {
  variantId: string;
};

export type VariantUrlParams = {
  variantId: string;
};
