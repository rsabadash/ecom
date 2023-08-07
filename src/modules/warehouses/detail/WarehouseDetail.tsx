import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { endpoints } from '../../../common/constants/api';
import { useCachedAPI } from '../../../common/hooks';
import { Button, ButtonsGroup } from '../../../components/Button';
import { useTranslation } from '../../../components/IntlProvider';
import { SectionForeground } from '../../../layouts/Section';
import { Top, TopButtons, TopHeading } from '../../../layouts/Top';
import { useDeleteWarehouse } from '../add/hooks';
import {
  Warehouse,
  WarehouseFormValues,
  WarehouseUrlParams,
} from '../add/types';
import { WarehouseForm } from '../add/WarehouseForm';
import { matchWarehouseDataToFormValues } from './utils';

const WarehouseDetail = () => {
  const [isReadOnly, setReadOnly] = useState<boolean>(true);

  const { warehouseId } = useParams<WarehouseUrlParams>();
  const { translate } = useTranslation();

  const { data: warehouseDetail } = useCachedAPI<Warehouse>(
    `${endpoints.warehouses.root}/${warehouseId}`,
  );
  const { deleteWarehouse } = useDeleteWarehouse(warehouseDetail?._id);

  const formValues: WarehouseFormValues | undefined =
    matchWarehouseDataToFormValues(warehouseDetail, translate);

  const handleButtonClick = (): void => {
    setReadOnly((isReadOnly) => !isReadOnly);
  };

  return (
    <>
      <Top>
        <TopHeading>{warehouseDetail?.name}</TopHeading>
        <TopButtons>
          <ButtonsGroup>
            <Button variant="primary" onClick={handleButtonClick}>
              {!isReadOnly ? translate('cancel') : translate('edit')}
            </Button>
            <Button variant="danger" onClick={deleteWarehouse}>
              {translate('delete')}
            </Button>
          </ButtonsGroup>
        </TopButtons>
      </Top>
      <SectionForeground>
        <WarehouseForm
          id={warehouseDetail?._id}
          isReadOnly={isReadOnly}
          defaultValues={formValues}
        />
      </SectionForeground>
    </>
  );
};

export default WarehouseDetail;
