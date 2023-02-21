import { AttributeVariantFormValues } from './types';
import {
  Attribute,
  AttributeFormValues,
  AttributeVariant,
} from '../common/types';

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

export const matchAttributeVariantDataToFormValues = (
  data: AttributeVariant | undefined,
): AttributeVariantFormValues | undefined => {
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
