import { Translations } from '../../../../components/IntlProvider';
import { Variant } from '../../variants/common/types';

export type Attribute = {
  _id: string;
  name: Translations;
  seoName: string;
  isActive: boolean;
  sortOrder: number;
  variants: Variant[];
};

export type AttributeFormValues = {
  name: Translations;
  seoName: string;
  isActive: boolean;
  sortOrder: number;
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
