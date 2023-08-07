import { FC } from 'react';

import { Heading } from '../../../../components/Heading';
import { useTranslation } from '../../../../components/IntlProvider';
import { EmptyList } from '../../../../layouts/EmptyPage';
import { AttributeVariantsListPlaceholderProps } from '../add/types';

export const AttributeVariantsListPlaceholder: FC<
  AttributeVariantsListPlaceholderProps
> = ({ addVariantLink }) => {
  const { translate } = useTranslation();

  return (
    <EmptyList link={addVariantLink}>
      <Heading level={2} fontSize={2}>
        {translate('attribute.variant.emptyList')}
      </Heading>
      <Heading level={4} fontSize={4}>
        {translate('attribute.variant.emptyList.callToAction.attributeDetail')}
      </Heading>
    </EmptyList>
  );
};
