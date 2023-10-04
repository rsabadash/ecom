import { useCallback } from 'react';

import { SupplyPostData, SupplyPostProductData } from '../../common/types';
import {
  ProductDuplicate,
  ProductDuplicateData,
  RequiredSupplyProduct,
  SupplyFormValues,
  SupplyProduct,
} from '../types';
import { useCreateSupply } from './useCreateSupply';

type UseSupplyFormSubmitProps = {
  onError: (data: ProductDuplicateData) => void;
};

type UseSupplyFormSubmitReturn = {
  handleFormSubmit: (values: SupplyFormValues) => Promise<void>;
};

const mapValueToPostData = (value: SupplyFormValues): SupplyPostData => {
  const { products, supplier, warehouse, productsTotalCost, name } = value;

  const preparedProducts = products.map<SupplyPostProductData>((product) => {
    // That hack is added as we have required validation for each field, so they can not be empty
    // In type we added null as we want to initialize the default first item with empty values
    const requiredProduct = product as RequiredSupplyProduct;
    const { name, price, totalCost, quantity } = requiredProduct;

    return {
      price,
      totalCost,
      quantity,
      productId: name.id,
    };
  });

  return {
    name,
    productsTotalCost,
    products: preparedProducts,
    supplierId: supplier.id,
    warehouseId: warehouse.id,
  };
};

const findDuplicates = (products: SupplyProduct[]): ProductDuplicateData => {
  const productsMap = new Map<string, ProductDuplicate>();
  const productDuplicatesMap = new Map<string, ProductDuplicate>();

  products.forEach((product, index) => {
    const { id } = product.name || {};

    if (id) {
      const positionInList = index + 1;

      if (productDuplicatesMap.has(id)) {
        const productInDuplicatesMap = productDuplicatesMap.get(id);

        if (productInDuplicatesMap) {
          productDuplicatesMap.set(id, {
            ...productInDuplicatesMap,
            positions: [...productInDuplicatesMap.positions, positionInList],
          });
        }

        return;
      }

      if (productsMap.has(id)) {
        const productInMap = productsMap.get(id);

        if (productInMap) {
          productDuplicatesMap.set(id, {
            ...productInMap,
            positions: [...productInMap.positions, positionInList],
          });
        }

        productsMap.delete(id);

        return;
      }

      productsMap.set(id, { product, positions: [positionInList] });
    }
  });

  return Object.fromEntries(productDuplicatesMap);
};

export const useSupplyFormSubmit = ({
  onError,
}: UseSupplyFormSubmitProps): UseSupplyFormSubmitReturn => {
  const { createSupply } = useCreateSupply();

  const handleFormSubmit = useCallback(
    async (values: SupplyFormValues): Promise<void> => {
      const duplicates = findDuplicates(values.products);

      if (Object.keys(duplicates).length > 0) {
        return onError(duplicates);
      }

      const createSupplyData = mapValueToPostData(values);
      await createSupply(createSupplyData);
    },
    [createSupply, onError],
  );

  return { handleFormSubmit };
};
