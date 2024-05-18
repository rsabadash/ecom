import { Control, SetFieldValue, UseFormGetValues } from 'react-hook-form';

import { Unit } from '../../../common/types/unit';
import { Attribute } from '../../attributes/attributes/common/types';

export type ProductsGeneratorFormProps = {
  onGeneratedProductsCallback: (products: GeneratedProduct[]) => void;
};

export type VariantVirtualFieldValue = {
  name: string;
  variantId: string;
  attributeId: string;
};

export type AttributeVirtualFieldValue = {
  [attributeId: string]: VariantVirtualFieldValue[];
};

export type ProductsGeneratorAttributeVariant = {
  variants: {
    [variantId: string]: boolean;
  };
};

type ProductsGeneratorAttribute = {
  [attributeId: string]: ProductsGeneratorAttributeVariant;
};

export type ProductsGeneratorFormValues = {
  name: string;
  unit: Unit;
  attributes: ProductsGeneratorAttribute;
  attributesVirtual?: AttributeVirtualFieldValue;
};

export type ProductsGeneratorFormFields = Record<
  keyof ProductsGeneratorFormValues,
  keyof ProductsGeneratorFormValues
>;

export type ProductsGeneratorAttributeFormSectionProps = {
  attribute: Attribute;
  setValue: SetFieldValue<any>;
  getValues: UseFormGetValues<any>;
  control: Control<any>;
};

export type GeneratedVariant = {
  variantId: string;
  name: string;
};

export type GeneratedAttribute = {
  attributeId: string;
  variants: GeneratedVariant[];
};

export type GeneratedProduct = Pick<
  ProductsGeneratorFormValues,
  'name' | 'unit'
> & {
  attributes: null | GeneratedAttribute[];
  sku: '';
};

export type InitialDataToGenerateProducts = Pick<
  GeneratedProduct,
  'unit' | 'sku'
>;

export type DataToGenerateProducts = {
  name: string;
  variantId?: string;
  attributeId?: string;
};

export type ProductsGeneratorProductsFormProps = {
  generatedProducts: GeneratedProduct[];
};

export type GeneratedProductFieldValue = GeneratedProduct & {
  sku: string;
};

export type ProductsGeneratorProductsFormValues = {
  products: GeneratedProductFieldValue[];
};

export type ProductsGeneratorProductsFormFields = Record<
  keyof ProductsGeneratorProductsFormValues,
  keyof ProductsGeneratorProductsFormValues
>;

export type ProductUnitFieldProps = {
  name: string;
  control: Control<any>;
};
