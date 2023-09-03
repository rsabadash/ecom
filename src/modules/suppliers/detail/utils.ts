import { Supplier, SupplierFormValues } from '../add/types';

export const matchSupplierDataToFormValues = (
  data: Supplier | undefined,
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
