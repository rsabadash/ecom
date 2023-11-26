import { DropdownItemObject } from '../../../components/Fields/Dropdown';

export const getCategoryId = (
  data: DropdownItemObject | null,
): string | null => {
  return data && 'id' in data ? data?.id : data;
};
