import { Translations } from '../../../components/IntlProvider';

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

export type VariantFormValues = {
  name: Translations;
  seoName: string;
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
  seoName: string;
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

export type VariantsListProps = {
  variants: VariantWithAttribute[];
};
