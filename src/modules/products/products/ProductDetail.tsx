import { Suspense, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Top, TopButtons } from '../../../layouts/Top';
import { useCachedAPI } from '../../../hooks';
import { mapCategoryToComponent } from './utils';
import { Product } from './types';
import { Button, ButtonLink } from '../../../components/Button';
import { useTranslation } from '../../../components/IntlProvider';
import { ForegroundSection } from '../../../components/Foreground';
import { endpoint } from '../../../common/constants/api';
import { routes } from '../../../common/constants/routes';

const ProductDetail = () => {
  const [isReadOnly, setReadOnly] = useState<boolean>(true);
  const { productId } = useParams<{ productId: string }>();
  const { language, translate } = useTranslation();

  const { data } = useCachedAPI<Product>(`${endpoint.products}/${productId}`);

  const handleButtonClick = (): void => {
    setReadOnly((isReadOnly) => !isReadOnly);
  };

  return (
    <>
      <Top headingText={data?.title[language]}>
        <TopButtons>
          {isReadOnly && (
            <ButtonLink variant="primary" to={routes.productsAdd}>
              {translate('products.add')}
            </ButtonLink>
          )}
          <Button variant="primary" onClick={handleButtonClick}>
            {!isReadOnly ? translate('cancel') : translate('edit')}
          </Button>
        </TopButtons>
      </Top>

      <ForegroundSection>
        {data && (
          <Suspense>
            {
              mapCategoryToComponent({ formData: data, isReadOnly })[
                data.category
              ]
            }
          </Suspense>
        )}
      </ForegroundSection>
    </>
  );
};

export default ProductDetail;
