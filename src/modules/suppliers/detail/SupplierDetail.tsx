import { Suspense, useState } from 'react';
import { useParams } from 'react-router-dom';

import { endpoints } from '../../../common/constants/api';
import { useCachedAPI } from '../../../common/hooks';
import { Button, ButtonsGroup } from '../../../components/Button';
import { useTranslation } from '../../../components/IntlProvider';
import { SectionForeground } from '../../../layouts/Section';
import { Top, TopButtons, TopHeading } from '../../../layouts/Top';
import { useDeleteSupplier } from './hooks';
import { SupplierForm } from './SupplierForm';
import {
  SupplierDetailEntry,
  SupplierFormValues,
  SupplierUrlParams,
} from './types';
import { matchSupplierDataToFormValues } from './utils';

const SupplierDetail = () => {
  const [isReadOnly, setReadOnly] = useState<boolean>(true);

  const { supplierId } = useParams<SupplierUrlParams>();
  const { translate } = useTranslation();

  const { data: supplierDetail } = useCachedAPI<SupplierDetailEntry>(
    `${endpoints.suppliers.root}/${supplierId}`,
  );
  const { deleteSupplier } = useDeleteSupplier(supplierDetail?._id);

  const formValues: SupplierFormValues | undefined =
    matchSupplierDataToFormValues(supplierDetail);

  const handleButtonEditClick = (): void => {
    setReadOnly((isReadOnly) => !isReadOnly);
  };

  return (
    <>
      <Top>
        <TopHeading>{supplierDetail?.name}</TopHeading>
        <TopButtons>
          <ButtonsGroup>
            <Button variant="primary" onClick={handleButtonEditClick}>
              {!isReadOnly ? translate('cancel') : translate('edit')}
            </Button>
            <Button variant="danger" onClick={deleteSupplier}>
              {translate('delete')}
            </Button>
          </ButtonsGroup>
        </TopButtons>
      </Top>
      <SectionForeground>
        <Suspense>
          <SupplierForm
            id={supplierDetail?._id}
            defaultValues={formValues}
            isReadOnly={isReadOnly}
          />
        </Suspense>
      </SectionForeground>
    </>
  );
};

export default SupplierDetail;
