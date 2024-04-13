import { Translations } from '../../../../components/IntlProvider';

export type Variant = {
  variantId: string;
  name: Translations;
  seoName: string;
  isActive: boolean;
};

export type VariantWithAttributeId = Variant & {
  attributeId: string;
};

export type VariantFormValues = {
  name: Translations;
  seoName: string;
  isActive: boolean;
};

export type VariantFormFields = Record<
  keyof VariantFormValues,
  keyof VariantFormValues
>;

export type VariantFormDefaultValues = Partial<VariantFormValues>;

export type VariantFormSubmitAction = (
  values: VariantFormValues,
) => Promise<void>;

export type VariantFormProps = {
  submitText: string;
  isReadOnly?: boolean;
  defaultValues?: VariantFormDefaultValues;
  handleFormReset: () => void;
  handleFormSubmit: VariantFormSubmitAction;
};

export type VariantStateFromRouter = VariantWithAttributeId | null;

export type VariantPostData = Omit<VariantWithAttributeId, 'variantId'>;

export type VariantPostResponse = VariantWithAttributeId;

export type VariantPatchData = VariantWithAttributeId;

export type VariantDeleteData = {
  attributeId: string;
  variantId: string;
};
