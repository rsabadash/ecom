import { Translations } from '../../../../components/IntlProvider';
import { Variant } from '../../variants/add/types';
import { SupplierFormValues } from '../../../suppliers/common/types';

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
