import { useTranslation } from '../../../components/IntlProvider';
import { SectionForeground } from '../../../layouts/Section';
import { Top, TopHeading } from '../../../layouts/Top';
import { CategoryAddForm } from './CategoryAddForm';

const CategoryAdd = () => {
  const { translate } = useTranslation();

  return (
    <>
      <Top>
        <TopHeading>{translate('category.add')}</TopHeading>
      </Top>
      <SectionForeground>
        <CategoryAddForm />
      </SectionForeground>
    </>
  );
};

export default CategoryAdd;
