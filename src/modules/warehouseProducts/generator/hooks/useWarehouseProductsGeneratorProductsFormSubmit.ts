import { useCallback } from 'react';
import { WarehouseProductsGeneratorProductsFormValues } from '../types';

type UseWarehouseProductsGeneratorProductsFormSubmit = () => {
  handleFormSubmit: (
    values: WarehouseProductsGeneratorProductsFormValues,
  ) => Promise<void>;
};

export const useWarehouseProductsGeneratorProductsFormSubmit: UseWarehouseProductsGeneratorProductsFormSubmit =
  () => {
    const handleFormSubmit = useCallback(
      async (
        values: WarehouseProductsGeneratorProductsFormValues,
      ): Promise<void> => {
        console.log(values);
      },
      [],
    );

    return {
      handleFormSubmit,
    };
  };
