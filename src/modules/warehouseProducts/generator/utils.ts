import {
  DEFAULT_LANGUAGE,
  SUPPORTED_LANGUAGES,
} from '../../../components/IntlProvider';
import {
  DataToGenerateProducts,
  GeneratedProduct,
  GeneratedVariant,
} from './types';

export const transformProductBasedOnVariants = (
  initial: GeneratedProduct,
  data: DataToGenerateProducts,
): GeneratedProduct => {
  const intermediateResult = SUPPORTED_LANGUAGES.reduce((acc, language) => {
    const prevTranslation = acc.name?.[language];
    const prevValue = prevTranslation ? `${prevTranslation} ` : '';
    const nextValue = data.name[language]
      ? data.name[language]
      : data.name[DEFAULT_LANGUAGE];

    return {
      ...acc,
      name: {
        ...acc.name,
        [language]: `${prevValue}${nextValue}`,
      },
    };
  }, initial);

  if (data.variantId && data.attributeId) {
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
