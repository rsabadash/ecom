import { Top, TopButtons } from '../../layouts/Top';
import { Button, ButtonLink } from '../../components/Button';
import { routes } from '../../common/constants/routes';
import { ForegroundSection } from '../../components/Foreground';
import { Suspense, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from '../../components/IntlProvider';
import { useCachedAPI } from '../../hooks';
import { endpoint } from '../../common/constants/api';
import { SupplierDetailEntry } from './types';
import { SupplierForm } from './SupplierForm';

const SuppliersDetail = () => {
  const [isReadOnly, setReadOnly] = useState<boolean>(true);

  const { supplierId } = useParams<{ supplierId: string }>();
  const { translate } = useTranslation();

  const { data: supplierDetail } = useCachedAPI<SupplierDetailEntry>(
    `${endpoint.suppliers}/${supplierId}`,
  );

  return (
    <>
      <Top headingText={supplierDetail?.name}>
        <TopButtons>
          {isReadOnly && (
            <ButtonLink variant="primary" to={routes.suppliers.add}>
              {translate('suppliers.add')}
            </ButtonLink>
          )}
          <Button
            variant="primary"
            onClick={() => setReadOnly((isReadOnly) => !isReadOnly)}
          >
            {!isReadOnly ? translate('cancel') : translate('suppliers.edit')}
          </Button>
        </TopButtons>
      </Top>
      <ForegroundSection>
        <Suspense>
          <SupplierForm
            id={supplierDetail?._id}
            formValues={supplierDetail}
            isReadOnly={isReadOnly}
          />
        </Suspense>
      </ForegroundSection>
    </>
  );
};

export default SuppliersDetail;
