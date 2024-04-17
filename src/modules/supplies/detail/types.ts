import { TableColumnGeneric } from '../../../components/Table';

export type SupplyDetailProduct = {
  attributeIds: string[];
  price: string;
  productId: string;
  productName: string;
  quantity: string;
  totalCost: string;
  variantIds: string[];
};

export type SupplyDetailListProps = {
  products: SupplyDetailProduct[];
  productsTotalCost: string | undefined;
};

export type SupplyDetailListSummaryProps = Pick<
  SupplyDetailListProps,
  'productsTotalCost'
> & {
  columns: TableColumnGeneric<SupplyDetailProduct>[];
};

export type SummaryRow = Record<
  string,
  {
    value: string | undefined;
    valueGetter?: (value: string) => string;
  }
>;

export type SupplyUrlParams = {
  supplyId: string;
};
