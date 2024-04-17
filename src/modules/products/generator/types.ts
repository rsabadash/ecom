import { Control, SetFieldValue, UseFormGetValues } from 'react-hook-form';

import { Unit } from '../../../common/types/unit';
import { Translations } from '../../../components/IntlProvider';
import { Attribute } from '../../attributes/attributes/common/types';

export type ProductsGeneratorFormProps = {
  onGeneratedProductsCallback: (products: GeneratedProduct[]) => void;
};

export type VariantVirtualFieldValue = {
  name: Translations;
  variantId: string;
  attributeId: string;
};

export type AttributeVirtualFieldValue = {
  [attributeId: string]: VariantVirtualFieldValue[];
};

type AttributeWithVariantsCheckbox = {
  [attributeId: string]: {
    variants: {
      [variantId: string]: boolean;
    };
  };
};

export type ProductsGeneratorFormValues = {
  name: string;
  unit: Unit;
  attributes: AttributeWithVariantsCheckbox;
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

type DataVariantToGenerateProducts = Pick<VariantVirtualFieldValue, 'name'> &
  Partial<Omit<VariantVirtualFieldValue, 'name'>>;

type DataNameToGenerateProducts = Pick<ProductsGeneratorFormValues, 'name'>;

export type DataToGenerateProducts =
  | DataVariantToGenerateProducts
  | DataNameToGenerateProducts;

export type GeneratedVariant = {
  variantId: string;
  name: Translations;
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
};

export type ProductsGeneratorProductsFormProps = {
  generatedProducts: GeneratedProduct[];
};

export type GeneratedProductFieldValue = GeneratedProduct & {
  sku?: string;
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
