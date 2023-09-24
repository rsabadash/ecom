import { Supplier, SupplierFormDefaultValues } from '../common/types';

export type SupplierEditFormProps = {
  id?: string;
  isReadOnly: boolean;
  defaultValues?: SupplierFormDefaultValues | undefined;
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
