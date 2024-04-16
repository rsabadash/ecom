import { useTranslation } from '../../../../components/IntlProvider';
import { SectionForeground } from '../../../../layouts/Section';
import { Top, TopHeading } from '../../../../layouts/Top';
import { AttributeAddForm } from './AttributeAddForm';

const AttributeAdd = () => {
  const { translate } = useTranslation();

  return (
    <>
      <Top>
        <TopHeading>{translate('attribute.add')}</TopHeading>
      </Top>
      <SectionForeground>
        <AttributeAddForm />
      </SectionForeground>
    </>
  );
};

export default AttributeAdd;
