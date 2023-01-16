import { Top } from '../../layouts/Top';
import { useTranslation } from '../../components/IntlProvider';
import { ButtonLink } from '../../components/Button';
import { routes } from '../../common/constants/routes';
import { CategoryForm } from './CategoryForm';
import { ForegroundSection } from '../../components/Foreground';

export const CategoryAdd = () => {
  const { translate } = useTranslation();

  return (
    <>
      <Top headingText={translate('category.add')}>
        <ButtonLink variant="primary" to={routes.categories}>
          {translate('cancel')}
        </ButtonLink>
      </Top>
      <ForegroundSection>
        <CategoryForm />
      </ForegroundSection>
    </>
  );
};

export default CategoryAdd;
