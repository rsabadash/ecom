import { routes } from '../../../common/constants/routes';
import { Heading } from '../../../components/Heading';
import { useTranslation } from '../../../components/IntlProvider';
import { EmptyList } from '../../../layouts/EmptyPage';

export const CategoriesListPlaceholder = () => {
  const { translate } = useTranslation();

  return (
    <EmptyList link={routes.categories.add}>
      <Heading level={2} fontSize={2}>
        {translate('category.emptyList')}
      </Heading>
      <Heading level={4} fontSize={4}>
        {translate('category.emptyList.callToAction')}
      </Heading>
    </EmptyList>
  );
};
