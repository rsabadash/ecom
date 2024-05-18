import { BaseSyntheticEvent, useCallback } from 'react';

import { cartesian } from '../../../../common/utils';
import { buttonNames } from '../constants';
import {
  AttributeVirtualFieldValue,
  DataToGenerateProducts,
  GeneratedAttribute,
  GeneratedProduct,
  InitialDataToGenerateProducts,
  ProductsGeneratorFormValues,
  VariantVirtualFieldValue,
} from '../types';
import { transformProductBasedOnVariants } from '../utils';

type UseProductsGeneratorFormSubmitProps = {
  onGeneratedProducts: (products: GeneratedProduct[]) => void;
};

type UseProductsGeneratorFormSubmitReturn = {
  handleFormSubmit: (
    values: ProductsGeneratorFormValues,
    event?: BaseSyntheticEvent,
  ) => Promise<void>;
};

export const useProductsGeneratorFormSubmit = ({
  onGeneratedProducts,
}: UseProductsGeneratorFormSubmitProps): UseProductsGeneratorFormSubmitReturn => {
  const getListToProductGeneration = useCallback(
    (attributes: AttributeVirtualFieldValue): VariantVirtualFieldValue[][] => {
      const sortedIds = Object.keys(attributes).sort();

      return sortedIds.map((id) => attributes[id]);
    },
    [],
  );

  const generateProducts = useCallback(
    (values: ProductsGeneratorFormValues): GeneratedProduct[] => {
      const initialProductValues: InitialDataToGenerateProducts = {
        unit: values.unit,
        sku: '',
      };

      if (values.attributesVirtual) {
        const listToProductGeneration = getListToProductGeneration(
          values.attributesVirtual,
        );

        return cartesian<
          InitialDataToGenerateProducts,
          DataToGenerateProducts,
          GeneratedProduct
        >(
          transformProductBasedOnVariants,
          initialProductValues,
          [{ name: values.name }],
          ...listToProductGeneration,
        );
      }

      return [{ name: values.name, attributes: null, ...initialProductValues }];
    },
    [getListToProductGeneration],
  );

  const generateSingleNameWithVariants = useCallback(
    (name: string, attributes: GeneratedAttribute[]): string => {
      const variantsValue = attributes.reduce((acc, attribute) => {
        let nextValue = '';

        attribute.variants.forEach((variant) => {
          nextValue = variant.name
            ? `${nextValue} ${variant.name} `
            : nextValue;
        });

        return `${acc} ${nextValue}`.trim();
      }, '');

      return `${name} ${variantsValue}`;
    },
    [],
  );

  const generateProduct = useCallback(
    (values: ProductsGeneratorFormValues): GeneratedProduct => {
      let attributes: null | GeneratedAttribute[] = null;
      const { name, unit, attributesVirtual } = values;
      let productName: string = name;

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
        sku: '',
      };
    },
    [generateSingleNameWithVariants],
  );

  const handleFormSubmit = useCallback(
    async (
      values: ProductsGeneratorFormValues,
      event?: BaseSyntheticEvent,
    ): Promise<void> => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const submitButtonName = event?.nativeEvent.submitter?.name;

      if (submitButtonName === buttonNames.manyProducts) {
        const generatedProducts = generateProducts(values);

        return onGeneratedProducts(generatedProducts);
      }

      if (submitButtonName === buttonNames.oneProduct) {
        const generatedProduct = generateProduct(values);

        return onGeneratedProducts([generatedProduct]);
      }
    },
    [generateProduct, generateProducts, onGeneratedProducts],
  );

  return {
    handleFormSubmit,
  };
};
