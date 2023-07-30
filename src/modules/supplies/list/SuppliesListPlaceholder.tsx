import { Heading } from '../../../components/Heading';
import { routes } from '../../../common/constants/routes';
import { useTranslation } from '../../../components/IntlProvider';
import { EmptyList } from '../../../layouts/EmptyPage';

export const SuppliesListPlaceholder = () => {
  const { translate } = useTranslation();

  return (
    <EmptyList link={routes.supplies.add}>
      <Heading level={2} fontSize={2}>
        {translate('supply.emptyList')}
      </Heading>
      <Heading level={4} fontSize={4}>
        {translate('supply.emptyList.callToAction')}
      </Heading>
    </EmptyList>
  );
};
