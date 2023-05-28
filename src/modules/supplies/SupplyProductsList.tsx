import { FC, useCallback, useState } from 'react';
import { useFieldArray } from 'react-hook-form';
import { SupplyProductListColumn, SupplyProductsListProps } from './types';
import { Table, TableColumnGeneric } from '../../components/Table';
import { useSupplyProductsTableColumns } from './hooks';
import { Button } from '../../components/Button';
import { defaultProductValue, supplyFormArrayFields } from './constants';
import { useTranslation } from '../../components/IntlProvider';
import { SupplyProductSummary } from './SupplyProductSummary';
import { Modal } from '../../components/Modal';
import classes from './styles/index.module.css';

export const SupplyProductsList: FC<SupplyProductsListProps> = ({
  control,
  setValue,
  getValues,
}) => {
  const [isRemoveDisabledOpen, setIsRemoveDisabledOpen] =
    useState<boolean>(false);

  const { translate } = useTranslation();

  const { fields, append, remove } = useFieldArray({
    control,
    name: supplyFormArrayFields.products,
  });

  const hasMoreThanOneFiled = fields.length > 1;

  const handleRemoveProduct = useCallback(
    (index: number): void => {
      if (hasMoreThanOneFiled) {
        remove(index);
      } else {
        setIsRemoveDisabledOpen(true);
      }
    },
    [hasMoreThanOneFiled, remove],
  );

  const columns: TableColumnGeneric<SupplyProductListColumn>[] =
    useSupplyProductsTableColumns({
      control,
      setValue,
      getValues,
      onRemoveProduct: handleRemoveProduct,
      cellCommonName: supplyFormArrayFields.products,
    });

  const handleAddProductOnClick = () => {
    append(defaultProductValue);
  };

  const closeRemoveDisabledModal = () => {
    setIsRemoveDisabledOpen(false);
  };

  return (
    <>
      <Table
        items={fields}
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

      <Modal
        isModalFooterHidden
        isNoFocusableElements
        isOpen={isRemoveDisabledOpen}
        onClose={closeRemoveDisabledModal}
      >
        {translate('supply.warning.deleteOneProduct')}
      </Modal>
    </>
  );
};
