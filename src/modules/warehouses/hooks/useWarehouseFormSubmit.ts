import { useCallback } from 'react';
import { WarehouseFormValues } from '../types';

type UseWarehouseFormSubmitReturn = {
  handleFormSubmit: (values: WarehouseFormValues) => Promise<void>;
};

export const useWarehouseFormSubmit = (): UseWarehouseFormSubmitReturn => {
  const handleFormSubmit = useCallback(async (values: WarehouseFormValues) => {
    console.log(values);
  }, []);

  return {
    handleFormSubmit,
  };
};
