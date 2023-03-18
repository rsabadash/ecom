import { Attribute, AttributeFormValues } from './types';

export const matchAttributeDataToFormValues = (
  data: Attribute | undefined,
): AttributeFormValues | undefined => {
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
