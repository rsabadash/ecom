import { Language } from '../../components/IntlProvider';
import { CategoryDetailEntity, CategoryFormValues } from './types';

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
