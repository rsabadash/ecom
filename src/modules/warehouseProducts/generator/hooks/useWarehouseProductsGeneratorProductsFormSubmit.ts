import { useCallback } from 'react';

import { WarehouseProductsGeneratorProductsFormValues } from '../types';
import { useCreateWarehouseProducts } from './useCreateWarehouseProducts';

type UseWarehouseProductsGeneratorProductsFormSubmitReturn = {
  handleFormSubmit: (
    values: WarehouseProductsGeneratorProductsFormValues,
  ) => Promise<void>;
};

export const useWarehouseProductsGeneratorProductsFormSubmit =
  (): UseWarehouseProductsGeneratorProductsFormSubmitReturn => {
    const { createWarehouseProducts } = useCreateWarehouseProducts();

    const handleFormSubmit = useCallback(
      async (
        values: WarehouseProductsGeneratorProductsFormValues,
      ): Promise<void> => {
        await createWarehouseProducts(values.products);
      },
      [createWarehouseProducts],
    );

    return {
      handleFormSubmit,
    };
  };
