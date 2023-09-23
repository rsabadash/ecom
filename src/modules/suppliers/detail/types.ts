import { Supplier, SupplierFormProps } from '../common/types';

export type SupplierEditFormProps = Pick<SupplierFormProps, 'defaultValues'> & {
  id?: string;
  isReadOnly: boolean;
  onFormUpdated: () => void;
};

export type SupplierUrlParams = {
  supplierId: string;
};

export type SupplierPatchData = Omit<Supplier, '_id'> & {
  id: string;
};

export type SupplierDeleteData = {
  id: string;
};
