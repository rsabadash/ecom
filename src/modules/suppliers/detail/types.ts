import { SupplierFormDefaultValues } from '../common/types';

export type SupplierEditFormProps = {
  id: string | undefined;
  isReadOnly: boolean;
  defaultValues?: SupplierFormDefaultValues | undefined;
  onFormReset: () => void;
  onFormUpdated: () => void;
};

export type SupplierUrlParams = {
  supplierId: string;
};
