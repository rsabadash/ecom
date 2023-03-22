import { Suspense, useState } from 'react';
import { ErrorBoundary } from '../../../components/ErrorBoundary';
import { SectionForeground } from '../../../layouts/Section';
import { Top, TopHeading } from '../../../layouts/Top';
import { WarehouseProductsGeneratorForm } from './WarehouseProductsGeneratorForm';
import { WarehouseProductsGeneratorProductsForm } from './WarehouseProductsGeneratorProductsForm';
import { GeneratedProduct } from './types';
import { useTranslation } from '../../../components/IntlProvider';

const WarehouseProductsGenerator = () => {
  const [generatedProducts, setGeneratedProducts] = useState<
    undefined | GeneratedProduct[]
  >();

  const { translate } = useTranslation();

  return (
    <>
      <Top>
        <TopHeading>{translate('warehouseProducts.generation')}</TopHeading>
      </Top>
      <ErrorBoundary fallback="Error boundary Warehouse products generator">
        <Suspense fallback="Suspense Warehouse products generator">
          <SectionForeground>
            <WarehouseProductsGeneratorForm
              onSuccessSubmit={setGeneratedProducts}
            />
          </SectionForeground>
          {generatedProducts && (
            <SectionForeground>
              <WarehouseProductsGeneratorProductsForm
                generatedProducts={generatedProducts}
              />
            </SectionForeground>
          )}
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default WarehouseProductsGenerator;
