import { useCallback } from 'react';
import { WarehouseProductsGeneratorProductsFormValues } from '../types';

type UseWarehouseProductsGeneratorProductsFormSubmitReturn = {
  handleFormSubmit: (
    values: WarehouseProductsGeneratorProductsFormValues,
  ) => Promise<void>;
};

export const useWarehouseProductsGeneratorProductsFormSubmit =
  (): UseWarehouseProductsGeneratorProductsFormSubmitReturn => {
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
