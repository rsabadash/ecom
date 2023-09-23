import { Suspense, useState } from 'react';
import { useParams } from 'react-router-dom';

import { endpoints } from '../../../common/constants/api';
import {
  useCachedAPI,
  useKeepDataBetweenNavigation,
} from '../../../common/hooks';
import { Button, ButtonsGroup } from '../../../components/Button';
import { useTranslation } from '../../../components/IntlProvider';
import { SectionForeground } from '../../../layouts/Section';
import { Top, TopButtons, TopHeading } from '../../../layouts/Top';
import { Supplier, SupplierFormValues } from '../common/types';
import { useDeleteSupplier } from './hooks';
import { SupplierEditForm } from './SupplierEditForm';
import { SupplierStateFromRouter, SupplierUrlParams } from './types';
import { matchSupplierDataToFormValues } from './utils';

const SupplierDetail = () => {
  const [isReadOnly, setReadOnly] = useState<boolean>(true);

  const { supplierId } = useParams<SupplierUrlParams>();

  const { translate } = useTranslation();
  const { getNavigationStateData } = useKeepDataBetweenNavigation();

  const supplierDetailFromLocation =
    getNavigationStateData<SupplierStateFromRouter>();

  const { data: supplierDetail, mutate: mutateSupplier } =
    useCachedAPI<Supplier>(`${endpoints.suppliers.root}/${supplierId}`, {
      fallbackData: supplierDetailFromLocation,
    });

  const { deleteSupplier } = useDeleteSupplier(supplierDetail);

  const formValues: SupplierFormValues | undefined =
    matchSupplierDataToFormValues(supplierDetail);

  const handleButtonEditClick = (): void => {
    setReadOnly((isReadOnly) => !isReadOnly);
  };

  const onFormUpdated = (): void => {
    mutateSupplier();
    setReadOnly((isReadOnly) => !isReadOnly);
  };

  const supplierTitle = `${translate('supplier')} "${supplierDetail?.name}"`;

  return (
    <>
      <Top>
        <TopHeading>{supplierTitle}</TopHeading>
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
          <SupplierEditForm
            id={supplierDetail?._id}
            isReadOnly={isReadOnly}
            defaultValues={formValues}
            onFormUpdated={onFormUpdated}
          />
        </Suspense>
      </SectionForeground>
    </>
  );
};

export default SupplierDetail;
