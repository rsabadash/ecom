import { DEFAULT_LANGUAGE } from '../../../components/IntlProvider';
import {
  DataToGenerateProducts,
  GeneratedProduct,
  GeneratedVariant,
} from './types';

export const transformProductBasedOnVariants = (
  initial: GeneratedProduct,
  data: DataToGenerateProducts,
): GeneratedProduct => {
  const nextNameValue =
    typeof data.name === 'string' ? data.name : data.name[DEFAULT_LANGUAGE];
  const prevNameValue = initial.name ? `${initial.name} ` : '';

  const intermediateResult = {
    ...initial,
    name: `${prevNameValue}${nextNameValue}`,
  };

  if (
    'variantId' in data &&
    'attributeId' in data &&
    data.variantId &&
    data.attributeId
  ) {
    const { attributes } = initial;

    const newVariant: GeneratedVariant = {
      variantId: data.variantId,
      name: data.name,
    };

    const newAttribute = {
      attributeId: data.attributeId,
      variants: [newVariant],
    };

    const updatedAttributes =
      attributes && attributes.length > 0
        ? [...attributes, newAttribute]
        : [newAttribute];

    return {
      ...intermediateResult,
      attributes: updatedAttributes,
    };
  }

  return intermediateResult;
};
