import { SupplierFormDefaultValues } from '../common/types';

export type SupplierEditFormProps = {
  id: string | undefined;
  isReadOnly: boolean;
  defaultValues?: SupplierFormDefaultValues | undefined;
  onFormUpdated: () => void;
};

export type SupplierUrlParams = {
  supplierId: string;
};
