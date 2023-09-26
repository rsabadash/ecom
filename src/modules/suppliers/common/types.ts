import { CategoryFormSubmitAction } from '../../categories/common/types';

export type Supplier = {
  _id: string;
  name: string;
  address: string | null;
  phoneNumber: string | null;
};

export type SupplierFormValues = {
  name: string;
  address: string | null;
  phoneNumber: string | null;
};

export type SupplierFormFields = Record<
  keyof SupplierFormValues,
  keyof SupplierFormValues
>;

export type SupplierFormDefaultValues = Partial<SupplierFormValues>;

export type SupplierFormSubmitAction = (
  values: SupplierFormValues,
) => Promise<void>;

export type SupplierFormProps = {
  submitText: string;
  isReadOnly?: boolean;
  defaultValues?: SupplierFormDefaultValues;
  handleFormSubmit: SupplierFormSubmitAction;
};

export type SupplierStateFromRouter = Supplier | null;

export type SupplierPostData = Omit<Supplier, '_id'>;

export type SupplierPostResponse = Supplier;

export type SupplierPatchData = Omit<Supplier, '_id'> & {
  id: string;
};

export type SupplierDeleteData = {
  id: string;
};
