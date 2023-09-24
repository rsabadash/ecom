import { Control, SetFieldValue, UseFormGetValues } from 'react-hook-form';

import { Unit } from '../../../common/types/unit';
import { Translations } from '../../../components/IntlProvider';
import { Attribute } from '../../attributes/attributes/common/types';
import { WarehouseProductsAttribute } from '../list/types';

export type WarehouseProduct = {
  _id: string;
  name: Translations;
  sku: string;
  unit: Unit;
  attributes: WarehouseProductsAttribute[];
  createdDate: Date;
};

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
  unit: Unit;
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
  unit: Unit;
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

export type WarehouseProductsPostData = GeneratedProductFieldValue[];

export type WarehouseProductsPostResponse = WarehouseProduct[];

export type WarehouseProductUnitFieldProps = {
  name: string;
  control: Control<any>;
};
