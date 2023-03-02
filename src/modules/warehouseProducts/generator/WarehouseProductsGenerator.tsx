import { Suspense, useState } from 'react';
import { ErrorBoundary } from '../../../components/ErrorBoundary';
import { Foreground } from '../../../layouts/Foreground';
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
          <Foreground>
            <WarehouseProductsGeneratorForm
              onSuccessSubmit={setGeneratedProducts}
            />
          </Foreground>
          {generatedProducts && (
            <Foreground>
              <WarehouseProductsGeneratorProductsForm
                generatedProducts={generatedProducts}
              />
            </Foreground>
          )}
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default WarehouseProductsGenerator;
