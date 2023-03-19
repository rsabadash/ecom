import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Warehouse, WarehouseFormValues, WarehouseUrlParams } from './types';
import { useTranslation } from '../../components/IntlProvider';
import { useCachedAPI } from '../../hooks';
import { endpoints } from '../../common/constants/api';
import { useDeleteCategory } from '../categories/hooks';
import { matchWarehouseDataToFormValues } from './utils';
import { Top, TopButtons, TopHeading } from '../../layouts/Top';
import { Button, ButtonsGroup } from '../../components/Button';
import { SectionForeground } from '../../layouts/Section';
import { WarehouseForm } from './WarehouseForm';

const WarehouseDetail = () => {
  const [isReadOnly, setReadOnly] = useState<boolean>(true);

  const { warehouseId } = useParams<WarehouseUrlParams>();
  const { translate } = useTranslation();

  const { data: warehouseDetail } = useCachedAPI<Warehouse>(
    `${endpoints.warehouses.root}/${warehouseId}`,
  );
  const { deleteCategory } = useDeleteCategory(warehouseDetail?._id);

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
            <Button variant="danger" onClick={deleteCategory}>
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