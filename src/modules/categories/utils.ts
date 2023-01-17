import { CategoryDetailEntity, CategoryFormValues } from './types';
import { Language } from '../../components/IntlProvider';

export const matchCategoryDataToFormValues = (
  data: CategoryDetailEntity | undefined,
  language: Language,
): CategoryFormValues | undefined => {
  if (!data) {
    return undefined;
  }

  const { parents, name, isActive } = data;

  return {
    name,
    isActive,
    parentIds: parents.map((parent) => ({
      id: parent._id,
      value: parent.name[language] || '',
    })),
  };
};
