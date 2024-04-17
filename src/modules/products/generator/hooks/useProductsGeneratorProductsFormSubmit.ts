import { useCallback } from 'react';

import { ProductsGeneratorProductsFormValues } from '../types';
import { useCreateProducts } from './useCreateProducts';

type UseProductsGeneratorProductsFormSubmitReturn = {
  handleFormSubmit: (
    values: ProductsGeneratorProductsFormValues,
  ) => Promise<void>;
};

export const useProductsGeneratorProductsFormSubmit =
  (): UseProductsGeneratorProductsFormSubmitReturn => {
    const { createProducts } = useCreateProducts();

    const handleFormSubmit = useCallback(
      async (values: ProductsGeneratorProductsFormValues): Promise<void> => {
        await createProducts(values.products);
      },
      [createProducts],
    );

    return {
      handleFormSubmit,
    };
  };
