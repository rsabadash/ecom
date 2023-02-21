import { Control, SetFieldValue, UseFormGetValues } from 'react-hook-form';
import { Translations } from '../../../components/IntlProvider';

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

export type Variant = {
  attributeId: string;
  isActive: boolean;
  name: Translations;
  sortOrder: number;
  variantId: string;
};

export type Attribute = {
  name: Translations;
  isActive: boolean;
  sortOrder: number;
  _id: string;
  variants: Variant[];
};

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
  attribute: null | GeneratedAttribute;
};

export type WarehouseProductsGeneratorProductsFormProps = {
  products: GeneratedProduct[];
};

export type GeneratedProductFieldValue = GeneratedProduct & {
  sku?: string;
};

export type WarehouseProductsGeneratorProductsFromValues = {
  product: GeneratedProductFieldValue[];
};
