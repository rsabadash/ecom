import { Unit } from '../../../common/types/unit';
import { Translations } from '../../../components/IntlProvider';
import { GeneratedProductFieldValue } from '../generator/types';
import { WarehouseProductsAttribute } from '../list/types';

export type WarehouseProduct = {
  _id: string;
  name: Translations;
  sku: string;
  unit: Unit;
  attributes: WarehouseProductsAttribute[];
  createdAt: Date;
};

export type WarehouseProductsPostData = GeneratedProductFieldValue[];

export type WarehouseProductsPostResponse = WarehouseProduct[];
