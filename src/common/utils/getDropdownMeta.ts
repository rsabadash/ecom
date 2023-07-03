import { DropdownItemObject } from '../../components/Fields/Dropdown';

export const getDropdownMeta = <M>({
  meta,
}: DropdownItemObject<string, string, M>): M | null => {
  return meta ? meta : null;
};
