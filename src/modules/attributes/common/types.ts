import { Translations } from '../../../components/IntlProvider';

export type Attribute = {
  _id: string;
  name: Translations;
  isActive: boolean;
  sortOrder: number;
  variants: AttributeVariant[];
};

export type AttributeVariant = Omit<Attribute, '_id' | 'variants'> & {
  variantId: string;
  attributeId: string;
};

export type AttributeFormValues = {
  name: Translations;
  isActive: boolean;
  sortOrder: number;
};

export type AttributeFormProps = {
  id?: string;
  isReadOnly?: boolean;
  defaultValues?: Partial<AttributeFormValues>;
};

export type AttributesFormFields = Record<
  keyof AttributeFormValues,
  keyof AttributeFormValues
>;

export type AttributePostData = {
  name: Translations;
  isActive: boolean;
  sortOrder: number;
};

export type AttributePatchData = AttributePostData & { id: string };

export type AttributePostResponse = AttributePostData & { _id: string };

export type AttributeDeleteData = {
  id: string;
};
