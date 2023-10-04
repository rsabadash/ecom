import { SupplyDetailProduct } from '../detail/types';

export type Supply = {
  _id: string;
  createdAt: string;
  name: null | string;
  products: SupplyDetailProduct[];
  productsTotalCost: string;
  supplierId: string;
  warehouseId: string;
};

export type SupplyPostProductData = Pick<
  SupplyDetailProduct,
  'productId' | 'price' | 'quantity' | 'totalCost'
>;

export type SupplyPostData = Pick<
  Supply,
  'name' | 'productsTotalCost' | 'supplierId' | 'warehouseId'
> & {
  products: SupplyPostProductData[];
};

export type SupplyPostResponse = Supply;

export type SupplyStateFromRouter = Supply | null;
