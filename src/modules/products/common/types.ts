import { Unit } from '../../../common/types/unit';
import { GeneratedProductFieldValue } from '../generator/types';
import { ProductsAttribute } from '../list/types';

export type Product = {
  _id: string;
  name: string;
  sku: string;
  unit: Unit;
  attributes: ProductsAttribute[];
  createdAt: Date;
};

export type ProductsPostData = GeneratedProductFieldValue[];

export type ProductsPostResponse = Product[];
