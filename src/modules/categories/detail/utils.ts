import { DEFAULT_LANGUAGE, Language } from '../../../components/IntlProvider';
import { Category, CategoryFormValues } from '../add/types';

export const matchCategoryDataToFormValues = (
  data: Category | undefined,
  language: Language,
): CategoryFormValues | undefined => {
  if (!data) {
    return undefined;
  }

  const { parentIds, name, isActive, seoName } = data;

  return {
    name,
    seoName,
    isActive,
    parentIds: parentIds.map((parentId) => ({
      id: parentId,
      value: name[language] || name[DEFAULT_LANGUAGE],
    })),
  };
};
