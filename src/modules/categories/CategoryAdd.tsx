import { Top, TopButtons, TopHeading } from '../../layouts/Top';
import { useTranslation } from '../../components/IntlProvider';
import { ButtonLink } from '../../components/Button';
import { routes } from '../../common/constants/routes';
import { CategoryForm } from './CategoryForm';
import { Foreground } from '../../layouts/Foreground';

const CategoryAdd = () => {
  const { translate } = useTranslation();

  return (
    <>
      <Top>
        <TopHeading>{translate('add')}</TopHeading>
        <TopButtons>
          <ButtonLink variant="primary" to={routes.categories.root}>
            {translate('cancel')}
          </ButtonLink>
        </TopButtons>
      </Top>
      <Foreground>
        <CategoryForm />
      </Foreground>
    </>
  );
};

export default CategoryAdd;
