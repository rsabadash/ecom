import { routes } from '../../../common/constants/routes';
import { ButtonLink } from '../../../components/Button';
import { useTranslation } from '../../../components/IntlProvider';
import { SectionForeground } from '../../../layouts/Section';
import { Top, TopButtons, TopHeading } from '../../../layouts/Top';
import { CategoryAddForm } from './CategoryAddForm';

const CategoryAdd = () => {
  const { translate } = useTranslation();

  return (
    <>
      <Top>
        <TopHeading>{translate('category.add')}</TopHeading>
        <TopButtons>
          <ButtonLink variant="primary" to={routes.categories.root}>
            {translate('cancel')}
          </ButtonLink>
        </TopButtons>
      </Top>
      <SectionForeground>
        <CategoryAddForm />
      </SectionForeground>
    </>
  );
};

export default CategoryAdd;
