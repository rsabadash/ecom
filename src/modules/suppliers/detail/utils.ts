import { Supplier, SupplierFormValues } from '../common/types';

export const mapSupplierDataToFormValues = (
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
