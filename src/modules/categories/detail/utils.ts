import { MouseEvent } from 'react';

import { DropdownItemObject } from '../../../components/Fields/Dropdown';
import { Category, CategoryFormValues } from '../common/types';
import { CategoryDetailData } from './types';

const getDirectParent = (parents: Category[]): DropdownItemObject | null => {
  // direct parent id always the last in hierarchy (index 0 - the highest parent, last index - lowest (direct) parent)
  const directParent = parents.length > 0 ? parents[parents.length - 1] : null;

  return (
    directParent && {
      id: directParent._id,
      value: directParent.name,
    }
  );
};

export const mapCategoryDataToFormValues = (
  data: CategoryDetailData | undefined,
): CategoryFormValues | undefined => {
  if (!data) {
    return undefined;
  }

  const { parents, name, isActive, seoName } = data;

  const parentValue = getDirectParent(parents);

  return {
    name,
    seoName,
    isActive,
    parent: parentValue,
  };
};

export const preventEvent = (event: MouseEvent<HTMLAnchorElement>) => {
  event.stopPropagation();
};
