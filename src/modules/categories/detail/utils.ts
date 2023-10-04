import { DEFAULT_LANGUAGE, Language } from '../../../components/IntlProvider';
import { CategoryFormValues } from '../common/types';
import { CategoryDetailData } from './types';

export const matchCategoryDataToFormValues = (
  data: CategoryDetailData | undefined,
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
      value: parent.name[language] || name[DEFAULT_LANGUAGE],
    })),
  };
};
