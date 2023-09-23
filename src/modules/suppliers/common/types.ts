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

export type SupplierFormSubmitAction = (
  values: SupplierFormValues,
) => Promise<void>;

export type SupplierFormProps = {
  id?: string;
  submitText: string;
  isReadOnly?: boolean;
  defaultValues?: Partial<SupplierFormValues>;
  handleFormSubmit: SupplierFormSubmitAction;
};