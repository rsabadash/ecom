import { routes } from '../../../common/constants/routes';
import { Heading } from '../../../components/Heading';
import { useTranslation } from '../../../components/IntlProvider';
import { EmptyList } from '../../../layouts/EmptyPage';

export const ProductsListPlaceholder = () => {
  const { translate } = useTranslation();

  return (
    <EmptyList link={routes.products.generate}>
      <Heading level={2} fontSize={2}>
        {translate('product.emptyList')}
      </Heading>
      <Heading level={4} fontSize={4}>
        {translate('product.emptyList.callToAction')}
      </Heading>
    </EmptyList>
  );
};
