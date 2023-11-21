import { MouseEvent } from 'react';

import { DropdownItemObject } from '../../../components/Fields/Dropdown';
import { DEFAULT_LANGUAGE, Language } from '../../../components/IntlProvider';
import { Category, CategoryFormValues } from '../common/types';
import { CategoryDetailData } from './types';

const getDirectParent = (
  parents: Category[],
  language: Language,
): DropdownItemObject | null => {
  // direct parent id always the last in hierarchy (index 0 - highest parent, last index - lowest (direct) parent)
  const directParent = parents.length > 0 ? parents[parents.length - 1] : null;

  return (
    directParent && {
      id: directParent._id,
      value: directParent.name[language] || directParent.name[DEFAULT_LANGUAGE],
    }
  );
};

export const mapCategoryDataToFormValues = (
  data: CategoryDetailData | undefined,
  language: Language,
): CategoryFormValues | undefined => {
  if (!data) {
    return undefined;
  }

  const { parents, name, isActive, seoName } = data;

  const parentValue = getDirectParent(parents, language);

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
