import { CategoryDetailEntity, CategoryFormValues } from './types';
import { Language } from '../../components/IntlProvider';

export const matchCategoryDataToFormValues = (
  data: CategoryDetailEntity | undefined,
  language: Language,
): CategoryFormValues | undefined => {
  if (!data) {
    return undefined;
  }

  const { parents, name, isActive, seoName } = data;

  return {
    name,
    seoName,
    isActive,
    parentIds: parents.map((parent) => ({
      id: parent._id,
      value: parent.name[language] || '',
    })),
  };
};
