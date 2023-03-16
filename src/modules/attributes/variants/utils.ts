import { VariantFormValues } from './types';
import { Variant } from '../attributes/types';

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
