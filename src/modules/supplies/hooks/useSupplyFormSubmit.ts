import { useCallback } from 'react';
import {
  RequiredSupplyProduct,
  SupplyFormValues,
  SupplyPostData,
  SupplyPostProductData,
} from '../types';
import { useCreateSupply } from './useCreateSupply';

type UseSupplyFormSubmitReturn = {
  handleFormSubmit: (values: SupplyFormValues) => Promise<void>;
};

const mapValueToPostData = (value: SupplyFormValues): SupplyPostData => {
  const { products, supplier, warehouse, ...restValue } = value;

  const preparedProducts = products.map<SupplyPostProductData>((product) => {
    // That hack is added as we have required validation for each field, so they can not be empty
    // In type we added null as we want to initialize the default first item with empty values
    const requiredProduct = product as RequiredSupplyProduct;
    const { name, ...restProductValue } = requiredProduct;

    return {
      ...restProductValue,
      nameId: name.id,
    };
  });

  return {
    ...restValue,
    products: preparedProducts,
    supplierId: supplier.id,
    warehouseId: warehouse.id,
  };
};

export const useSupplyFormSubmit = (): UseSupplyFormSubmitReturn => {
  const { createSupply } = useCreateSupply();

  const handleFormSubmit = useCallback(
    async (values: SupplyFormValues) => {
      const createSupplyData = mapValueToPostData(values);
      await createSupply(createSupplyData);
    },
    [createSupply],
  );

  return { handleFormSubmit };
};
