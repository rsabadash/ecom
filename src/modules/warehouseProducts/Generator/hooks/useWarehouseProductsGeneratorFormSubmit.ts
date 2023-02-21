import { useCallback } from 'react';
import {
  AttributeVirtualFieldValue,
  DataToGenerateProducts,
  GeneratedProduct,
  WarehouseProductsGeneratorFormValues,
  VariantVirtualFieldValue,
} from '../types';
import { transformProductBasedOnVariants } from '../utils';
import { cartesian } from '../../../../utils/cartesian';

type UseWarehouseProductsGeneratorFormSubmitProps = {
  onSuccess: (products: GeneratedProduct[]) => void;
};

type UseWarehouseProductsGeneratorFormSubmit = (
  props: UseWarehouseProductsGeneratorFormSubmitProps,
) => {
  handleFormSubmit: (
    values: WarehouseProductsGeneratorFormValues,
  ) => Promise<void>;
};

export const useWarehouseProductsGeneratorFormSubmit: UseWarehouseProductsGeneratorFormSubmit =
  ({ onSuccess }) => {
    const getListToProductGeneration = useCallback(
      (
        attributes: AttributeVirtualFieldValue,
      ): VariantVirtualFieldValue[][] => {
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

        return [{ name: values.name, attribute: null }];
      },
      [getListToProductGeneration],
    );

    const handleFormSubmit = useCallback(
      async (values: WarehouseProductsGeneratorFormValues): Promise<void> => {
        const generatedProducts = generateProducts(values);

        onSuccess(generatedProducts);
      },
      [generateProducts, onSuccess],
    );

    return {
      handleFormSubmit,
    };
  };
