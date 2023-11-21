import { Attribute, AttributeFormValues } from '../common/types';

export const mapAttributeDataToFormValues = (
  data: Attribute | undefined,
): AttributeFormValues | undefined => {
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
