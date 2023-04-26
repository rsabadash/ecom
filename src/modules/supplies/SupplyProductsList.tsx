import { FC } from 'react';
import { SupplyProductListColumn, SupplyProductsListProps } from './types';
import { Table, TableColumnGeneric } from '../../components/Table';
import { useSupplyProductsTableColumns } from './hooks/useSupplyProductsTableColumns';
import { Button } from '../../components/Button';
import { defaultProductValue } from './constants';
import { useTranslation } from '../../components/IntlProvider';
import classes from './styles/index.module.css';
import { SupplyProductSummary } from './SupplyProductSummary';

export const SupplyProductsList: FC<SupplyProductsListProps> = ({
  control,
  setValue,
  getValues,
  onRemoveProduct,
  listData,
  listCommonName,
  handleAddProduct,
}) => {
  const { translate } = useTranslation();

  const columns: TableColumnGeneric<SupplyProductListColumn>[] =
    useSupplyProductsTableColumns({
      control,
      setValue,
      getValues,
      onRemoveProduct,
      cellCommonName: listCommonName,
    });

  const handleAddProductOnClick = () => {
    handleAddProduct(defaultProductValue);
  };

  return (
    <>
      <Table
        items={listData}
        columns={columns}
        tableRowRenderKey="id"
        tableRowClassName={classes.supplyProducts__listItem}
        bottomPanelNode={
          <SupplyProductSummary columns={columns} control={control} />
        }
      />
      <Button
        variant="theme"
        onClick={handleAddProductOnClick}
        className={classes.supplyProducts__list_button}
      >
        {translate('supply.addProduct')}
      </Button>
    </>
  );
};
