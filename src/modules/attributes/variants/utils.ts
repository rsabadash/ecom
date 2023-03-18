import { Variant, VariantFormValues } from './types';

export const matchVariantDataToFormValues = (
  data: Variant | undefined,
): VariantFormValues | undefined => {
  if (!data) {
    return undefined;
  }

  const { sortOrder, name, isActive, seoName } = data;

  return {
    name,
    seoName,
    isActive,
    sortOrder,
  };
};
