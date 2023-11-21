import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { endpoints } from '../../../common/constants/api';
import { useCachedAPI } from '../../../common/hooks';
import { Button, ButtonsGroup } from '../../../components/Button';
import { useTranslation } from '../../../components/IntlProvider';
import { SectionForeground } from '../../../layouts/Section';
import { Top, TopButtons, TopHeading } from '../../../layouts/Top';
import { Warehouse, WarehouseFormValues } from '../common/types';
import { useDeleteWarehouse } from './hooks';
import { WarehouseUrlParams } from './types';
import { mapWarehouseDataToFormValues } from './utils';
import { WarehouseEditForm } from './WarehouseEditForm';

const WarehouseDetail = () => {
  const [isReadOnly, setReadOnly] = useState<boolean>(true);

  const { warehouseId } = useParams<WarehouseUrlParams>();
  const { translate } = useTranslation();

  const { data: warehouseDetail, mutate: mutateWarehouse } =
    useCachedAPI<Warehouse>(`${endpoints.warehouses.root}/${warehouseId}`);

  const { deleteWarehouse } = useDeleteWarehouse(warehouseDetail);

  const formValues: WarehouseFormValues | undefined =
    mapWarehouseDataToFormValues(warehouseDetail, translate);

  const handleEditButtonClick = (): void => {
    setReadOnly((isReadOnly) => !isReadOnly);
  };

  const onFormUpdated = (): void => {
    mutateWarehouse();
    setReadOnly((isReadOnly) => !isReadOnly);
  };

  const warehouseTitle = `${translate('warehouse')} "${warehouseDetail?.name}"`;

  return (
    <>
      <Top>
        <TopHeading>{warehouseTitle}</TopHeading>
        <TopButtons>
          <ButtonsGroup>
            <Button variant="primary" onClick={handleEditButtonClick}>
              {!isReadOnly ? translate('cancel') : translate('edit')}
            </Button>
            <Button variant="danger" onClick={deleteWarehouse}>
              {translate('delete')}
            </Button>
          </ButtonsGroup>
        </TopButtons>
      </Top>
      <SectionForeground>
        <WarehouseEditForm
          id={warehouseDetail?._id}
          isReadOnly={isReadOnly}
          defaultValues={formValues}
          onFormUpdated={onFormUpdated}
        />
      </SectionForeground>
    </>
  );
};

export default WarehouseDetail;
