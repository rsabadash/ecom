import { Suspense, useState } from 'react';
import { useParams } from 'react-router-dom';

import { endpoints } from '../../../common/constants/api';
import {
  useCachedAPI,
  useKeepDataBetweenNavigation,
} from '../../../common/hooks';
import { ModuleDetailActions } from '../../../components/Intermodular/ModuleDetailActions';
import { useTranslation } from '../../../components/IntlProvider';
import { SectionForeground } from '../../../layouts/Section';
import { Top, TopHeading } from '../../../layouts/Top';
import {
  Supplier,
  SupplierFormValues,
  SupplierStateFromRouter,
} from '../common/types';
import { useDeleteSupplier } from './hooks';
import { SupplierEditForm } from './SupplierEditForm';
import { SupplierUrlParams } from './types';
import { mapSupplierDataToFormValues } from './utils';

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
    mapSupplierDataToFormValues(supplierDetail);

  const toggleReadOnly = (): void => {
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
        <ModuleDetailActions
          isReadOnly={isReadOnly}
          onEdit={toggleReadOnly}
          onDelete={deleteSupplier}
        />
      </Top>
      <SectionForeground>
        <Suspense>
          <SupplierEditForm
            id={supplierDetail?._id}
            isReadOnly={isReadOnly}
            defaultValues={formValues}
            onFormReset={toggleReadOnly}
            onFormUpdated={onFormUpdated}
          />
        </Suspense>
      </SectionForeground>
    </>
  );
};

export default SupplierDetail;
