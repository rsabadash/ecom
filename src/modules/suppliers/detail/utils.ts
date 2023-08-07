import { SupplierDetailEntry, SupplierFormValues } from '../add/types';

export const matchSupplierDataToFormValues = (
  data: SupplierDetailEntry | undefined,
): SupplierFormValues | undefined => {
  if (!data) {
    return undefined;
  }

  const { name, address, phoneNumber } = data;

  return {
    name,
    address,
    phoneNumber,
  };
};
