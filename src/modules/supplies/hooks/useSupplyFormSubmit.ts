import { useCallback } from 'react';
import { SupplyFormValues } from '../types';

type UseSupplyFormSubmitReturn = {
  handleFormSubmit: (values: SupplyFormValues) => Promise<void>;
};

export const useSupplyFormSubmit = (): UseSupplyFormSubmitReturn => {
  const handleFormSubmit = useCallback(async (values: SupplyFormValues) => {
    console.log(values);
  }, []);

  return { handleFormSubmit };
};
