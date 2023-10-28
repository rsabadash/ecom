import { Variant, VariantFormValues } from '../common/types';

export const matchVariantDataToFormValues = (
  data: Variant | undefined,
): VariantFormValues | undefined => {
  if (!data) {
    return undefined;
  }

  const { name, isActive, seoName } = data;

  return {
    name,
    seoName,
    isActive,
  };
};
