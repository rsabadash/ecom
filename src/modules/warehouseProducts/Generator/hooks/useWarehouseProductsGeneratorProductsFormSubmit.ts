import { useCallback } from 'react';
import { WarehouseProductsGeneratorProductsFromValues } from '../types';

type UseWarehouseProductsGeneratorProductsFormSubmit = () => {
  handleFormSubmit: (
    values: WarehouseProductsGeneratorProductsFromValues,
  ) => Promise<void>;
};

export const useWarehouseProductsGeneratorProductsFormSubmit: UseWarehouseProductsGeneratorProductsFormSubmit =
  () => {
    const handleFormSubmit = useCallback(
      async (
        values: WarehouseProductsGeneratorProductsFromValues,
      ): Promise<void> => {
        console.log(values);
      },
      [],
    );

    return {
      handleFormSubmit,
    };
  };
