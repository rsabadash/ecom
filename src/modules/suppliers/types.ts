export type Supplier = {
  _id: string;
  name: string;
  address: string;
  phoneNumber: string;
};

export type SupplierDetailEntry = {
  _id: string;
  name: string;
  address: string;
  phoneNumber: string;
};

export type SupplierFormValues = {
  name: string;
  address: string;
  phoneNumber: string;
};

export type SupplierFormFields = Record<
  keyof SupplierFormValues,
  keyof SupplierFormValues
>;

export type SupplierFormProps = {
  id?: string;
  isReadOnly?: boolean;
  defaultValues?: Partial<SupplierFormValues>;
};

export type SupplierPostData = {
  name: string;
  address: string;
  phoneNumber: string;
};

export type SupplierPostResponse = {
  name: string;
  address: string;
  phoneNumber: string;
};

export type SupplierPatchData = {
  id: string;
  name: string;
  address: string;
  phoneNumber: string;
};

export type SupplierDeleteData = {
  id: string;
};

export type SupplierUrlParams = {
  supplierId: string;
};
