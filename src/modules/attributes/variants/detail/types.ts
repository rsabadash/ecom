import { VariantFormDefaultValues } from '../common/types';

export type VariantEditFormProps = {
  id: string | undefined;
  isReadOnly: boolean;
  defaultValues: VariantFormDefaultValues | undefined;
  onFormReset: () => void;
  onFormUpdated: () => void;
  variantName: string | undefined;
  attributeId: string | undefined;
};

export type VariantUrlParams = {
  variantId: string;
  attributeId: string;
};
