import { DropdownItemObject } from '../../../components/Fields/Dropdown';

export const getCategoryIds = (
  categories: DropdownItemObject<string, string, undefined>[],
): string[] => {
  return categories.map((category) => {
    return category.id;
  });
};
