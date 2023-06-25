import { Translations } from '../../../components/IntlProvider';

export type Supply = {
  _id: string;
  createdAt: string;
  name: string | null;
  products: SupplyProduct[];
  productsTotalCost: string;
  productsTotalQuantity: string;
  supplierId: string;
  warehouseId: string;
};

export type SupplyProduct = {
  attributeId: string[];
  price: string;
  productId: string;
  productName: Translations;
  quantity: string;
  totalCost: string;
  variantIds: string[];
};
