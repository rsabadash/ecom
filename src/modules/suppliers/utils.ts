import { SupplierDetailEntry, SupplierFormValues } from './types';

export const matchSupplierDataToFormValues = (
  data: SupplierDetailEntry | undefined,
): SupplierFormValues | undefined => {
  if (!data) {
    return undefined;
  }

  const { name, note, phoneNumber, accountId } = data;

  return {
    name,
    note,
    phoneNumber,
    accountId,
  };
};
