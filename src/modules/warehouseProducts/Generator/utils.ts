import {
  DataToGenerateProducts,
  GeneratedProduct,
  GeneratedVariant,
} from './types';
import {
  DEFAULT_LANGUAGE,
  SUPPORTED_LANGUAGES,
} from '../../../components/IntlProvider';

export const transformProductBasedOnVariants = (
  initial: GeneratedProduct,
  argument: DataToGenerateProducts,
): GeneratedProduct => {
  const intermediateResult = SUPPORTED_LANGUAGES.reduce((acc, language) => {
    const prevTranslation = acc.name?.[language];
    const prevValue = prevTranslation ? `${prevTranslation} ` : '';
    const nextValue = argument.name[language]
      ? argument.name[language]
      : argument.name[DEFAULT_LANGUAGE];

    return {
      ...acc,
      name: {
        ...acc.name,
        [language]: `${prevValue}${nextValue}`,
      },
    };
  }, initial);

  if (argument.variantId && argument.attributeId) {
    const { attribute } = initial;
    const newVariant: GeneratedVariant = {
      variantId: argument.variantId,
      name: argument.name,
    };

    const updatedVariants: GeneratedVariant[] = attribute?.variants
      ? [...attribute.variants, newVariant]
      : [newVariant];

    return {
      ...intermediateResult,
      attribute: {
        attributeId: argument.attributeId,
        variants: updatedVariants,
      },
    };
  }

  return intermediateResult;
};
