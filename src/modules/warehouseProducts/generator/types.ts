import { Control, SetFieldValue, UseFormGetValues } from 'react-hook-form';
import { Translations } from '../../../components/IntlProvider';
import { Attribute } from '../../attributes/attributes/types';

export type WarehouseProductsGeneratorFormProps = {
  onSuccessSubmit: (products: GeneratedProduct[]) => void;
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

export type WarehouseProductsGeneratorFormValues = {
  name: Translations;
  attributes: AttributeWithVariantsCheckbox;
  attributesVirtual?: AttributeVirtualFieldValue;
};

export type WarehouseProductsGeneratorFormFields = Record<
  keyof WarehouseProductsGeneratorFormValues,
  keyof WarehouseProductsGeneratorFormValues
>;

export type WarehouseProductsGeneratorAttributeFormSectionProps = {
  attribute: Attribute;
  setValue: SetFieldValue<any>;
  getValues: UseFormGetValues<any>;
  control: Control<any>;
};

export type DataToGenerateProducts = Pick<VariantVirtualFieldValue, 'name'> &
  Partial<Omit<VariantVirtualFieldValue, 'name'>>;

export type GeneratedVariant = {
  variantId: string;
  name: Translations;
};

export type GeneratedAttribute = {
  attributeId: string;
  variants: GeneratedVariant[];
};

export type GeneratedProduct = {
  name: Translations;
  attributes: null | GeneratedAttribute[];
};

export type WarehouseProductsGeneratorProductsFormProps = {
  generatedProducts: GeneratedProduct[];
};

export type GeneratedProductFieldValue = GeneratedProduct & {
  sku?: string;
};

export type WarehouseProductsGeneratorProductsFormValues = {
  products: GeneratedProductFieldValue[];
};

export type WarehouseProductsGeneratorProductsFormFields = Record<
  keyof WarehouseProductsGeneratorProductsFormValues,
  keyof WarehouseProductsGeneratorProductsFormValues
>;

// export type WarehouseProductsPostData = GeneratedProductFieldValue[];
