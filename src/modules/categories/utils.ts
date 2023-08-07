import { DEFAULT_LANGUAGE, Language } from '../../components/IntlProvider';
import { CategoryDetailEntity, CategoryFormValues } from './types';

export const matchCategoryDataToFormValues = (
  data: CategoryDetailEntity | undefined,
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
