import { Suspense, useState } from 'react';

import { ErrorBoundary } from '../../../components/ErrorBoundary';
import { useTranslation } from '../../../components/IntlProvider';
import { SectionForeground } from '../../../layouts/Section';
import { Top, TopHeading } from '../../../layouts/Top';
import { ProductsGeneratorForm } from './ProductsGeneratorForm';
import { ProductsGeneratorProductsForm } from './ProductsGeneratorProductsForm';
import { GeneratedProduct } from './types';

const ProductsGenerator = () => {
  const [generatedProducts, setGeneratedProducts] = useState<
    undefined | GeneratedProduct[]
  >();

  const { translate } = useTranslation();

  return (
    <>
      <Top>
        <TopHeading>{translate('products.generation')}</TopHeading>
      </Top>
      <ErrorBoundary fallback="Error boundary Products generator">
        <Suspense fallback="Suspense Products generator">
          <SectionForeground>
            <ProductsGeneratorForm
              onGeneratedProductsCallback={setGeneratedProducts}
            />
          </SectionForeground>
          {generatedProducts && (
            <SectionForeground>
              <ProductsGeneratorProductsForm
                generatedProducts={generatedProducts}
              />
            </SectionForeground>
          )}
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default ProductsGenerator;
