import { Variant } from '../../variants/common/types';

export type Attribute = {
  _id: string;
  name: string;
  seoName: string;
  isActive: boolean;
  variants: Variant[];
};

export type AttributeFormValues = {
  name: string;
  seoName: string;
  isActive: boolean;
};

export type AttributesFormFields = Record<
  keyof AttributeFormValues,
  keyof AttributeFormValues
>;

export type AttributeFormDefaultValues = Partial<AttributeFormValues>;

export type AttributeFormSubmitAction = (
  values: AttributeFormValues,
) => Promise<void>;

export type AttributeFormProps = {
  submitText: string;
  isReadOnly?: boolean;
  defaultValues?: AttributeFormDefaultValues;
  handleFormReset: () => void;
  handleFormSubmit: AttributeFormSubmitAction;
};

export type AttributeStateFromRouter = Attribute | null;

export type AttributePostData = Omit<Attribute, '_id' | 'variants'>;

export type AttributePostResponse = Attribute;

export type AttributePatchData = Omit<Attribute, '_id' | 'variants'> & {
  id: string;
};

export type AttributeDeleteData = {
  id: string;
};
