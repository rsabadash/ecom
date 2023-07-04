import { BaseSyntheticEvent, useCallback } from 'react';

import { cartesian } from '../../../../common/utils/cartesian';
import {
  DEFAULT_LANGUAGE,
  SUPPORTED_LANGUAGES,
  Translations,
} from '../../../../components/IntlProvider';
import { buttonNames } from '../constants';
import {
  AttributeVirtualFieldValue,
  DataToGenerateProducts,
  GeneratedAttribute,
  GeneratedProduct,
  VariantVirtualFieldValue,
  WarehouseProductsGeneratorFormValues,
} from '../types';
import { transformProductBasedOnVariants } from '../utils';

type UseWarehouseProductsGeneratorFormSubmitProps = {
  onSuccess: (products: GeneratedProduct[]) => void;
};

type UseWarehouseProductsGeneratorFormSubmitReturn = {
  handleFormSubmit: (
    values: WarehouseProductsGeneratorFormValues,
    event?: BaseSyntheticEvent,
  ) => Promise<void>;
};

export const useWarehouseProductsGeneratorFormSubmit = ({
  onSuccess,
}: UseWarehouseProductsGeneratorFormSubmitProps): UseWarehouseProductsGeneratorFormSubmitReturn => {
  const getListToProductGeneration = useCallback(
    (attributes: AttributeVirtualFieldValue): VariantVirtualFieldValue[][] => {
      const sortedIds = Object.keys(attributes).sort();

      return sortedIds.map((id) => attributes[id]);
    },
    [],
  );

  const generateProducts = useCallback(
    (values: WarehouseProductsGeneratorFormValues): GeneratedProduct[] => {
      if (values.attributesVirtual) {
        const listToProductGeneration = getListToProductGeneration(
          values.attributesVirtual,
        );

        return cartesian<DataToGenerateProducts, GeneratedProduct>(
          transformProductBasedOnVariants,
          { unit: values.unit },
          [{ name: values.name }],
          ...listToProductGeneration,
        );
      }

      return [{ name: values.name, attributes: null, unit: values.unit }];
    },
    [getListToProductGeneration],
  );

  const generateSingleNameWithVariants = useCallback(
    (name: Translations, attributes: GeneratedAttribute[]): Translations => {
      const generatedProduct = SUPPORTED_LANGUAGES.reduce(
        (acc, language) => {
          const variantsValue = attributes?.reduce((acc, attribute) => {
            let nextValue = '';

            attribute.variants.forEach((variant) => {
              nextValue = variant.name[language]
                ? `${nextValue} ${variant.name[language]} `
                : nextValue;
            });

            return `${acc} ${nextValue}`.trim();
          }, '');

          const translatedName = name[language]
            ? name[language]
            : name[DEFAULT_LANGUAGE];

          return {
            ...acc,
            name: {
              ...acc.name,
              [language]: `${translatedName} ${variantsValue}`,
            },
          };
        },
        { name },
      );

      return generatedProduct.name;
    },
    [],
  );

  const generateProduct = useCallback(
    (values: WarehouseProductsGeneratorFormValues): GeneratedProduct => {
      let attributes: null | GeneratedAttribute[] = null;
      const { name, unit, attributesVirtual } = values;
      let productName: Translations = name;

      if (attributesVirtual) {
        attributes = Object.keys(attributesVirtual).map((attributeVirtual) => {
          return {
            attributeId: attributeVirtual,
            variants: attributesVirtual[attributeVirtual],
          };
        });

        productName = generateSingleNameWithVariants(name, attributes);
      }

      return {
        name: productName,
        unit,
        attributes,
      };
    },
    [generateSingleNameWithVariants],
  );

  const handleFormSubmit = useCallback(
    async (
      values: WarehouseProductsGeneratorFormValues,
      event?: BaseSyntheticEvent,
    ): Promise<void> => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const submitButtonName = event?.nativeEvent.submitter?.name;

      if (submitButtonName === buttonNames.manyProducts) {
        const generatedProducts = generateProducts(values);

        return onSuccess(generatedProducts);
      }

      if (submitButtonName === buttonNames.oneProduct) {
        const generatedProduct = generateProduct(values);

        return onSuccess([generatedProduct]);
      }
    },
    [generateProduct, generateProducts, onSuccess],
  );

  return {
    handleFormSubmit,
  };
};
