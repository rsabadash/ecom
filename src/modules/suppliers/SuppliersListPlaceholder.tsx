import { routes } from '../../common/constants/routes';
import { Heading } from '../../components/Heading';
import { useTranslation } from '../../components/IntlProvider';
import { EmptyList } from '../../layouts/EmptyPage';

export const SuppliersListPlaceholder = () => {
  const { translate } = useTranslation();

  return (
    <EmptyList link={routes.suppliers.add}>
      <Heading level={2} fontSize={2}>
        {translate('supplier.emptyList')}
      </Heading>
      <Heading level={4} fontSize={4}>
        {translate('supplier.emptyList.callToAction')}
      </Heading>
    </EmptyList>
  );
};
