import { useParams } from 'react-router-dom';

import { useTranslation } from '../../../../components/IntlProvider';
import { SectionForeground } from '../../../../layouts/Section';
import { Top, TopHeading } from '../../../../layouts/Top';
import { VariantAddUrlParams } from './types';
import { VariantAddForm } from './VariantAddForm';

const VariantAdd = () => {
  const { translate } = useTranslation();

  const { attributeId } = useParams<VariantAddUrlParams>();

  return (
    <>
      <Top>
        <TopHeading>{translate('variant.add')}</TopHeading>
      </Top>
      <SectionForeground>
        <VariantAddForm attributeId={attributeId} />
      </SectionForeground>
    </>
  );
};

export default VariantAdd;
