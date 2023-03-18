import { BaseSyntheticEvent, useCallback } from 'react';
import {
  AttributeVirtualFieldValue,
  DataToGenerateProducts,
  GeneratedProduct,
  WarehouseProductsGeneratorFormValues,
  VariantVirtualFieldValue,
  GeneratedAttribute,
} from '../types';
import { transformProductBasedOnVariants } from '../utils';
import { cartesian } from '../../../../utils/cartesian';
import { buttonNames } from '../constants';

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
          {},
          [{ name: values.name }],
          ...listToProductGeneration,
        );
      }

      return [{ name: values.name, attributes: null }];
    },
    [getListToProductGeneration],
  );

  const generateProduct = useCallback(
    (values: WarehouseProductsGeneratorFormValues): GeneratedProduct => {
      let attributes: null | GeneratedAttribute[] = null;
      const { name, attributesVirtual } = values;

      if (attributesVirtual) {
        attributes = Object.keys(attributesVirtual).map((attributeVirtual) => {
          return {
            attributeId: attributeVirtual,
            variants: attributesVirtual[attributeVirtual],
          };
        });
      }

      return {
        name,
        attributes,
      };
    },
    [],
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
