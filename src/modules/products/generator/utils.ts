import {
  DataToGenerateProducts,
  GeneratedProduct,
  GeneratedVariant,
  InitialDataToGenerateProducts,
} from './types';

export const transformProductBasedOnVariants = (
  initial: InitialDataToGenerateProducts | GeneratedProduct,
  data: DataToGenerateProducts,
): GeneratedProduct => {
  const nextNameValue = data.name;
  const prevNameValue = 'name' in initial ? `${initial.name} ` : '';

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
    const newVariant: GeneratedVariant = {
      variantId: data.variantId,
      name: data.name,
    };

    const newAttribute = {
      attributeId: data.attributeId,
      variants: [newVariant],
    };

    let updatedAttributes = [newAttribute];

    if ('attributes' in initial) {
      const { attributes } = initial;

      updatedAttributes =
        attributes && attributes.length > 0
          ? [...attributes, newAttribute]
          : [newAttribute];
    }

    return {
      ...intermediateResult,
      attributes: updatedAttributes,
    };
  }

  return {
    ...intermediateResult,
    attributes: null,
  };
};
