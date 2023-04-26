import { SupplyFormFields, SupplyFormSubFields, SupplyProduct } from './types';
import { parseToDecimal } from './utils';

export const supplyFormArrayFields = {
  products: 'products',
} as const;

export const supplyFormFields: SupplyFormFields = {
  name: 'name',
  supplier: 'supplier',
  warehouse: 'warehouse',
  products: supplyFormArrayFields.products,
  productsTotalCost: 'productsTotalCost',
  productsTotalQuantity: 'productsTotalQuantity',
} as const;

export const supplyFormProductsSubfields: SupplyFormSubFields = {
  name: 'name',
  quantity: 'quantity',
  price: 'price',
  totalCost: 'totalCost',
} as const;

export const defaultProductValue: SupplyProduct = {
  name: null,
  quantity: null,
  price: null,
  totalCost: null,
};

export const initialDefaultValues = {
  products: [defaultProductValue],
  productsTotalQuantity: 0,
  productsTotalCost: parseToDecimal('0'),
};
