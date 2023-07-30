import { routes } from '../../../common/constants/routes';
import { Heading } from '../../../components/Heading';
import { useTranslation } from '../../../components/IntlProvider';
import { EmptyList } from '../../../layouts/EmptyPage';

export const VariantsListPlaceholder = () => {
  const { translate } = useTranslation();

  return (
    <EmptyList link={routes.attributes.root}>
      <Heading level={2} fontSize={2}>
        {translate('attribute.variant.emptyList')}
      </Heading>
      <Heading level={4} fontSize={4}>
        {translate('attribute.variant.emptyList.callToAction')}
      </Heading>
    </EmptyList>
  );
};
