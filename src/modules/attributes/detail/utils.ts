import { VariantFormValues } from './types';
import { Attribute, AttributeFormValues, Variant } from '../common/types';

export const matchAttributeDataToFormValues = (
  data: Attribute | undefined,
): AttributeFormValues | undefined => {
  if (!data) {
    return undefined;
  }

  const { sortOrder, name, isActive } = data;

  return {
    name,
    isActive,
    sortOrder,
  };
};

export const matchVariantDataToFormValues = (
  data: Variant | undefined,
): VariantFormValues | undefined => {
  if (!data) {
    return undefined;
  }

  const { sortOrder, name, isActive } = data;

  return {
    name,
    isActive,
    sortOrder,
  };
};
